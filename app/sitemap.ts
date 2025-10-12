import { MetadataRoute } from 'next'
import { getSortedWritingsData } from '../lib/server'

export const dynamic = "force-static"

function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('-')
  return new Date(`${year}-${month}-${day}`)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dan10ish.github.io'
  
  const writings = getSortedWritingsData()
  
  const writingUrls = writings.map((writing) => ({
    url: `${baseUrl}/writings/${writing.slug}`,
    lastModified: parseDate(writing.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...writingUrls,
  ]
}
