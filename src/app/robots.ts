import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/app/dashboard'] },
    sitemap: 'https://certusengine.ia.br/sitemap.xml',
  }
}
