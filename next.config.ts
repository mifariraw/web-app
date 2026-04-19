import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

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
        pathname: `/${process.env.CLOUDINARY_CLOUD_NAME}/**`,
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

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
