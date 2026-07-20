import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://certusengine.ia.br';
  return [
    { url: `${baseUrl}/sitemap-institucional.xml`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/sitemap-soberana.xml`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/sitemap-b2b.xml`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/sitemap-legado.xml`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];
}
