import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(["lh3", "lh4", "lh5", "lh6"] as const).map((sub) => ({
        protocol: "https" as const,
        hostname: `${sub}.googleusercontent.com`,
        pathname: "/**",
      })),
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
