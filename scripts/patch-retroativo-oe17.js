const fs = require('fs');
const path = require('path');

const SEEDS_FILE = path.join(__dirname, '..', 'src', 'data', 'seeds.json');

if (!fs.existsSync(SEEDS_FILE)) {
  console.error("seeds.json não encontrado!");
  process.exit(1);
}

const seeds = JSON.parse(fs.readFileSync(SEEDS_FILE, 'utf-8'));
let updatedCount = 0;

for (let i = 0; i < seeds.length; i++) {
  if (seeds[i].contentMarkdown) {
    let texto = seeds[i].contentMarkdown;
    let modificado = false;

    // Aplica as regras OE-17.1 no conteúdo existente
    
    // 1. Tags HTML órfãs (meta, link, script, style)
    if (/<\s*\/?(meta|link|script|style)\b[^>]*>/gi.test(texto)) {
      texto = texto.replace(/<\s*\/?(meta|link|script|style)\b[^>]*>/gi, '');
      modificado = true;
    }
    
    // 2. JSON-LD Alucinado (Qwen / Gemini)
    if (/\{\s*"@context"[\s\S]*?\}(?=\s*(?:<\/script>|<\/?meta|<\/?link|\n\s*#|🟡|🔵|🟢|$))/gi.test(texto)) {
      texto = texto.replace(/\{\s*"@context"[\s\S]*?\}(?=\s*(?:<\/script>|<\/?meta|<\/?link|\n\s*#|🟡|🔵|🟢|$))/gi, '');
      modificado = true;
    }
    
    // O texto limpo precisa ser reconstruído com o schema correto para não perdermos o Schema Sagrado.
    // O Schema Sagrado SEMPRE fica no início. Como apagamos as tags <script> na regra 1, perdemos o schema original do artigo!
    // Precisamos recriá-lo.
    if (modificado) {
        // Remove todos os rótulos 🟡🔵🟢 espalhados
        texto = texto.replace(/[^\n]*[🟡🔵🟢][^\n]*/gi, '');
        texto = texto.replace(/\n{3,}/g, '\n\n').trim();

        // Remonta com o Schema Sagrado
        const schemaForcado = `<script type="application/ld+json">${JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": seeds[i].title,
          "author": { "@type": "Person", "name": "Paulino Gerlack" },
          "datePublished": new Date().toISOString().split('T')[0],
          "publisher": { "@type": "Organization", "name": "Educatech AI Digital Sovereign Ltda", "logo": { "@type": "ImageObject", "url": "https://certusengine.ia.br/logo.svg" } },
          "about": seeds[i].law || "LGPD (Europe)",
          "description": (seeds[i].forgeMeta ? seeds[i].forgeMeta.gancho_usado : "") || seeds[i].title.substring(0, 150)
        })}</script>\n<link rel="canonical" href="https://certusengine.ia.br/article/${seeds[i].slug}" />`;
  
        const rotulos = {
          PT: "🟡 CENÁRIO SIMULADO / THREAT MODEL\n\n",
          ES: "🟡 ESCENARIO SIMULADO / THREAT MODEL\n\n",
          EN: "🟡 SIMULATED SCENARIO / THREAT MODEL\n\n"
        };
  
        const locIdioma = (seeds[i].locale || 'pt').toUpperCase();
        
        seeds[i].contentMarkdown = schemaForcado + "\n\n" + (rotulos[locIdioma] || rotulos.PT) + texto;
        updatedCount++;
    }
  }
}

if (updatedCount > 0) {
  fs.writeFileSync(SEEDS_FILE, JSON.stringify(seeds, null, 2));
  console.log(`Sucesso! ${updatedCount} artigos foram esterilizados retroativamente com OE-17.1.`);
} else {
  console.log("Nenhum artigo precisou de esterilização. Todos estão limpos.");
}
