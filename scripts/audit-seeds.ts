import fs from 'fs';
import path from 'path';

const seedsPath = path.join(__dirname, '..', 'src', 'data', 'seeds.json');

function auditSeeds() {
  if (!fs.existsSync(seedsPath)) {
    console.error('ERRO: seeds.json não encontrado.');
    return;
  }

  const sementes = JSON.parse(fs.readFileSync(seedsPath, 'utf-8'));
  
  const slugs = new Set(sementes.map((s: any) => s.slug));
  if (slugs.size !== sementes.length) {
    console.error(`[FALHA] Colisão de slug detectada. Únicos: ${slugs.size} / Total: ${sementes.length}`);
    process.exit(1);
  }
  
  const tokensNaoResolvidos = sementes.filter((s: any) => /\\{(vetor|setor|lei)\\}/.test(s.title));
  if (tokensNaoResolvidos.length > 0) {
    console.error(`[FALHA] Token não resolvido no título em ${tokensNaoResolvidos.length} sementes.`);
    process.exit(1);
  }

  const forjados = sementes.filter((s: any) => s.contentMarkdown);
  if (forjados.length !== 34) {
    console.error(`[FALHA] Quantidade de sementes forjadas alterada. Esperado: 34, Encontrado: ${forjados.length}`);
    process.exit(1);
  }

  console.log(`[AUDITORIA] OK. 34 intactos, ${sementes.length} slugs únicos, 0 tokens não resolvidos.`);
}

auditSeeds();
