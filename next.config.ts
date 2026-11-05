import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // hide the Next.js "N" dev badge (it never shows on the live site anyway)
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
