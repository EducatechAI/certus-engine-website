// scripts/fix-canonical.ts
// Correção cirúrgica dos 219 artigos forjados dentro de src/data/seeds.json.
// Backup integral + dry-run padrão + Fail-Closed (corpo byte a byte).
//
//   npx tsx scripts/fix-canonical.ts                 # DRY-RUN (não grava)
//   npx tsx scripts/fix-canonical.ts --limit 10      # DRY-RUN em 10 (teste)
//   npx tsx scripts/fix-canonical.ts --apply         # APLICA (com backup)

import fs from 'node:fs';
import path from 'node:path';
import {
  EXPECTED_ASSUNTO_BY_LOCALE,
  normalizeHeaders,
  validateArticleHtml,
  bodyOnly,
  type Lang,
  type Assunto,
} from '../src/lib/canonical';

const SEEDS_PATH = path.resolve(process.cwd(), 'src/data/seeds.json');
const APPLY = process.argv.includes('--apply');
const LIMIT_ARG = process.argv.find((a) => a.startsWith('--limit='));
const LIMIT = LIMIT_ARG ? parseInt(LIMIT_ARG.split('=')[1], 10) : Infinity;

const VALID_LANG = new Set(['pt', 'es', 'en']);
const VALID_ASSUNTO = new Set(['soberana', 'latam', 'global']);

interface Seed {
  locale?: string;
  assunto?: string;
  slug?: string;
  contentMarkdown?: string;
  [k: string]: unknown;
}

/** Aceita array direto OU objeto wrapper com uma chave array. */
function extractSeeds(root: unknown): { seeds: Seed[]; isWrapper: boolean; key?: string } {
  if (Array.isArray(root)) return { seeds: root as Seed[], isWrapper: false };
  if (root && typeof root === 'object') {
    for (const [key, val] of Object.entries(root)) {
      if (Array.isArray(val) && val.length && typeof val[0] === 'object' && ('slug' in val[0] || 'contentMarkdown' in val[0])) {
        return { seeds: val as Seed[], isWrapper: true, key };
      }
    }
  }
  throw new Error('Estrutura do seeds.json não reconhecida (nem array, nem wrapper com array).');
}

interface Row {
  idx: number;
  slug?: string;
  status: 'fixed' | 'already-ok' | 'quarantine' | 'skipped' | 'error';
  from?: string | null;
  to?: string;
  reason?: string;
}

