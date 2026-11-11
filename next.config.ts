import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 設定
  output: "export",
  basePath: "/nvr-design-language",
  images: { unoptimized: true },
  trailingSlash: true,

  // 啟動 Tailwind（不要刪掉）
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