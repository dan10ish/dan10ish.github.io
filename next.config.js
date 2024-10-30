/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  webpack: (config) => {
    // Enable filesystem caching
    config.cache = {
      type: "filesystem",
      buildDependencies: {
        config: [__filename],
      },
    };

    // Keep your existing markdown loader
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },
  // Safe optimizations that won't affect functionality
  swcMinify: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
