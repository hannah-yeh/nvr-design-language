@AGENTS.md

# NVR Design Language

NYCU Vulpes Racing（NVR，陽明交大方程式賽車隊）的品牌識別規範網站。
靈感來自 Audi 的線上 CI 網站，定位是**對內實用**：讓不懂視覺設計的隊員，馬上知道去哪裡找資源、怎麼正確使用品牌。

- 設計與維護：Hannah
- 未來會交接給學弟妹維護，所以結構要簡單、好懂、好改
- 之後會另外做一個對外的官方網站，這個網站不負責對外宣傳

---

## 跟使用者溝通的方式

- **一律使用繁體中文**
- 解釋時用白話和生活化比喻，少用術語；需要用術語時順便解釋
- **一次只做一小步**，做完請她用 `npm run dev` 檢查，確認沒問題再往下
- 改動前先說明要改什麼、為什麼；每完成一個段落，提醒她 commit 和 push
- 程式碼裡的註解用中文

---

## 技術架構

| 項目 | 選擇 |
|---|---|
| 框架 | Next.js 16（App Router、TypeScript） |
| 樣式 | Tailwind CSS v4（透過 `@tailwindcss/turbopack`） |
| 內容 | MDX（尚未安裝，之後每頁內容寫成 MDX，插入積木元件） |
| 部署 | GitHub Pages，用 GitHub Actions 自動建置 |
| 後台 | 不做。內容與外觀分開，改 MDX／資料檔即可 |

- Repo：`hannah-yeh/nvr-design-language`（之後可能轉移到車隊的 GitHub 組織）
- 網址：https://hannah-yeh.github.io/nvr-design-language/
- 本機預覽：`npm run dev` 後打開 **http://localhost:3000/nvr-design-language**（因為有 basePath，不是根目錄）

- 專案放在 `~/Development/nvr-design-language`。**不要放在 iCloud 同步的「文件」或「桌面」**，會產生「xxx 2」的重複檔，導致建置失敗。如果遇到，刪掉 `.next/` 和 `out/` 再重跑

### ⚠️ 部署相關的重要規則

1. **`next.config.ts` 的 Tailwind 設定絕對不能刪**（`turbopack.rules` 裡的 `@tailwindcss/turbopack`）。曾經因為整個檔案被覆蓋，導致 Tailwind 失效。修改設定檔時**先讀現有內容，只增不刪**。
2. 網站是**純靜態輸出**（`output: "export"`），不能使用需要伺服器的功能：API routes、Server Actions、cookies／headers、middleware、ISR、`cacheComponents` 等。
3. **basePath 是 `/nvr-design-language`**。用字串寫的路徑（例如 `<img src="/logo.svg">` 或 `next/image` 的字串 src）**不會自動加上前綴**，上線後會 404。
   - 圖片：用 `import logo from "@/..."` 靜態匯入的方式
   - `public/` 裡的下載檔：做一個加前綴的小工具函式（例如 `withBasePath()`），統一處理
   - 如果之後 repo 轉移或改用自訂網域，basePath 要跟著改
4. 圖片沒有自動壓縮（`images.unoptimized: true`），上傳前要先壓縮（WebP、寬度約 2000px 以內）
5. 不要執行 `npm audit fix --force`，可能會弄壞專案
6. `.github/workflows/deploy.yml` 已設定好；push 到 main 會自動部署

---

## 設計規則（Design Tokens）

這些要寫進 `app/globals.css` 的 Tailwind `@theme`，讓整個網站只能用這些名字。

### 顏色

| 色碼 | 用途 |
|---|---|
| `#000000` | 側邊欄背景（品牌黑） |
| `#24272A` | 內容區背景（主頁和所有內頁都一樣） |
| `#FFFFFF` | **所有文字**（標題、內文都是白色）。例外：側邊欄選單文字用 `#A4A8AA`，目前頁面那一項用白色 |
| `#D02E8B` | 品牌粉紅。強調用：選單選中、下載卡左邊條、連結、圖示、大標題。**在深色背景上對比不足，不要用在內文** |
| `#FFD100` | 品牌黃。用在「注意」提示框 |
| `#A4A8AA` | 品牌中性灰 |
| `#DFE2E8` | 品牌淺灰 |
| `#2F3237` | 下載卡底色（**網站介面用色，不列入品牌色**） |

### 字體

- **英文用 Orbitron，中文用思源黑體（Noto Sans TC）**
- 做法：字體堆疊設成「Orbitron → Noto Sans TC」，Orbitron 沒有中文字，瀏覽器會自動用思源黑體顯示中文
- 兩套都從 Google Fonts 載入（用 `next/font/google`，靜態輸出可用）
- **字距一律 16%**（`letter-spacing: 0.16em`）
- 備註：內文長段落在 12% 

### 字級（全部白色）

- 例外：側邊欄文字一律 Semibold

| 層級 | 電腦 | 手機 | 行高 | 粗細 | 用途 |
|---|---|---|---|---|---|
| 封面標題 | 56px | 36px | 1.1 | Semibold 600 | 每頁封面的項目名稱 |
| 標題 | 28px | 22px | 1.3 | Medium 500 | 內容段落標題 |
| 內文 | 16px | 16px | 2.6 | Regular 400 | 一般說明文字、圖片說明、下載卡檔案資訊；側邊欄文字也用這個大小（但字距維持 16%） |
| 小字 | 10px | 10px | 1.6 | Regular 400 | 只用在 footer 版權文字 |

### 間距與尺寸（以 8 為單位）

