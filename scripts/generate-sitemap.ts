import fs from 'node:fs';
import path from 'node:path';

const SEEDS_PATH = path.resolve(process.cwd(), 'src/data/seeds.json');
const OUTPUT_PATH = path.resolve(process.cwd(), 'public/sitemap.xml');

const SITE_ORIGIN = 'https://certusengine.ia.br';
const CLUSTER_MAP: Record<string, string> = {
  pt: 'soberana',
  es: 'latam',
  en: 'global',
};

interface Seed {
  locale?: string;
  assunto?: string;
  slug?: string;
  contentMarkdown?: string;
  datePublished?: string;
}

function buildUrl(locale: string, assunto: string, slug: string): string {
  return `${SITE_ORIGIN}/${locale}/${assunto}/${slug}`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemap() {
  console.log('🛡️ Gerando sitemap.xml limpo...\n');

  // 1. Ler seeds.json
  const raw = fs.readFileSync(SEEDS_PATH, 'utf8');
  const seeds: Seed[] = JSON.parse(raw);
  console.log(`Total de sementes no banco: ${seeds.length}`);

  // 2. Filtrar APENAS páginas forjadas (status ready/published)
  const forgedSeeds = seeds.filter(s => 
    (s.status === 'ready' || s.status === 'published') &&
    s.contentMarkdown && 
    s.contentMarkdown.trim() !== '' &&
    s.locale && 
    s.assunto && 
    s.slug
  );
  console.log(`Páginas forjadas (vivas): ${forgedSeeds.length}\n`);

  // 3. Gerar XML
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const urls = forgedSeeds.map(s => {
    const url = buildUrl(s.locale!, s.assunto!, s.slug!);
    const lastmod = s.datePublished ? new Date(s.datePublished).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    
    return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n');

  const xmlFooter = `\n</urlset>`;
  const fullXml = xmlHeader + '\n' + urls + xmlFooter;

  // 4. Salvar em public/sitemap.xml
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, fullXml, 'utf8');

  console.log(`✅ Sitemap gerado com sucesso!`);
  console.log(`📄 Arquivo: ${OUTPUT_PATH}`);
  console.log(` Total de URLs: ${forgedSeeds.length}`);
  console.log(`\n Primeiras 5 URLs:`);
  forgedSeeds.slice(0, 5).forEach(s => {
    console.log(`   - ${buildUrl(s.locale!, s.assunto!, s.slug!)}`);
  });
}

generateSitemap();
