import fs from 'fs';
import path from 'path';

const seedsPath = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
const seeds = JSON.parse(fs.readFileSync(seedsPath, 'utf-8'));

const slugs = new Set();
const colisoes = new Set();
let colisoesExemplos = [];

for (const s of seeds) {
  if (slugs.has(s.slug)) {
    colisoes.add(s.slug);
    if (colisoesExemplos.length < 5) {
      colisoesExemplos.push(s.slug);
    }
  }
  slugs.add(s.slug);
}

console.log(`Colisões totais: ${colisoes.size}`);
console.log(`Exemplos de colisão:`);
for (const slug of colisoesExemplos) {
  const coliding = seeds.filter((s: any) => s.slug === slug);
  console.log(`\nSlug: ${slug}`);
  coliding.forEach((c: any) => console.log(` - ${c.id}: ${c.title}`));
}
