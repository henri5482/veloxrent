import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/private/'],
    },
    sitemap: 'https://www.veloxrentperu.com/sitemap.xml',
    host: 'https://www.veloxrentperu.com',
  }
}
