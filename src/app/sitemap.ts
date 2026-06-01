import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://certus.engine.ai'
  const pages = ['', '/produto', '/vantagens', '/zk-midnight', '/como-usar', '/pricing', '/faq', '/contato', '/app']

  return pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/pricing' ? 0.9 : 0.7,
  }))
}
