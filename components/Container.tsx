// 內容寬度容器
// 封面標題、文字、圖片、下載卡都包在這裡面，左右邊緣就會自動對齊
// - 內容寬度不設上限，跟著螢幕變寬
// - 左右留白固定（px-gutter）：電腦 72px、手機 20px，不管螢幕多大都一樣

export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-gutter ${className}`}>{children}</div>
  );
}
