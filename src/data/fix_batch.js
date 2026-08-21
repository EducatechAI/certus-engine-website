const fs = require('fs');
const path = require('path');

const seedsPath = path.join(__dirname, 'seeds.json');
let seeds = JSON.parse(fs.readFileSync(seedsPath, 'utf8'));

// The last 5 articles
for (let i = seeds.length - 5; i < seeds.length; i++) {
    const seed = seeds[i];
    
    // Set releaseDate to something from today, maybe 1 hour ago
    const d = new Date();
    d.setHours(d.getHours() - 1);
    seed.releaseDate = d.toISOString();
    
    if (seed.content) {
        seed.contentMarkdown = seed.content;
        delete seed.content;
    }
    
    seed.locale = seed.locale || 'pt-BR'; // defaults
    seed.assunto = seed.assunto || 'GovTech';
}

fs.writeFileSync(seedsPath, JSON.stringify(seeds, null, 2), 'utf8');
console.log('Fixed the last 5 articles in seeds.json!');
