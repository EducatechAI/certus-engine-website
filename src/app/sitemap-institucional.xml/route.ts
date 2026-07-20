export async function GET() {
  const base = 'https://certusengine.ia.br';
  const pages = ['', '/produto', '/vantagens', '/zk-midnight', '/como-usar', '/pricing', '/faq', '/contato', '/app'];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map((path) => `
        <url>
          <loc>${base}${path}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${path === '' ? 'weekly' : 'monthly'}</changefreq>
          <priority>${path === '' ? 1 : path === '/pricing' ? 0.9 : 0.7}</priority>
        </url>
      `).join('')}
    </urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
