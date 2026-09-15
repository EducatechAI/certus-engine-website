const fs = require('fs');
const path = require('path');
const seedsPath = path.join(process.cwd(), 'src', 'data', 'seeds.json');
let seeds = JSON.parse(fs.readFileSync(seedsPath, 'utf8'));
const contentMarkdown = fs.readFileSync('temp_article_content.md', 'utf8');
const newArticle = {
  id: "omni-pt-govtech-00005",
  locale: "pt",
  assunto: "GovTech",
  slug: "notificacao-anpd-3-dias-lazarus-art48-cs409-g01",
  title: "Notificação à ANPD em 3 dias úteis: como o LAZARUS monta o relatório do Art. 48 antes do prazo vencer?",
  niche: "Prefeituras",
  law: "LGPD (Art. 48 / Art. 52)",
  painPoint: "Prazo de Notificação de Incidentes à ANPD",
  releaseDate: "2026-09-07T18:00:00.000Z",
  contentMarkdown: contentMarkdown,
  forgeMeta: {
    gancho_usado: "Notificação à ANPD em 3 dias úteis: como o LAZARUS monta o relatório do Art. 48",
    esqueleto_usado: "CS-409",
    score_unicidade: 99,
    rotulo_integridade: "PUBLICO"
  },
  status: "ready"
};
const existingIndex = seeds.findIndex(s => s.slug === newArticle.slug);
if (existingIndex > -1) {
  seeds[existingIndex] = newArticle;
  console.log('Article UPDATED in seeds.json');
} else {
  seeds.push(newArticle);
  console.log('Article INJECTED. Total seeds: ' + seeds.length);
}
fs.writeFileSync(seedsPath, JSON.stringify(seeds, null, 2));
console.log('[ARTIGO 5/5] CS-409 processado com sucesso. INICIANDO COMMIT + PUSH...');
