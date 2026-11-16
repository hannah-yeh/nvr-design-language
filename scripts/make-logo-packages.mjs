// 產生 Logo 頁的下載包（zip）
// 執行方式：npm run logo-packages
//
// 什麼時候要執行：public/downloads/logo/ 裡的 SVG 有新增、刪除或修改時
//
// 會產生 3 個檔案（放在 public/downloads/logo/）：
//   nvr-logo_combination-package.zip  ← 所有 SVG 原檔（粉紅）
//   nvr-logo_pink-package.zip         ← 所有組合的粉紅色 PNG（透明背景）
//   nvr-logo_white-package.zip        ← 所有組合的白色 PNG（透明背景）
//
// PNG 尺寸：每張的長邊 2000px（簡報、社群貼文、文件都夠用；印刷請用 SVG）

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const LOGO_DIR = path.join(process.cwd(), "public/downloads/logo");
const LONG_SIDE = 2000; // PNG 長邊的像素
const PINK = "#d02e8b"; // SVG 原檔裡的品牌粉紅
const COLORS = { pink: PINK, white: "#ffffff" };

// 所有 logo SVG（依檔名排序）
const svgFiles = fs
  .readdirSync(LOGO_DIR)
  .filter((f) => f.startsWith("nvr-logo_") && f.endsWith(".svg"))
  .sort();

// 把資料夾裡的檔案打包成 zip（-j：zip 裡不包含資料夾路徑）
function zip(zipName, files) {
  const out = path.join(LOGO_DIR, zipName);
  fs.rmSync(out, { force: true });
  execFileSync("zip", ["-q", "-j", out, ...files]);
  console.log(`✓ ${zipName}（${files.length} 個檔案）`);
}

// 1. SVG 原檔包
zip(
  "nvr-logo_combination-package.zip",
  svgFiles.map((f) => path.join(LOGO_DIR, f)),
);

// 2. 粉紅、白色 PNG 包
for (const [name, color] of Object.entries(COLORS)) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `nvr-${name}-`));
  const pngs = [];

  for (const file of svgFiles) {
    // 換顏色：把 SVG 裡的品牌粉紅換成目標顏色
    const svg = fs.readFileSync(path.join(LOGO_DIR, file), "utf8").replaceAll(PINK, color);

    // 從 viewBox 算出原始比例，決定輸出尺寸（長邊 = LONG_SIDE）
    const [, , w, h] = svg.match(/viewBox="([^"]+)"/)[1].split(/[\s,]+/).map(Number);
    const scale = LONG_SIDE / Math.max(w, h);

    // density：讓 SVG 用夠高的解析度轉成點陣圖，邊緣才會銳利
    const out = path.join(tmp, file.replace(".svg", `_${name}.png`));
    await sharp(Buffer.from(svg), { density: 72 * scale })
      .resize(Math.round(w * scale), Math.round(h * scale))
      .png()
      .toFile(out);
    pngs.push(out);
  }

  zip(`nvr-logo_${name}-package.zip`, pngs);
  fs.rmSync(tmp, { recursive: true, force: true });
}
