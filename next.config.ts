import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  turbopack: {},
  webpack: (config) => {
    config.watchOptions = {
      poll: false,
      aggregateTimeout: 300,
      ignored: /node_modules/,
    };
    return config;
  },
};

export default nextConfig;
