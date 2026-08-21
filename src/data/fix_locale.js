const fs = require('fs');
const path = require('path');

const seedsPath = path.join(__dirname, 'seeds.json');
let seeds = JSON.parse(fs.readFileSync(seedsPath, 'utf8'));

for (let i = seeds.length - 5; i < seeds.length; i++) {
    const seed = seeds[i];
    
    // Fix locales
    if (seed.locale === 'pt-BR') {
        seed.locale = 'pt';
    } else if (seed.locale === 'en-US') {
        seed.locale = 'en';
    }
    
    // specifically for 390 which is english:
    if (seed.id.includes('cs390-g01') || seed.id.includes('en/')) {
        seed.locale = 'en';
    }
}

fs.writeFileSync(seedsPath, JSON.stringify(seeds, null, 2), 'utf8');
console.log('Fixed locales in seeds.json!');
