import type { Metadata } from "next";
import { Orbitron, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

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
      lang="en"
      className={`${orbitron.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 側邊欄（電腦版在左邊，手機版變成上方選單） */}
        <Sidebar />
        {/* 內容區：電腦版要往右讓出側邊欄的寬度 */}
        <div className="flex flex-1 flex-col lg:pl-sidebar">
          {children}
          {/* Footer（每頁最下方） */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
