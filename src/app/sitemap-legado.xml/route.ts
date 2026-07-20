import { matrixLegado } from '@/data/matrix-legado';

export async function GET() {
  const baseUrl = 'https://certusengine.ia.br';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${matrixLegado.map((page) => `
        <url>
          <loc>${baseUrl}/${page.assunto}/${page.slug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>yearly</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `).join('')}
    </urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
