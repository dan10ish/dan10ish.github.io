export default async function sitemap() {
  const baseUrl = 'https://danish.bio'
  
  // Basic routes
  const routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes]
}
