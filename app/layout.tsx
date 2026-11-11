import type { Metadata } from "next";
import { Orbitron, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

// 英文字體：Orbitron
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

// 中文字體：思源黑體（Noto Sans TC）
// 中文字檔很大，所以不預先載入，需要時才下載
const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  preload: false,
});

export const metadata: Metadata = {
  title: "NVR Design Language",
  description: "NYCU Vulpes Racing 品牌識別規範",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${orbitron.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
