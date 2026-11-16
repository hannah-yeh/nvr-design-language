// 「還沒做好的頁面」共用的佔位內容
// 用法：
//   <ComingSoon title="Colors" />                 ← 封面還沒有照片，先用黑底
//   <ComingSoon title="Logo" image={cover} />     ← 有封面照片的話，一起傳進來
// 等正式頁面做好，就把那一頁的 page.tsx 換成正式內容

import type { StaticImageData } from "next/image";
import Container from "@/components/Container";
import Cover from "@/components/Cover";

export default function ComingSoon({ title, image }: { title: string; image?: StaticImageData }) {
  return (
    <main>
      <Cover title={title} image={image} />
      <Container className="py-section">
        <p className="text-body">Coming soon</p>
      </Container>
    </main>
  );
}
