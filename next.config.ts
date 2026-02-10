import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  serverMaxBodySize: '500mb', // Allow large file uploads
  experimental: {
    serverActionsBodySizeLimit: '500mb', // Support large request bodies
  },
};

export default nextConfig;

