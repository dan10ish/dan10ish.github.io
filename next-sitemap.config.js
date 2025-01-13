/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://danish.bio",
  generateRobotsTxt: true,
  outDir: "./out",
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => [
    await config.transform(config, "/books"),
    await config.transform(config, "/notes"),
    await config.transform(config, "/photos"),
    await config.transform(config, "/projects"),
    await config.transform(config, "/resources"),
    await config.transform(config, "/robotics"),
    await config.transform(config, "/ml"),
    await config.transform(config, "/finance"),
    await config.transform(config, "/planes"),
  ],
};

module.exports = config;
