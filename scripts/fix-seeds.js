const fs = require('fs');
const path = require('path');

const seedsPath = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
let seeds = JSON.parse(fs.readFileSync(seedsPath, 'utf-8'));
let updated = false;

const regex = /\{\s*"@context"[\s\S]*?\}(?=(?:\\n|\n|\s)*(?:<\/script>|<\/?meta|<\/?link|#|🟡|🔵|🟢|$))/gi;

seeds.forEach(seed => {
  if (seed.contentMarkdown && seed.contentMarkdown.includes('{"@context"')) {
    const orig = seed.contentMarkdown;
    // We only want to replace the SECOND (or un-scripted) JSON-LD.
    // The first one is wrapped in <script type="application/ld+json"> ... </script>
    // The regex already avoids matching if it's not followed by the lookahead properly, 
    // but wait! The script tag one IS followed by </script>!
    // If we run this regex on the whole contentMarkdown, it will DELETE the valid <script> block too because of `(?:<\/script>)` in lookahead!
    // Ah!
  }
});

// To be safe, we split by "\n🟡", process the right side, and re-join!
seeds.forEach(seed => {
  if (seed.contentMarkdown) {
    const parts = seed.contentMarkdown.split(/\\n🟡|\n🟡/);
    if (parts.length > 1) {
      const origRight = parts.slice(1).join('\\n🟡'); // Or \n🟡, we have to be careful
      // Actually, easier:
      let modified = seed.contentMarkdown;
      // Find the position of the first 🟡
      const labelIndex = modified.indexOf('🟡');
      if (labelIndex !== -1) {
        const left = modified.substring(0, labelIndex);
        let right = modified.substring(labelIndex);
        const origRight = right;
        right = right.replace(regex, '');
        if (origRight !== right) {
          seed.contentMarkdown = left + right;
          updated = true;
          console.log('Corrigido Artigo:', seed.title);
        }
      }
    }
  }
});

if (updated) {
  fs.writeFileSync(seedsPath, JSON.stringify(seeds, null, 2), 'utf-8');
  console.log('seeds.json atualizado.');
} else {
  console.log('Nenhuma anomalia JSON-LD encontrada pós-label.');
}
