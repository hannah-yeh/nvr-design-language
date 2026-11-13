"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo/nvr-logo_nvr-horizontal-zh-en.svg";
import { navItems } from "@/data/nav";

// 把網址最後的「/」去掉，方便比對（例如 "/logo/" 和 "/logo" 視為同一頁）
function normalize(path: string) {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

/* ---------- 側邊欄內容（電腦版和手機滑出選單共用） ---------- */
function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = normalize(usePathname());

  return (
    // 側邊欄文字：text-body（16px）＋ tracking-nvr（字距 16%）＋ font-semibold（半粗體）
    // 注意：font-semibold 要直接加在文字上，加在外層不會生效
    <div className="flex h-full flex-col">
      {/* Logo：點了回主頁 */}
      <Link href="/" onClick={onNavigate} className="block px-6 pt-14">
        <Image src={logo} alt="NVR 陽明交大方程式賽車隊" className="h-11 w-auto" loading="eager" />
      </Link>

      {/* 選單（mt-24：logo 到選單的距離 96px） */}
      <nav className="mt-24">
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex h-12 items-center border-l-4 pl-8 text-body font-semibold tracking-nvr transition-colors ${
                    isActive
                      ? "border-pink bg-surface text-white" // 目前頁面：粉紅左邊條 + 灰底 + 白字
                      : "border-transparent text-gray hover:bg-surface/50" // 其他頁面：灰字
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 地球圖示（語言切換，目前只是裝飾） */}
      <div className="mt-auto px-6 pb-8 pt-12">
        <LanguageIcon />
      </div>
    </div>
  );
}

/* ---------- 整個側邊欄（電腦版 + 手機版） ---------- */
export default function Sidebar() {
  // 手機選單是否打開
  const [open, setOpen] = useState(false);

  // 選單打開時：鎖住後面的頁面不能捲動，並且按 Esc 可以關閉
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* 電腦版：固定在左邊的黑色側邊欄（螢幕 1024px 以上才顯示） */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-sidebar overflow-y-auto bg-black lg:block">
        <SidebarContent />
      </aside>

      {/* 手機版：上方黑色選單列（螢幕小於 1024px 才顯示） */}
      <header className="sticky top-0 z-30 flex h-topbar items-center justify-between bg-black px-gutter lg:hidden">
        <Link href="/">
          <Image src={logo} alt="NVR 陽明交大方程式賽車隊" className="h-6 w-auto" loading="eager" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="-mr-2 p-2 text-pink"
        >
          <MenuIcon />
        </button>
      </header>

      {/* 手機版：半透明黑色遮罩，點一下關閉選單 */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* 手機版：從左側滑出的選單 */}
      <aside
        inert={!open}
        className={`fixed inset-y-0 left-0 z-50 w-sidebar overflow-y-auto bg-black transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute right-3 top-3 p-2 text-pink"
        >
          <CloseIcon />
        </button>
        <SidebarContent onNavigate={() => setOpen(false)} />
      </aside>
    </>
  );
}

/* ---------- 圖示 ---------- */
function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

// Google Material Icons 的「language」圖示
function LanguageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
    </svg>
  );
}
