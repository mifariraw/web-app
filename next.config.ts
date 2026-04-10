import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    position: "bottom-right",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // pathname: `/${process.env.CLOUDINARY_CLOUD_NAME}/**`,
      },
    ],
  },
  serverExternalPackages: [
    "mongoose",
    "mongodb",
    "cloudinary",
    "bcrypt",
    // "socket.io",
  ],
};

export default nextConfig;
