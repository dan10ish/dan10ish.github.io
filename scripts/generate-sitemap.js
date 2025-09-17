import { writeFileSync, mkdirSync } from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const siteUrl = 'https://dan10ish.github.io';

const pages = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0
  }
];

// Generate a minimal image sitemap with just the main OG image
const generateImageSitemap = async () => {
  const imageXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <image:image>
      <image:loc>https://i.ibb.co/vmBrhSd/OG.png</image:loc>
      <image:caption>Danish Ansari - Portfolio</image:caption>
      <image:title>Danish Ansari Portfolio Homepage</image:title>
    </image:image>
  </url>
</urlset>`;
  return imageXML;
};

// Generate minimal video sitemap (empty for now since videos are within the SPA)
const generateVideoSitemap = async () => {
  const videoXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
</urlset>`;
  return videoXML;
};

const generateSitemap = async () => {
  try {
    mkdirSync('dist', { recursive: true });
    mkdirSync('public', { recursive: true });

    // Create clean, readable XML for better Google Search Console compatibility
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

    // Generate image sitemap
    const imageSitemap = await generateImageSitemap();
    writeFileSync('dist/sitemap-images.xml', imageSitemap);
    writeFileSync('public/sitemap-images.xml', imageSitemap);

    // Generate video sitemap  
    const videoSitemap = await generateVideoSitemap();
    writeFileSync('dist/sitemap-videos.xml', videoSitemap);
    writeFileSync('public/sitemap-videos.xml', videoSitemap);

    const robotsContent = `# robots.txt for https://dan10ish.github.io
# Generated automatically - Single Page Application (SPA)

User-agent: *
Allow: /
Allow: /assets/
Allow: /fonts/
Allow: /icon.png
Allow: /manifest.json

# Block unnecessary crawling
Disallow: /node_modules/
Disallow: /.git/
Disallow: /src/
Disallow: /_next/

# Crawling directives
Crawl-delay: 1

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/sitemap-images.xml`;

    writeFileSync('dist/robots.txt', robotsContent);
    writeFileSync('public/robots.txt', robotsContent);

    console.log('✅ SPA-optimized SEO package generated successfully');
    console.log('📄 Generated files:');
    console.log('   - sitemap.xml (main page only)');
    console.log('   - sitemap-images.xml (OG image)');
    console.log('   - sitemap-videos.xml (placeholder)');
    console.log('   - robots.txt (SPA-optimized)');
    console.log(`📍 Single Page Application with ${pages.length} crawlable URL:`);
    pages.forEach(page => console.log(`   - ${siteUrl}${page.url} (contains all SPA content)`));
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

export default generateSitemap;

if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}
