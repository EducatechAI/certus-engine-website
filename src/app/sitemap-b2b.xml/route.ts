import { matrixB2b } from '@/data/matrix-b2b';

export async function GET() {
  const baseUrl = 'https://certusengine.ia.br';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${matrixB2b.map((page) => `
        <url>
          <loc>${baseUrl}/${page.assunto}/${page.slug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `).join('')}
    </urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
