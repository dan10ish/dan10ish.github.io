const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname)
    };
    return config;
  }
};

module.exports = nextConfig;
