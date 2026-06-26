import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async redirects() {
    return [
      // non-www → www (backlinks are on www, so www is canonical)
      {
        source: "/:path*",
        has: [{ type: "host", value: "zambotoday.com" }],
        destination: "https://www.zambotoday.com/:path*",
        permanent: true,
      },
      // DO NOT add the .html redirect — it would break your archive page
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/_next/static/(.*)",  // correct path, not /public/
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;