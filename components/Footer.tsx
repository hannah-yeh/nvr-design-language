// Footer：每一頁最下方
// 由上到下：分隔線 → 官網按鈕 → logo ＋ 社群圖示 ＋ 版權文字 → 粉紅色底條
// 連結網址在 data/footer.ts

import Image from "next/image";
import Container from "@/components/Container";
import nvrLogo from "@/assets/logo/nvr-logo_stacked-en-white.svg";
import nycuLogo from "@/assets/logo/nycu-logo-white.png";
import { footerLinks } from "@/data/footer";

export default function Footer() {
  // 年份自動抓（每次部署時更新）
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <Container className="pb-section">
        {/* 分隔線 */}
        <hr className="border-gray" />

        {/* 官網按鈕：深灰底 ＋ 粉紅底線 */}
        <a
          href={footerLinks.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          // 手機版文字用 text-body，電腦版用 text-heading（手機太窄放不下大字）
          className="mt-section inline-flex items-center gap-4 border-b-2 border-pink bg-card px-5 py-4 text-body transition-colors hover:bg-black lg:gap-6 lg:px-8 lg:text-heading"
        >
          <SlashIcon />
          NVR Official Website
        </a>

        {/* 下排：電腦版左右排；手機版上下排 */}
        <div className="mt-section flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
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

// 「///」斜線：白色，由左到右透明度 60% → 80% → 100%，最後一條最粗
function SlashIcon() {
  return (
    <svg width="28" height="24" viewBox="0 0 28 24" fill="none" aria-hidden="true">
      <path d="M6.72992 0H9.25363L2.52372 23.3909H0L6.72992 0Z" className="fill-white" fillOpacity="0.6" />
      <path d="M14.0207 0H16.5444L9.81449 23.3909H7.29077L14.0207 0Z" className="fill-white" fillOpacity="0.8" />
      <path d="M21.3115 0H27.2001L20.4702 23.3909H14.5815L21.3115 0Z" className="fill-white" />
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
