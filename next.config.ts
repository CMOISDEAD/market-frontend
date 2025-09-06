import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "dropdead.world",
      },
      {
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
