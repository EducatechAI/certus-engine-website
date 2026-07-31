const fs = require('fs');
const path = require('path');

const seedsPath = path.join(__dirname, '..', 'src', 'data', 'seeds.json');
const seeds = JSON.parse(fs.readFileSync(seedsPath, 'utf8'));

let alterados = 0;

seeds.forEach((targetSeed, index) => {
  if (index >= 52 && index <= 61) {
    if (!targetSeed.contentMarkdown) return;
    
    let textoLimpo = targetSeed.contentMarkdown;
    
    // 1. DESTRUIR qualquer tag HTML de metadados gerada pelo LLM no corpo do texto (meta, link, script, style)
    textoLimpo = textoLimpo.replace(/<(meta|link|script|style)[\s\S]*?>/gi, '');
    
    // 2. DESTRUIR qualquer variação de rótulo de cenário/referência (PT, ES, EN) no início de linhas
    textoLimpo = textoLimpo.replace(/^[\s\n]*[🟡🔵🟢]\s*(CENÁRIO|ESCENARIO|SIMULATED|SIMULADO|SCENARIO|THREAT|MODEL|REFERÊNCIA|REFERENCE|NORMATIVA).*$/gim, '');
    
    // 3. FORÇAR envolvimento de blocos de código soltos (comandos CLI, scripts, hashes)
    textoLimpo = textoLimpo.replace(/(^|\n)(#\s.*|\.\/.*|verify_.*|wolfdog\s.*|lazarus-.*)/g, (match, p1, p2) => {
        if (textoLimpo.includes('```bash') || textoLimpo.includes('```python')) {
            return match; 
        }
        return p1 + '```bash\n' + p2.trim() + '\n```\n';
    });
    
    // 4. Garantir que o texto não termine com '```' solto se não houver par (correção de borda)
    const partes = textoLimpo.split('```');
    if (partes.length > 2 && partes.length % 2 !== 0) {
        textoLimpo += '\n```';
    }
    
    // 5. MONTAGEM FINAL IMUTÁVEL
    const schemaForcado = `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": targetSeed.title,
      "author": { "@type": "Person", "name": "Paulino Gerlack" },
      "datePublished": new Date().toISOString().split('T')[0],
      "publisher": { "@type": "Organization", "name": "Educatech AI Digital Sovereign Ltda", "logo": { "@type": "ImageObject", "url": "https://certusengine.ia.br/logo.svg" } },
      "about": targetSeed.law || "GDPR (Europe)",
      "description": targetSeed.rawOutput ? targetSeed.rawOutput.gancho_usado : targetSeed.title.substring(0, 150)
    })}</script>\n<link rel="canonical" href="https://certusengine.ia.br/article/${targetSeed.slug}" />`;
    
    const rotulos = {
      PT: "🟡 CENÁRIO SIMULADO / THREAT MODEL\n\n",
      ES: "🟡 ESCENARIO SIMULADO / THREAT MODEL\n\n",
      EN: "🟡 SIMULATED SCENARIO / THREAT MODEL\n\n"
    };
    
    const locIdioma = (targetSeed.locale || 'pt').toUpperCase();
    const outputFinal = schemaForcado + "\n\n" + (rotulos[locIdioma] || rotulos.PT) + textoLimpo.trim();
    
    targetSeed.contentMarkdown = outputFinal;
    alterados++;
    console.log(`Corrigido ID ${targetSeed.id} (${targetSeed.slug})`);
  }
});

if (alterados > 0) {
  fs.writeFileSync(seedsPath, JSON.stringify(seeds, null, 2), 'utf8');
  console.log(`\nConcluído! ${alterados} artigos modificados.`);
} else {
  console.log('Nenhum artigo modificado.');
}
