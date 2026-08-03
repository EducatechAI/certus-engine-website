import fs from 'fs';
import path from 'path';

const SEEDS_FILE = path.join(process.cwd(), 'src', 'data', 'seeds.json');
const seeds = JSON.parse(fs.readFileSync(SEEDS_FILE, 'utf8'));

const slugsComErro = [
  'como-funciona-a-governanca-de-ia-sob-lgpd46-cs2-g08',
  'e-viavel-ia-on-premise-soberana-para-pref-sem-perder-desempen-cs3-g16',
  'o-que-e-ransom-e-como-resolver-na-pratica-sob-lgpd46-cs3-g09',
  'quanto-custa-nao-ter-controle-quando-ransom-acontece-em-pref-cs7-g11',
  'por-que-o-determinismo-elimina-a-alucinacao-ao-mitigar-api-keys-g25',
  'qual-o-tco-de-remediar-api-keys-depois-vs-compliance-by-desig-cs3-g20',
  'es-viable-una-ia-on-premise-soberana-para-gobierno-digital-mexico-g16',
  'que-es-secuestro-de-datos-ransomware-y-como-resolverlo-en-la-cs3-g09',
  'como-el-lazarus-vault-hace-que-la-respuesta-a-secuestro-de-da-cs5-g24',
  'es-posible-analizar-secuestro-de-datos-ransomware-sin-activa-cs10-g06',
  'podemos-defender-gobierno-digital-mexico-contra-secuestro-de-cs11-g05'
];

let changedCount = 0;

slugsComErro.forEach(slug => {
  const a = seeds.find((s: any) => s.slug === slug);
  if (!a) return;
  if (!a.contentMarkdown) return;
  
  if (!a.contentMarkdown.includes('<script type="application/ld+json">')) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": a.title || slug,
      "author": {
        "@type": "Person",
        "name": "Paulino Gerlack"
      },
      "datePublished": a.releaseDate || new Date().toISOString().split('T')[0],
      "publisher": {
        "@type": "Organization",
        "name": "Educatech AI Digital Sovereign Ltda",
        "logo": {
          "@type": "ImageObject",
          "url": "https://certusengine.ia.br/logo.svg"
        }
      },
      "about": a.law || "Regulação",
      "description": a.painPoint || "Solução técnica"
    };
    
    a.contentMarkdown = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n` + a.contentMarkdown;
    changedCount++;
  }
});

if (changedCount > 0) {
  fs.writeFileSync(SEEDS_FILE, JSON.stringify(seeds, null, 2));
  console.log(`Injected JSON-LD into ${changedCount} articles.`);
} else {
  console.log('No articles needed JSON-LD injection.');
}
