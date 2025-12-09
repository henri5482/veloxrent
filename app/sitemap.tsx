import { MetadataRoute } from 'next'



export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.veloxrentperu.com'
  
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const, // Cambiado de yearly a monthly
      priority: 1.0,
    },
    {
      url: `${baseUrl}/vehiculos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ofertas`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8, // Aumentado de 0.7 a 0.8
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    
    
   
  ]

  return [...staticUrls, ]
}