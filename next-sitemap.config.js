/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://danish.bio",
  generateRobotsTxt: true,
  outDir: "./public",
  generateIndexSitemap: false,
  transform: async (config, path) => {
    console.log(`Generating sitemap for path: ${path}`);
    return {
      loc: path,
      changefreq: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    let blogPaths = [];
    try {
      console.log("Fetching blog posts...");
      const posts = require("./lib/posts").getBlogPosts();
      console.log(`Found ${posts.length} blog posts`);
      blogPaths = posts.map((post) => `/post/${post.slug}`);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }

    const staticPaths = [
      "/books",
      "/notes",
      "/photos",
      "/projects",
      "/resources",
      "/robotics",
      "/ml",
      "/finance",
      "/planes",
      "/posts",
    ];

    const allPaths = [...staticPaths, ...blogPaths];
    console.log(`Generated ${allPaths.length} paths for sitemap`); // Debug logging

    return allPaths.map((path) => config.transform(config, path));
  },
};

module.exports = config;
