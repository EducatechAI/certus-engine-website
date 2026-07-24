import fs from 'fs';
import path from 'path';

const seedsFile = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
const seeds = JSON.parse(fs.readFileSync(seedsFile, 'utf-8'));

let dataInicial = new Date();
dataInicial.setHours(17, 0, 0, 0); // 17:00:00 local time today
let counter = 0;

for (let s of seeds) {
  if (!s.contentMarkdown) {
    const novaData = new Date(dataInicial.getTime() + (counter * 60 * 60 * 1000));
    s.releaseDate = novaData.toISOString();
    counter++;
  }
}

fs.writeFileSync(seedsFile, JSON.stringify(seeds, null, 2));
console.log(`Datas repactuadas para a nova matriz. Primeira liberação: ${dataInicial.toLocaleString()}`);
