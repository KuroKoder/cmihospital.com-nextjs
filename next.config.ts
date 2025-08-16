import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Experimental features untuk performance
  experimental: {
    optimizePackageImports: ["lucide-react", "@heroicons/react"],
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cms-dev.cmihospital.com",
      },
      {
        protocol: "https",
        hostname: "cms-prod.cmihospital.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      // Added for YouTube thumbnails (for your video section)
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },

  // Compression
  compress: true,

  // Hilangkan header "X-Powered-By"
  poweredByHeader: false,

  // React strict mode
  reactStrictMode: true,

  // ❌ REMOVED: swcMinify: true, // This is now default in Next.js 13+

  // Headers untuk caching dan security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Added security headers
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(favicon.ico|site.webmanifest|robots.txt)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      // Added specific caching for static assets
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Optional: Add redirects for SEO if needed
  async redirects() {
    return [
      // Example redirects - add as needed
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ];
  },

  // Optional: Add rewrites for clean URLs
  async rewrites() {
    return [
      // Example rewrites - add as needed
      // {
      //   source: '/blog/:slug',
      //   destination: '/artikel-kesehatan/:slug',
      // },
    ];
  },

  // Environment variables validation
  env: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL || "https://cmihospital.com",
  },

  // TypeScript and ESLint settings
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
