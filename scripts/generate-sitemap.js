import { writeFileSync, mkdirSync } from 'fs';

const siteUrl = 'https://dan10ish.github.io';

const generateSitemap = async () => {
  try {
    mkdirSync('dist', { recursive: true });
    mkdirSync('public', { recursive: true });

    const currentDate = new Date().toISOString();
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    writeFileSync('dist/sitemap.xml', sitemapContent);
    writeFileSync('public/sitemap.xml', sitemapContent);

    const robotsContent = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`;

    writeFileSync('dist/robots.txt', robotsContent);
    writeFileSync('public/robots.txt', robotsContent);

    console.log('✅ Sitemap and robots.txt generated successfully');
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

export default generateSitemap;

if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}
