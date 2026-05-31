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
  turbopack: {
    root: path.resolve(__dirname),
  },
  allowedDevOrigins: ['192.168.1.111'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };
    return config;
  },
};

module.exports = nextConfig;
