import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
