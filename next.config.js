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
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    if (dev) {
      config.cache = false;
    }

    return config;
  },
  swcMinify: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
