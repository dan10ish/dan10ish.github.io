const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
    domains: ["danish.bio"],
  },
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "lucide-react",
      "@react-three/drei",
      "framer-motion",
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    });

    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        maxSize: 70000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
            priority: 10,
            enforce: true,
          },
          common: {
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
          },
        },
      },
      moduleIds: "deterministic",
    };

    return config;
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
