import fs from 'fs';
import { normalizeHeaders, validateArticleHtml } from './src/lib/canonical';

const seeds = JSON.parse(fs.readFileSync('src/data/seeds.json', 'utf8'));

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

slugsComErro.forEach(slug => {
  const a = seeds.find((s: any) => s.slug === slug);
  if (!a) {
    console.log(slug, 'NOT FOUND');
    return;
  }
  if (!a.contentMarkdown) {
    console.log(slug, 'NO CONTENT MARKDOWN (Lost!)');
    return;
  }
  console.log(slug, 'HAS CONTENT MARKDOWN. Length:', a.contentMarkdown.length);
});
