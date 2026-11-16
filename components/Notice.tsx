// 積木：提示框（注意）
// 品牌黃的「!」圖示 ＋ 白色文字
// 用法：<Notice>To keep the brand recognizable, ...</Notice>

export default function Notice({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-3 text-body ${className}`}>
      {/* 圖示高度跟一行文字一樣，所以圖示會和第一行文字對齊 */}
      <span className="flex h-[2.2em] shrink-0 items-center text-yellow">
        <WarningIcon />
      </span>
      <p>{children}</p>
    </div>
  );
}

// 圓圈裡一個驚嘆號
function WarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Note" role="img">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 5.5v6" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="10" cy="14.25" r="1.1" fill="currentColor" />
    </svg>
  );
}
