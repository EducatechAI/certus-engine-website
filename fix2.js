const fs = require('fs');
const file = 'C:/Users/pauli/OneDrive/Documentos/Google Antigravity/certus-engine-website/src/data/seeds.json';
let seeds = JSON.parse(fs.readFileSync(file, 'utf8'));

let c = 0;
seeds.forEach(s => {
  if (s.contentMarkdown) {
    let original = s.contentMarkdown;
    // Tenta substituir com ou sem aspas/negrito usando Regex flexível
    s.contentMarkdown = s.contentMarkdown.replace(/utilizamos la arquitectura (\*\*?)Kangal(\*\*?) para la simulación/gi, 'utilizamos la arquitectura $1GHOST RECON$2 para la simulación');
    
    s.contentMarkdown = s.contentMarkdown.replace(/Utilizando la herramienta (\*\*?)Wolfdog(\*\*?), nuestros clientes simulan la auditoría/gi, 'Utilizando la herramienta $1ANALYST DEEP$2, nuestros clientes simulan la auditoría');

    if (original !== s.contentMarkdown) {
      console.log('Fixed:', s.id, s.slug);
      c++;
    }
  }
});

fs.writeFileSync(file, JSON.stringify(seeds, null, 2));
console.log('Total fixed:', c);
