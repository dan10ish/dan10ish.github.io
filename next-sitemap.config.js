const { getAllBlogSlugs } = require("./lib/blogs");

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://danish.bio",
  generateRobotsTxt: true,
  outDir: "./out",
  generateIndexSitemap: false,
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1.0 : path.startsWith("/blog/") ? 0.8 : 0.7,
    lastmod: new Date().toISOString(),
  }),
  additionalPaths: async (config) => {
    const staticPaths = ["/photos", "/projects"];

    let blogPaths = [];
    try {
      const slugs = getAllBlogSlugs();
      blogPaths = slugs.map((slug) => `/blog/${slug}`);
    } catch (e) {
      // blogs may not exist yet
    }

    const allPaths = [...staticPaths, ...blogPaths];
    return allPaths.map((path) => config.transform(config, path));
  },
};

module.exports = config;
