import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
    {
      protocol: 'https',
      hostname: 'cms-dev.cmihospital.com',
    },
    {
      protocol: 'https',
      hostname: 'cms-prod.cmihospital.com',
    },
    {
      protocol: 'https',
      hostname: 'cdn.pixabay.com',
    }
  ],
}


};

export default nextConfig;
