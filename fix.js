const fs = require('fs');
const file = 'src/data/seeds.json';
let seeds = JSON.parse(fs.readFileSync(file, 'utf8'));
let c = 0;
seeds.forEach(s => {
  if (s.slug && s.slug.includes('cross-border-data-leak-incident-under-cs4-g12')) {
    if (s.contentMarkdown) {
      s.contentMarkdown = s.contentMarkdown
        .replace(/Certus 'PII-Zero' architecture to extract verifiable hashes/g, `Certus 'LAZARUS' architecture to extract verifiable hashes`)
        .replace(/PII-Zero Integrity Module/g, `LAZARUS Integrity Module`)
        .replace(/Using the Certus 'Kangal' engine, we correlate/g, `Using the Certus 'LAZARUS' engine, we correlate`)
        .replace(/# Extracting PII-Zero validated logs/g, `# Extracting LAZARUS validated logs`)
        .replace(/implementing the 'Wolfdog' packet-shaping algorithm/g, `implementing the 'KANGAL' traffic-shaping algorithm`);
      c++;
    }
  }
});
fs.writeFileSync(file, JSON.stringify(seeds, null, 2));
console.log('Fixed', c, 'articles');
