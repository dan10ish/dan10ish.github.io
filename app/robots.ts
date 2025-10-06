import { MetadataRoute } from 'next'

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://dan10ish.github.io/sitemap.xml',
    host: 'https://dan10ish.github.io',
  }
} 