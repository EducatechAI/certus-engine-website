const fs = require('fs');
const path = require('path');

const SEEDS_FILE = path.join(__dirname, 'src', 'data', 'seeds.json');
let seeds = JSON.parse(fs.readFileSync(SEEDS_FILE, 'utf-8'));

// Separar sementes forjadas das virgens
const forged = seeds.filter(s => s.contentMarkdown);
const virgin = seeds.filter(s => !s.contentMarkdown);

// Embaralhar as sementes virgens (Fisher-Yates) para que LATAM, EN e PT fiquem misturados
for (let i = virgin.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [virgin[i], virgin[j]] = [virgin[j], virgin[i]];
}

// Descobrir a última data de liberação das forjadas
let lastDate = new Date();
forged.forEach(s => {
  if (s.releaseDate) {
    const d = new Date(s.releaseDate);
    if (!isNaN(d) && d > lastDate) {
      lastDate = d;
    }
  }
});

console.log('Última data detectada nos forjados:', lastDate.toISOString());

// Atribuir datas sequenciais (1 por hora) às virgens embaralhadas
virgin.forEach((s, index) => {
  // Adiciona (index + 1) horas à última data
  const nextDate = new Date(lastDate.getTime() + (index + 1) * 60 * 60 * 1000);
  s.releaseDate = nextDate.toISOString();
});

// Remontar a lista: primeiro forjados, depois virgens embaralhadas
const finalSeeds = [...forged, ...virgin];

fs.writeFileSync(SEEDS_FILE, JSON.stringify(finalSeeds, null, 2), 'utf-8');
console.log(`Sucesso: ${virgin.length} sementes virgens foram embaralhadas e datadas.`);