| 項目 | 電腦 | 手機 |
|---|---|---|
| 圖片之間 | 16px | 16px |
| 標題到內文 | 28px | 28px |
| 區塊之間 | 64px | 48px |
| 內容左右留白 | 72px | 20px |
| 內容區寬度 | 不設上限，跟著螢幕變寬（左右固定留白；文字和圖片同寬） | 滿寬 |
| 封面高度 | 560px | 280px |
| 側邊欄寬度 | 320px | 收成上方選單列，高 56px |
| 下載卡左邊條 | 4px | 4px |
| 圓角 | 0（銳利風格） | 0 |

- 斷點：螢幕寬度 **小於 1024px** 時，側邊欄收起變成上方選單

---

## 網站結構

側邊欄選單（順序固定）。主頁（NVR Brand，車隊精神）是首頁，點 logo 進入，不在選單裡：

| 頁面 | 內容 |
|---|---|
| **主頁 NVR Brand**（不在選單，點 logo 進入） | 車隊精神 |
| **Logo** | NVR 與標準字組合、顏色版本、最小尺寸、深色／淺色背景、錯誤示範 |
| **Colors** | 顏色規範（主色、輔色、中性色）、HEX／RGB／CMYK、使用比例、文字搭配 |
| **Typography** | Orbitron、思源黑體、字級層級、中英混排規則 |
| **VR_** | VR 產生器（特殊功能頁） |
| **Sponsors** | 贊助級距規範 |
| **Social Media** | 貼文模板 |
| **Application** | 周邊商品、海報、印刷注意事項（CMYK、出血、要給印刷廠什麼格式的檔案） |
| **Resources** | 字卡、icon（所有下載資源集中處） |

### 關於 VR_ 產生器
- 車隊每年出一代車，以「VR + 數字」命名（例如 VR7、VR7.5）
- 產生器：輸入數字 → 即時預覽 VR 標準字 → 下載 SVG／PNG
- 要支援小數點（例如 7.5）

---

## 頁面版型與積木

除了特殊功能頁（例如 VR 產生器），每一頁都由以下固定積木組成，順序依內容需要排列：

| 積木 | 說明 |
|---|---|
| **外框 Layout** | 左側邊欄（logo、選單、目前頁面用粉紅色標示）＋ 底部 footer（官網按鈕、logo、社群圖示、版權文字） |
| **封面 Cover** | 每頁最上方固定：照片 ＋ 項目名稱 |
| **文字段落** | 標題 ＋ 內容，兩種文字大小 |
| **圖片網格** | 4 種排法：1 張滿版／2 張／3 張／1 大 2 小。間距固定 16px，同一排的圖統一比例並裁切填滿，永遠塞滿內容寬度。手機上變成一欄。點圖可放大 |
| **圖文並排** | 左圖右文（或反過來），手機上改成上下排 |
| **下載卡** | 所有下載資源都長這樣：檔案名稱、格式與大小（例如「SVG · 24 KB」）、圖示區分「直接下載」和「開啟雲端」。底色 `#2F3237`，左邊條粉紅 |
| **提示框** | 「注意」用品牌黃，前面有圖示 |
| **色票卡** | 色塊 ＋ 色碼，點一下複製 |

### 互動功能（之後加）
- Logo 頁：切換 logo 顏色和背景
- Colors 頁：點色票複製色碼
- Logo 頁：示範最小尺寸和留白

### 內容與外觀分開
- 積木（元件）負責長相，內容寫在 MDX 或資料檔
- 之後只需要改內容檔，不用碰元件

### 下載檔案放哪裡
- **放網站裡**（`public/`）：logo SVG／PNG、VR 標準字、icon 等小檔
- **放車隊 Google Drive**（網站只放連結）：簡報模板、AI／PSD 原始檔、照片庫、影片等大檔
- 字體不另外提供檔案，直接連到 Google Fonts

---

## 進度

- [x] **第 1 步**：定設計規則（見上方 Design Tokens）
- [x] **第 2 步**：建立 Next.js 專案並成功部署到 GitHub Pages
- [x] **第 3 步：做外框**
  - [x] 3-1 把設計規則寫進 `app/globals.css`（顏色、字體、字距、字級）
  - [x] 3-2 側邊欄（含手機版上方選單）
  - [x] 3-3 封面（含滾動視差；照片放 `assets/covers/`）
  - [x] 3-4 Footer（官網、Facebook、Instagram 網址還沒填，在 `data/footer.ts`）
- [ ] **第 4 步：一次做一個積木**，依序：文字段落 → 下載卡 → 提示框 → 圖片網格 → 圖文並排 → Do／Don't → 色票卡。每做一個就放進 Colors 頁測試
- [ ] **第 5 步**：完成 Colors 頁
- [ ] **第 6 步**：其他頁面，依序：Logo → Resources → Typography → 其他頁 → 最後才做 VR 產生器

目前主頁是佔位內容；其他 8 頁顯示「Coming soon」（`components/ComingSoon.tsx`），做正式頁面時直接替換該頁的 `page.tsx`。

## 待確認

- Footer 的官網、Facebook、Instagram 網址
- 車隊是否有 GitHub 組織，repo 何時轉移

## 已決定

- **網站語言**：先只做英文。側邊欄的地球圖示先放著當裝飾，之後再做語言切換
- **側邊欄 logo**：點 logo 回主頁
- **手機選單**：上方黑色選單列（左 logo、右粉紅漢堡圖示），點開後選單從左側滑出（和電腦版側邊欄同一側）
- **版面配置**（參考 Audi CI 網站）：封面是滿版區塊，封面標題放在封面左下；封面標題、文字、圖片、下載卡都包在 `components/Container.tsx` 裡，寬度一致、左邊對齊
- **圖片放置**：網站介面用的圖（logo、封面照、示範圖）放 `assets/`（分 `logo/`、`covers/`、`images/`），用 `import` 引入；給人下載的檔案放 `public/downloads/`
