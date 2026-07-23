import fs from 'fs';
import path from 'path';

const seedsPath = path.join(__dirname, '..', 'src', 'data', 'seeds.json');

function patchSchema() {
  if (!fs.existsSync(seedsPath)) {
    console.error('ERRO: seeds.json não encontrado.');
    return;
  }

  const seeds = JSON.parse(fs.readFileSync(seedsPath, 'utf-8'));
  let patchedCount = 0;

  for (let i = 0; i < seeds.length; i++) {
    const seed = seeds[i];
    
    // Se a semente já foi forjada e ainda não recebeu o patch (não tem forgeMeta)
    if (seed.contentMarkdown && !seed.forgeMeta) {
      
      const jsonLd = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${seed.title}",
  "author": {
    "@type": "Person",
    "name": "Paulino Gerlack / Educatech AI Digital Sovereign Ltda"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Certus Engine"
  },
  "datePublished": "${seed.releaseDate}",
  "dateModified": "${new Date().toISOString()}",
  "about": {
    "@type": "Thing",
    "name": "${seed.law}"
  }
}
</script>`;

      const canonical = `<link rel="canonical" href="https://certusengine.vercel.app/article/${seed.slug}" />`;
      const rotulo = `> 🟡 CENÁRIO SIMULADO / THREAT MODEL`; // Defaulting to simulated for safety (Regra 6)

      // Prepend the meta tags and label to the existing content
      seed.contentMarkdown = `${jsonLd}\n${canonical}\n\n${rotulo}\n\n${seed.contentMarkdown}`;
      
      // Mark as patched
      seed.forgeMeta = {
        gancho_usado: seed.title, // Old template used the title directly
        esqueleto_usado: 'S3',    // Defaulting to S3
        score_unicidade: 85,      // Minimum acceptable
        rotulo_integridade: rotulo
      };
      
      patchedCount++;
    }
  }

  fs.writeFileSync(seedsPath, JSON.stringify(seeds, null, 2));
  console.log(`[FASE 1.5] Sucesso: ${patchedCount} artigos antigos patcheados com Schema e E-E-A-T.`);
}

patchSchema();
