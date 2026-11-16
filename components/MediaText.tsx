// 積木：圖文並排
// 電腦版左右兩欄（各一半），手機版上下排（圖在上、文在下）
//
// 用法：
//   <MediaText media={<Image ... />}>說明文字</MediaText>            ← 左圖右文
//   <MediaText media={<Image ... />} reverse>說明文字</MediaText>    ← 左文右圖

export default function MediaText({
  media,
  children,
  reverse = false,
  className = "",
}: {
  media: React.ReactNode;
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    // 手機上下排：圖和文字距離 64px（gap-text-image）；電腦左右排：兩欄距離 = 段落間距（lg:gap-section）
    <div className={`grid items-center gap-text-image lg:grid-cols-2 lg:gap-section ${className}`}>
      <div className={reverse ? "lg:order-2" : ""}>{media}</div>
      <div className="text-body">{children}</div>
    </div>
  );
}
