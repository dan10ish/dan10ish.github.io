/** @type {import('next-sitemap').IConfig} */
const config = {
 siteUrl: "https://danish.bio",
 generateRobotsTxt: true,
 outDir: "./out",
 generateIndexSitemap: false,
 transform: async (config, path) => {
   return {
     loc: path,
     changefreq: path === "/" ? "daily" : "weekly", 
     priority: path === "/" ? 1.0 : 0.7,
     lastmod: new Date().toISOString(),
   };
 },
 additionalPaths: async (config) => {
   const posts = require('./lib/posts').getBlogPosts();
   const blogPaths = posts.map(post => `/post/${post.slug}`);
   
   const staticPaths = [
     '/books',
     '/notes', 
     '/photos',
     '/projects',
     '/resources',
     '/robotics',
     '/ml',
     '/finance',
     '/planes',
     '/posts'
   ];

   return [...staticPaths, ...blogPaths].map(path => 
     config.transform(config, path)
   );
 },
};

module.exports = config;