function main() {
  console.log(`\n🛡️ FIX CANONICAL (seeds.json) — modo: ${APPLY ? '🔴 APPLY' : '🟢 DRY-RUN'}\n`);
  console.log(`Arquivo: ${SEEDS_PATH}\n`);

  const raw = fs.readFileSync(SEEDS_PATH, 'utf8');
  const root = JSON.parse(raw);
  const { seeds, isWrapper, key } = extractSeeds(root);
  console.log(`Estrutura: ${isWrapper ? `wrapper (chave "${key}")` : 'array direto'} — ${seeds.length} sementes no total.\n`);

  // BACKUP INTEGRAL (só no --apply, antes de qualquer mutação)
  if (APPLY) {
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = SEEDS_PATH.replace(/\.json$/, `_backup_${ts}.json`);
    fs.copyFileSync(SEEDS_PATH, backupPath);
    console.log(`💾 Backup integral criado: ${backupPath}\n`);
  }

  const rows: Row[] = [];
  let processed = 0;

  for (let i = 0; i < seeds.length; i++) {
    const s = seeds[i];

    // Elegibilidade: só artigos FORJADOS (contentMarkdown preenchido)
    if (!s.contentMarkdown || typeof s.contentMarkdown !== 'string' || s.contentMarkdown.trim() === '') {
      rows.push({ idx: i, slug: s.slug, status: 'quarantine', reason: 'sem contentMarkdown (em quarentena)' });
      continue;
    }
    if (processed >= LIMIT) {
      rows.push({ idx: i, slug: s.slug, status: 'skipped', reason: 'limite --limit atingido' });
      continue;
    }
    processed++;

    const locale = s.locale as Lang | undefined;
    const assunto = s.assunto as Assunto | undefined;
    const slug = s.slug;

    // Fail-Closed: campos válidos e consistentes
    if (!locale || !VALID_LANG.has(locale)) { rows.push({ idx: i, slug, status: 'error', reason: `locale inválido: ${locale}` }); continue; }
    if (!assunto || !VALID_ASSUNTO.has(assunto)) { rows.push({ idx: i, slug, status: 'error', reason: `assunto inválido: ${assunto}` }); continue; }
    if (!slug || typeof slug !== 'string') { rows.push({ idx: i, slug, status: 'error', reason: 'slug ausente' }); continue; }
    if (EXPECTED_ASSUNTO_BY_LOCALE[locale] !== assunto) {
      rows.push({ idx: i, slug, status: 'error', reason: `inconsistência locale↔assunto (${locale} esperava ${EXPECTED_ASSUNTO_BY_LOCALE[locale]}, veio ${assunto})` });
      continue;
    }

    const original = s.contentMarkdown;
    let result;
    try {
      result = normalizeHeaders(original, locale, assunto, slug);
    } catch (e) {
      rows.push({ idx: i, slug, status: 'error', reason: `normalizeHeaders lançou: ${(e as Error).message}` });
      continue;
    }

    if (!result.changed) { rows.push({ idx: i, slug, status: 'already-ok', from: result.oldCanonical, to: result.newCanonical }); continue; }

    // Fail-Closed: corpo idêntico byte a byte + cabeçalho válido
    if (bodyOnly(result.content) !== bodyOnly(original)) {
      rows.push({ idx: i, slug, status: 'error', reason: 'CORPO mudou — abortado (segurança)' });
      continue;
    }
    const v = validateArticleHtml(result.content, locale, assunto, slug);
    if (!v.ok) { rows.push({ idx: i, slug, status: 'error', reason: `validação: ${v.reasons.join('; ')}` }); continue; }

    // Aplica em memória
    if (APPLY) s.contentMarkdown = result.content;
    rows.push({ idx: i, slug, status: 'fixed', from: result.oldCanonical, to: result.newCanonical });
  }

  // Gravacao
  if (APPLY) {
    fs.writeFileSync(SEEDS_PATH, JSON.stringify(root, null, 2), 'utf8');
    console.log('✍️  seeds.json reescrito (formatação indent=2; dados preservados).\n');
  }

  // Relatório
  const fixed = rows.filter((r) => r.status === 'fixed');
  const ok = rows.filter((r) => r.status === 'already-ok');
  const quar = rows.filter((r) => r.status === 'quarantine');
  const skip = rows.filter((r) => r.status === 'skipped');
  const err = rows.filter((r) => r.status === 'error');

  console.log('--- AMOSTRA DE CORREÇÕES (até 10) ---');
  fixed.slice(0, 10).forEach((r) => {
    console.log(`✅ [${r.idx}] ${r.slug}`);
    console.log(`   de: ${r.from}`);
    console.log(`   pa: ${r.to}\n`);
  });
  if (err.length) {
    console.log('--- ERROS (NÃO alterados) ---');
    err.slice(0, 30).forEach((r) => console.log(`🚨 [${r.idx}] ${r.slug} → ${r.reason}`));
  }

  console.log('\n================ RESUMO ================');
  console.log(`Sementes totais   : ${seeds.length}`);
  console.log(`Forjados elegíveis: ${processed}`);
  console.log(`Corrigidos        : ${fixed.length}`);
  console.log(`Já corretos       : ${ok.length}`);
  console.log(`Em quarentena     : ${quar.length}  (intocados)`);
  console.log(`Skipped (limite)  : ${skip.length}`);
  console.log(`Erros             : ${err.length}`);
  if (!APPLY) console.log(`\n➡️  Aplique com: npx tsx scripts/fix-canonical.ts --apply`);
  console.log('========================================\n');

  if (err.length > 0) process.exit(1);
}

main();
