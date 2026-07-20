import { matrixSoberana } from '@/data/matrix-soberana';

export async function GET() {
  const baseUrl = 'https://certusengine.ia.br';
  const now = Date.now();
  const filteredMatrix = matrixSoberana.filter(page => {
    if (!page.releaseDate) return true;
    return new Date(page.releaseDate).getTime() <= now;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${filteredMatrix.map((page) => `
        <url>
          <loc>${baseUrl}/${page.locale || 'pt'}/${page.assunto}/${page.slug}</loc>
          <lastmod>${page.releaseDate || new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `).join('')}
    </urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
