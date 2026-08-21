const fs = require('fs');
const file = 'src/data/seeds.json';
let seeds = JSON.parse(fs.readFileSync(file, 'utf8'));
let c = 0;
seeds.forEach(s => {
  if (s.slug && s.slug.includes('como-prueba-govtech-salud-colombia-la-autoria-identidad-sin')) {
    if (s.contentMarkdown) {
      let original = s.contentMarkdown;
      s.contentMarkdown = s.contentMarkdown
        .replace(/implementamos la suite Kangal \(PII-Zero\)/g, `implementamos el módulo PII-Zero para enmascarar los datos sensibles, integrado a la arquitectura ZK-SOVEREIGN-GUARD`)
        .replace(/validada por Wolfdog/g, `validada por el TRIBUNAL DE CPUs`)
        .replace(/\.\/kangal-cli verify/g, `./tribunal-cpu-cli verify`)
        .replace(/Con LAZARUS, el Tribunal de CPUs verifica/g, `El TRIBUNAL DE CPUs verifica`);
      
      if (original !== s.contentMarkdown) {
        c++;
      }
    }
  }
});
fs.writeFileSync(file, JSON.stringify(seeds, null, 2));
console.log('Fixed', c, 'articles');
