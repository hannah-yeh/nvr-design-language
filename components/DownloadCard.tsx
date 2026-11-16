// 積木：下載卡
// 所有下載資源都長這樣：左邊粉紅條、檔名、右邊「大小 / 格式」＋ 圖示
//
// 用法：
//   直接下載（檔案放在 public/ 裡）：
//     <DownloadCard title="NVR Logo" file="/downloads/logo/nvr-logo_logo.svg" />
//     → 檔案大小和格式會自動算，不用手寫
//   開啟雲端（大檔放在車隊 Google Drive）：
//     <DownloadCard title="Photo Library" href="https://drive.google.com/..." />
//     → 顯示「Google Drive」和外連圖示，另開新分頁

import fs from "node:fs";
import path from "node:path";
import { withBasePath } from "@/lib/withBasePath";

type Props = { title: string; className?: string } & (
  | { file: string; href?: never } // 網站內的檔案（路徑從 public/ 之後開始寫）
  | { href: string; file?: never } // 外部連結（雲端）
);

// 把位元組換成好讀的大小，例如 1536 → "2 KB"
function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function DownloadCard({ title, file, href, className = "" }: Props) {
  const isFile = Boolean(file);

  // 網站內的檔案：建置網站時讀取檔案大小，副檔名當作格式
  let info = "Google Drive";
  if (file) {
    const bytes = fs.statSync(path.join(process.cwd(), "public", file)).size;
    const format = path.extname(file).slice(1).toUpperCase();
    info = `${formatSize(bytes)} / ${format}`;
  }

  return (
    <a
      href={file ? withBasePath(file) : href}
      // 直接下載：download 讓瀏覽器存檔而不是打開；雲端：另開新分頁
      {...(isFile ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}
      className={`group flex min-h-24 items-center justify-between gap-6 border-l-4 border-pink bg-card px-6 py-6 transition-colors hover:bg-linear-to-r hover:from-black hover:to-black/50 lg:px-12 ${className}`}
    >
      {/* 檔名：hover 時變粉紅 */}
      <span className="text-button transition-colors group-hover:text-pink">{title}</span>

      {/* 大小 / 格式 ＋ 圖示 */}
      <span className="flex shrink-0 items-center gap-4 text-body tracking-nvr">
        <span className="hidden sm:inline">{info}</span>
        <span className="transition-colors group-hover:text-pink">
          {isFile ? <DownloadIcon /> : <ExternalIcon />}
        </span>
      </span>
    </a>
  );
}

/* ---------- 圖示 ---------- */
// 直接下載：圓圈裡向下的箭頭
function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10.25" />
      <path d="M12 7v9.5M8 12.5l4 4 4-4" />
    </svg>
  );
}

// 開啟雲端：圓圈裡向右上的箭頭
function ExternalIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10.25" />
      <path d="M9 15l6-6M10 9h5v5" />
    </svg>
  );
}
