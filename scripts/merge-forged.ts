// scripts/merge-forged.ts
import fs from 'node:fs';
import path from 'node:path';

const HEAD_SEEDS = path.resolve(process.cwd(), 'src/data/seeds_HEAD_184.json');
const CURRENT_SEEDS = path.resolve(process.cwd(), 'src/data/seeds.json');

function main() {
  console.log(`\n🛡️ MERGE FORGED SEEDS`);
  
  if (!fs.existsSync(HEAD_SEEDS)) {
    console.error(`ERRO: Arquivo ${HEAD_SEEDS} não encontrado.`);
    process.exit(1);
  }

  // Lendo como utf16le devido ao redirecionamento > do PowerShell
  const headRaw = fs.readFileSync(HEAD_SEEDS, 'utf16le');
  const currentRaw = fs.readFileSync(CURRENT_SEEDS, 'utf8');

  let headRoot;
  try {
    headRoot = JSON.parse(headRaw.trim());
  } catch (e) {
    console.error('Erro ao parsear HEAD_SEEDS (tentando fallback utf8):', e.message);
    const headRawUtf8 = fs.readFileSync(HEAD_SEEDS, 'utf8');
    headRoot = JSON.parse(headRawUtf8.trim());
  }
  
  const currentRoot = JSON.parse(currentRaw);

  const headSeeds = Array.isArray(headRoot) ? headRoot : (headRoot.seeds || []);
  const currentSeeds = Array.isArray(currentRoot) ? currentRoot : (currentRoot.seeds || []);

  const headMap = new Map();
  for (const s of headSeeds) {
    if (s.slug && s.contentMarkdown && typeof s.contentMarkdown === 'string' && s.contentMarkdown.trim() !== '') {
      headMap.set(s.slug, s.contentMarkdown);
    }
  }

  console.log(`Forjados recuperados do HEAD: ${headMap.size}`);

  let mergedCount = 0;
  for (let i = 0; i < currentSeeds.length; i++) {
    const s = currentSeeds[i];
    if (s.slug && headMap.has(s.slug)) {
      if (!s.contentMarkdown || s.contentMarkdown.trim() === '') {
        s.contentMarkdown = headMap.get(s.slug);
        mergedCount++;
      }
    }
  }

  console.log(`Forjados injetados no seeds atual: ${mergedCount}`);
  
  fs.writeFileSync(CURRENT_SEEDS, JSON.stringify(currentRoot, null, 2), 'utf8');
  console.log(`✅ Merge concluído com sucesso. Total no banco atual agora: ${currentSeeds.length}`);
}

main();
