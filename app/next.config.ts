import type { NextConfig } from "next";
import { NextConfig as WebpackNextConfig } from "next/dist/server/config-shared";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@mui/styled-engine": "@mui/styled-engine-sc",
    };
    return config;
  },
};

export default nextConfig;
