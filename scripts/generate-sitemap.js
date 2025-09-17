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

const generateImageSitemap = async () => {
  const imagePages = [
    {
      url: '/',
      images: [
        {
          loc: 'https://i.ibb.co/vmBrhSd/OG.png',
          caption: 'Danish Ansari Portfolio Preview',
          title: 'Portfolio Homepage'
        },
        {
          loc: `${siteUrl}/assets/wallpaper.png`,
          caption: 'Desktop Wallpaper',
          title: 'Portfolio Desktop Background'
        }
      ]
    },
    {
      url: '/captures',
      images: [
        {
          loc: `${siteUrl}/captures/Image1.jpeg`,
          caption: 'Portfolio Screenshot 1'
        },
        {
          loc: `${siteUrl}/captures/Image2.jpeg`,
          caption: 'Portfolio Screenshot 2'
        }
      ]
    }
  ];

  let imageXML = '<?xml version="1.0" encoding="UTF-8"?>\n';
  imageXML += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  imagePages.forEach(page => {
    imageXML += `  <url>\n    <loc>${siteUrl}${page.url}</loc>\n`;
    page.images.forEach(img => {
      imageXML += '    <image:image>\n';
      imageXML += `      <image:loc>${img.loc}</image:loc>\n`;
      if (img.caption) imageXML += `      <image:caption>${img.caption}</image:caption>\n`;
      if (img.title) imageXML += `      <image:title>${img.title}</image:title>\n`;
      imageXML += '    </image:image>\n';
    });
    imageXML += '  </url>\n';
  });
  
  imageXML += '</urlset>';
  return imageXML;
};

const generateVideoSitemap = async () => {
  const videoPages = [
    {
      url: '/projects',
      videos: [
        {
          thumbnail_loc: `${siteUrl}/assets/projects/algosim.mp4`,
          video_loc: `${siteUrl}/assets/projects/algosim.mp4`,
          title: 'AlgoSim - Algorithm Visualization Tool',
          description: 'Interactive algorithm visualization and simulation tool for learning data structures and algorithms'
        },
        {
          thumbnail_loc: `${siteUrl}/assets/projects/path.mp4`,
          video_loc: `${siteUrl}/assets/projects/path.mp4`,
          title: 'Pathfinder Visualization',
          description: 'Interactive pathfinding algorithm visualizer with multiple algorithms'
        }
      ]
    }
  ];

  let videoXML = '<?xml version="1.0" encoding="UTF-8"?>\n';
  videoXML += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';
  
  videoPages.forEach(page => {
    videoXML += `  <url>\n    <loc>${siteUrl}${page.url}</loc>\n`;
    page.videos.forEach(vid => {
      videoXML += '    <video:video>\n';
      videoXML += `      <video:thumbnail_loc>${vid.thumbnail_loc}</video:thumbnail_loc>\n`;
      videoXML += `      <video:title>${vid.title}</video:title>\n`;
      videoXML += `      <video:description>${vid.description}</video:description>\n`;
      videoXML += `      <video:content_loc>${vid.video_loc}</video:content_loc>\n`;
      videoXML += '    </video:video>\n';
    });
    videoXML += '  </url>\n';
  });
  
  videoXML += '</urlset>';
  return videoXML;
};

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

    // Generate image sitemap
    const imageSitemap = await generateImageSitemap();
    writeFileSync('dist/sitemap-images.xml', imageSitemap);
    writeFileSync('public/sitemap-images.xml', imageSitemap);

    // Generate video sitemap  
    const videoSitemap = await generateVideoSitemap();
    writeFileSync('dist/sitemap-videos.xml', videoSitemap);
    writeFileSync('public/sitemap-videos.xml', videoSitemap);

    const robotsContent = `# robots.txt for https://dan10ish.github.io
# Generated automatically - optimized for SEO

User-agent: *
Allow: /
Allow: /projects
Allow: /captures
Allow: /writings/
Allow: /assets/
Allow: /fonts/

# Block unnecessary crawling
Disallow: /node_modules/
Disallow: /.git/
Disallow: /src/
Disallow: /_next/static/

# Enhanced crawling directives
Crawl-delay: 1

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml

# Additional sitemaps for different content types
Sitemap: ${siteUrl}/sitemap-images.xml
Sitemap: ${siteUrl}/sitemap-videos.xml`;

    writeFileSync('dist/robots.txt', robotsContent);
    writeFileSync('public/robots.txt', robotsContent);

    console.log('✅ Comprehensive SEO package generated successfully');
    console.log('📄 Generated files:');
    console.log('   - sitemap.xml (main pages)');
    console.log('   - sitemap-images.xml (image SEO)');
    console.log('   - sitemap-videos.xml (video SEO)');
    console.log('   - robots.txt (crawler directives)');
    console.log(`📍 Main sitemap includes ${pages.length} pages:`);
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
