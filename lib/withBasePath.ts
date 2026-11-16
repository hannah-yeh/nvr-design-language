// 幫 public/ 裡的檔案路徑加上網站前綴（basePath）
// 為什麼需要：網站放在 /nvr-design-language/ 底下，
// 直接寫 "/downloads/logo.svg" 上線後會找不到檔案（404）
// 用法：withBasePath("/downloads/logo/nvr-logo_logo.svg")
//   → "/nvr-design-language/downloads/logo/nvr-logo_logo.svg"
// 前綴的值設定在 next.config.ts

export function withBasePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
