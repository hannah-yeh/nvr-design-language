import type { NextConfig } from "next";

// 網站在 GitHub Pages 上的子路徑（repo 轉移或改用自訂網域時，改這裡）
const basePath = "/nvr-design-language";

const nextConfig: NextConfig = {
  // GitHub Pages 設定
  output: "export",
  basePath,
  // 把 basePath 傳給程式使用（lib/withBasePath.ts 會用到）
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  trailingSlash: true,

  // 預覽時（npm run dev）左下角的 Next.js 小按鈕，移到右下角；正式網站不會出現
  devIndicators: { position: "bottom-right" },

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