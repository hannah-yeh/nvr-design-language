// NVR 圖標動畫：N → V → R 輪流亮起，一直循環
// 形狀來自 public/downloads/logo/nvr-logo_logo.svg（三個字母本來就是分開的形狀）
// 動畫的速度和亮暗設定在 app/globals.css 的「NVR 圖標動畫」

export default function NvrMarkAnimated({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 349.92 116.64"
      className={`nvr-mark-animated fill-pink ${className}`}
      role="img"
      aria-label="NVR mark"
    >
      {/* N */}
      <polygon points="110.81 29.16 116.64 58.32 0 0 58.32 87.48 58.32 58.32 151.63 87.48 110.81 29.16" />
      {/* V */}
      <path d="M116.64,29.16l58.32,87.48,58.32-87.48-50.07,50.07c-4.56,4.56-11.94,4.56-16.5,0l-50.07-50.07Z" />
      {/* R */}
      <polygon points="349.92 0 239.11 29.16 198.29 87.48 291.6 29.16 262.44 69.98 314.93 87.48 291.6 58.32 349.92 0" />
    </svg>
  );
}
