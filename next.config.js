const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: false },
  compress: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        maxSize: 40000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: (module) => {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `vendor.${packageName.replace("@", "")}`;
            },
            priority: 20,
          },
          common: {
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: "single",
    };
    return config;
  },
};

module.exports = nextConfig;
