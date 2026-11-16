// 把 public/downloads/logo/ 裡的 logo SVG 直接畫在網頁上，並且可以換顏色
// 顏色跟著文字顏色走：外面加 text-white 就是白色，text-pink 就是粉紅
//
// 用法：<LogoSvg file="nvr-logo_nvr-horizontal-zh-en.svg" className="w-1/2 text-white" />
//
// 好處：網站上顯示的 logo 和給人下載的是同一個檔案，改了 SVG 兩邊會一起更新

import fs from "node:fs";
import path from "node:path";

export default function LogoSvg({
  file,
  label = "NVR logo",
  className = "",
}: {
  file: string; // public/downloads/logo/ 裡的檔名
  label?: string; // 給螢幕閱讀器讀的說明
  className?: string;
}) {
  const raw = fs.readFileSync(path.join(process.cwd(), "public/downloads/logo", file), "utf8");

  // 整理 SVG 原始碼，讓它能安全地放進網頁、並且可以換顏色
  const inner = raw
    .replace(/<\?xml[^>]*\?>/, "") // 拿掉檔頭
    .replace(/<defs>[\s\S]*?<\/defs>/, "") // 拿掉設計軟體產生的樣式（避免影響網頁其他地方）
    .replace(/class="cls-\d+"/g, 'fill="currentColor"') // 顏色改成跟著文字顏色
    .replace(/<svg[^>]*>/, "") // 拿掉外框標籤，下面重新包一層
    .replace(/<\/svg>\s*$/, "");

  const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1];

  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      className={className}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
