// 主頁（暫時的佔位內容，之後會換成正式的 NVR Brand 頁）
import Container from "@/components/Container";
import Cover from "@/components/Cover";
import cover from "@/assets/covers/home.webp";

export default function Home() {
  return (
    <main>
      {/* 封面：照片 + 標題（標題放在封面左下） */}
      <Cover title="NVR Design Language" image={cover} />

      {/* 內容：文字、圖片、下載卡都放在 Container 裡，寬度一致 */}
      <Container className="py-section">
        <h2 className="text-heading">Our Story</h2>
        <p className="mt-heading-body text-body">
          In 2008, at a time when student-built race cars were still rare, a group of students from
          National Yang Ming Chiao Tung University came together over a shared passion for cars and
          building them. That was the beginning of NYCU Vulpes Racing Team.
        </p>
      </Container>
    </main>
  );
}
