const fs = require('fs');
const path = require('path');

const SEEDS_FILE = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
const seeds = JSON.parse(fs.readFileSync(SEEDS_FILE, 'utf-8'));

let modificado = false;
for (let i = 0; i < seeds.length; i++) {
  // Apaga apenas o artigo 75 (id 75 ou que contém o título específico do Case Study 7)
  if (seeds[i].id === 75 || seeds[i].id === '75' || seeds[i].title.includes('Como funciona, por dentro, a governança de IA sob LGPD (Art. 46)? (Case Study 7)')) {
    delete seeds[i].contentMarkdown;
    delete seeds[i].forgeMeta;
    modificado = true;
    console.log(`Artigo 75 (ID: ${seeds[i].id}, Slug: ${seeds[i].slug}) apagado com sucesso para reforja.`);
  }
}

if (modificado) {
  fs.writeFileSync(SEEDS_FILE, JSON.stringify(seeds, null, 2));
}
