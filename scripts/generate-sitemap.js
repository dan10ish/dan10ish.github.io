import { writeFileSync, mkdirSync } from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const siteUrl = 'https://dan10ish.github.io';

const pages = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    url: '/projects',
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    url: '/captures',
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    url: '/writings/neovim-making-it-mine/',
    changefreq: 'yearly',
    priority: 0.7
  },
  {
    url: '/writings/taming-new-devices/',
    changefreq: 'yearly',
    priority: 0.7
  }
];

const generateSitemap = async () => {
  try {
    mkdirSync('dist', { recursive: true });
    mkdirSync('public', { recursive: true });

    const stream = new SitemapStream({ 
      hostname: siteUrl,
      cacheTime: 600000
    });
    
    const sitemapXML = await streamToPromise(Readable.from(pages).pipe(stream));
    const sitemapContent = sitemapXML.toString();

    writeFileSync('dist/sitemap.xml', sitemapContent);
    writeFileSync('public/sitemap.xml', sitemapContent);

    const robotsContent = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`;

    writeFileSync('dist/robots.txt', robotsContent);
    writeFileSync('public/robots.txt', robotsContent);

    console.log('✅ Sitemap and robots.txt generated successfully');
    console.log(`📍 Sitemap includes ${pages.length} pages:`);
    pages.forEach(page => console.log(`   - ${siteUrl}${page.url}`));
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

export default generateSitemap;

if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}
