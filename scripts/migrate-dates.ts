import fs from 'fs';
import path from 'path';

const seedsFile = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
const seeds = JSON.parse(fs.readFileSync(seedsFile, 'utf-8'));

let dataInicial = new Date();
dataInicial.setMinutes(0, 0, 0); // Começa na próxima hora cheia
let counter = 0;

for (let s of seeds) {
  if (!s.contentMarkdown) { // Apenas sementes virgens
    const novaData = new Date(dataInicial.getTime() + (counter * 60 * 60 * 1000));
    s.releaseDate = novaData.toISOString();
    counter++;
  }
}

fs.writeFileSync(seedsFile, JSON.stringify(seeds, null, 2));
console.log(`Migradas ${counter} sementes virgens para um espaçamento de 1 hora. ` +
            `Data inicial: ${dataInicial.toISOString()}, Data final (estimada): ${new Date(dataInicial.getTime() + (counter * 60 * 60 * 1000)).toISOString()}`);
