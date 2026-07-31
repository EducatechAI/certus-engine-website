const fs = require('fs');
const path = require('path');

const SEEDS_FILE = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
const seeds = JSON.parse(fs.readFileSync(SEEDS_FILE, 'utf-8'));

let modificado = false;
for (let i = 0; i < seeds.length; i++) {
  // Apaga os artigos 78, 79 e 80 para reforja
  if (['78', '79', '80', 78, 79, 80].includes(seeds[i].id) || seeds[i].title.includes('Qual a diferença entre IA probabilística e governança determinística') || seeds[i].title.includes('É possível criar infraestrutura à prova de Roubo de Chaves de API') || seeds[i].title.includes('Como o PII-Zero mascara dados sensíveis')) {
    if (seeds[i].contentMarkdown) {
      delete seeds[i].contentMarkdown;
      delete seeds[i].forgeMeta;
      modificado = true;
      console.log(`Artigo ${seeds[i].id} (${seeds[i].title}) apagado para reforja.`);
    }
  }
}

if (modificado) {
  fs.writeFileSync(SEEDS_FILE, JSON.stringify(seeds, null, 2));
}
