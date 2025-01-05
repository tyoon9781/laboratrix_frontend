import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_HOST: process.env.BACKEND_HOST,
    NEXT_PUBLIC_BACKEND_PORT: process.env.BACKEND_PORT,
  },
};

export default nextConfig;
