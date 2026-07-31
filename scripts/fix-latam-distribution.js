const fs = require('fs');
const path = require('path');

const seedsPath = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
let seeds = JSON.parse(fs.readFileSync(seedsPath, 'utf-8'));

const latamTargets = [
  { country: 'México', law: 'LGPDGSO (Art. 19, 63)' },
  { country: 'Colombia', law: 'Ley 1581 (Art. 17, 18)' },
  { country: 'Argentina', law: 'Ley 25.326 (Art. 9)' },
  { country: 'Chile', law: 'Ley 19.628' },
  { country: 'Perú', law: 'Ley 29733 (Art. 17)' },
  { country: 'Uruguay', law: 'Ley 18.331 (Art. 10)' }
];

let targetIndex = 0;
let updatedCount = 0;

seeds.forEach(seed => {
  if (seed.id.includes('-es-') && !seed.contentMarkdown) {
    const target = latamTargets[targetIndex % latamTargets.length];
    
    // Substitute the country (usually "México" or "Gobierno Digital (México)" or "Argentina" etc)
    let newTitle = seed.title
      .replace(/\(México\)/g, `(${target.country})`)
      .replace(/México/g, target.country)
      .replace(/Argentina/g, target.country)
      .replace(/Chile/g, target.country);
      
    // Substitute the law
    let newDesc = seed.description || "";
    let newContext = seed.context || "";
    
    // Replace LGPDGSO and other laws in title, desc, and context
    const lawRegex = /LGPDGSO \(Art\. 19, 63\)|Ley 25\.326 \(Art\. 9\)|Ley 19\.628|LGPDGSO/g;
    
    newTitle = newTitle.replace(lawRegex, target.law);
    newDesc = newDesc.replace(lawRegex, target.law);
    newContext = newContext.replace(lawRegex, target.law);
    
    // Also fix the slug to avoid duplicates if possible, or just let it be (slugs don't explicitly have the country usually, but they might)
    let newSlug = seed.slug
      .replace(/-mexico-/g, `-${target.country.toLowerCase()}-`)
      .replace(/-argentina-/g, `-${target.country.toLowerCase()}-`)
      .replace(/-chile-/g, `-${target.country.toLowerCase()}-`)
      .replace(/-lgpdgso-/g, `-${target.law.toLowerCase().split(' ')[0]}-`);

    if (seed.title !== newTitle || seed.description !== newDesc) {
      seed.title = newTitle;
      seed.description = newDesc;
      seed.context = newContext;
      seed.slug = newSlug;
      updatedCount++;
    }
    
    targetIndex++;
  }
});

fs.writeFileSync(seedsPath, JSON.stringify(seeds, null, 2), 'utf-8');
console.log(`Rebalanceado: ${updatedCount} artigos não publicados em espanhol atualizados com sucesso para diversidade LATAM.`);
