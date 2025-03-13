/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://danish.bio",
  generateRobotsTxt: true,
  outDir: "./out",
  generateIndexSitemap: false,
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1.0 : 0.7,
    lastmod: new Date().toISOString(),
  }),
  additionalPaths: async (config) => {
    const staticPaths = ["/photos", "/projects"];
    return staticPaths.map((path) => config.transform(config, path));
  },
};

module.exports = config;
