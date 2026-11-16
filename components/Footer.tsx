// Footer：每一頁最下方
// 由上到下：分隔線 → 官網按鈕 → logo ＋ 社群圖示 ＋ 版權文字 → 粉紅色底條
// footer 裡的距離用 text-image（64px），比頁面段落間距小，看起來比較緊湊
// 連結網址在 data/footer.ts

import Image from "next/image";
import Container from "@/components/Container";
import nvrLogo from "@/assets/logo/nvr-logo_stacked-en-white.svg";
import nycuLogo from "@/assets/logo/nycu-logo-white.png";
import { footerLinks } from "@/data/footer";

// 官網按鈕的形狀：左上、右下各切掉一個 16px 的斜角
// 要改切角大小，兩個形狀裡的 16px 都要一起改（18.83px、16.83px 是 16px 加上底線粗細算出來的）
const buttonShape =
  "polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)";
// 深灰底的形狀：和上面一樣，但底部和右下斜邊往內縮 2px，留出粉紅底線
const buttonFillShape =
  "polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 18.83px), calc(100% - 16.83px) calc(100% - 2px), 0 calc(100% - 2px))";

export default function Footer() {
  // 年份自動抓（每次部署時更新）
  const year = new Date().getFullYear();

  return (
    // pt-footer-top：footer 上方額外留白（電腦 128px、手機 96px），數值在 globals.css
    <footer className="mt-auto pt-footer-top">
      <Container className="pb-text-image">
        {/* 分隔線 */}
        <hr className="border-gray" />

        {/* 官網按鈕：左上、右下切角 ＋ 粉紅底線（底線沿著右下切角往上） */}
        <a
          href={footerLinks.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          // group：讓裡面的底色層知道滑鼠有沒有移到按鈕上
          // 手機版文字用 text-body（16px），電腦版用 text-button（20px）
          className="group relative mt-text-image inline-flex items-center gap-4 px-5 py-4 text-body transition-colors hover:text-pink lg:gap-6 lg:px-8 lg:text-button"
        >
          {/* 第 1 層：粉紅色，切成按鈕形狀 */}
          <span aria-hidden="true" className="absolute inset-0 bg-pink" style={{ clipPath: buttonShape }} />
          {/* 第 2 層：深灰底，比粉紅層底部少 2px，露出來的就是粉紅底線 */}
          {/* hover 時：左邊黑色，往右慢慢變淡，最右邊是半透明黑（比頁面背景暗，才不會跟背景融在一起） */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-card group-hover:bg-linear-to-r group-hover:from-black group-hover:to-black/50"
            style={{ clipPath: buttonFillShape }}
          />
          {/* relative：讓圖示和文字疊在底色上面 */}
          <span className="relative flex">
            <SlashIcon />
          </span>
          <span className="relative">NVR Official Website</span>
        </a>

        {/* 下排：電腦版左右排；手機版上下排 */}
        <div className="mt-text-image flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          {/* 左：logo */}
          <div className="flex items-end gap-8">
            <Image src={nvrLogo} alt="NYCU Vulpes Racing" className="h-15 w-auto" />
            <Image src={nycuLogo} alt="National Yang Ming Chiao Tung University" className="h-4 w-auto" />
          </div>

          {/* 右：社群圖示 ＋ 版權文字 */}
          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex gap-6">
              <a href={footerLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href={footerLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
            <p className="text-small">
              <span className="text-gray">©</span> {year} NYCU Racing. All rights reserved.
            </p>
          </div>
        </div>
      </Container>

      {/* 粉紅色底條 */}
      <div className="h-2 bg-pink" />
    </footer>
  );
}

/* ---------- 圖示 ---------- */

// 「///」斜線：跟著文字顏色（平常白色、hover 粉紅），由左到右透明度 60% → 80% → 100%，最後一條最粗
function SlashIcon() {
  return (
    <svg width="28" height="24" viewBox="0 0 28 24" fill="none" aria-hidden="true">
      <path d="M6.72992 0H9.25363L2.52372 23.3909H0L6.72992 0Z" className="fill-current" fillOpacity="0.6" />
      <path d="M14.0207 0H16.5444L9.81449 23.3909H7.29077L14.0207 0Z" className="fill-current" fillOpacity="0.8" />
      <path d="M21.3115 0H27.2001L20.4702 23.3909H14.5815L21.3115 0Z" className="fill-current" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" className="fill-white" />
      <path
        d="M13.4 23v-8.2h2.6l.4-3h-3V9.9c0-.9.3-1.5 1.5-1.5h1.6V5.7c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.8v3h2.6V23z"
        className="fill-surface"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" className="stroke-white" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.6" cy="6.4" r="0.6" className="fill-white" />
    </svg>
  );
}
