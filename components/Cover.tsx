// 封面：每頁最上方的照片 ＋ 項目名稱
// 用法：
//   <Cover title="Colors" />                 ← 還沒有照片，先用黑底
//   <Cover title="Colors" image={photo} />   ← photo 用 import 引入，例如：
//                                              import photo from "@/assets/covers/colors.webp";

import Image, { type StaticImageData } from "next/image";
import Container from "@/components/Container";

export default function Cover({ title, image }: { title: string; image?: StaticImageData }) {
  return (
    // 封面高度：電腦 560px、手機 280px（h-cover）
    <section className="cover-parallax-scope relative flex h-cover items-end overflow-hidden bg-black">
      {image && (
        <>
          {/* 照片：填滿整個封面，多出來的部分裁掉；cover-parallax 是滾動視差（設定在 globals.css） */}
          <div className="cover-parallax absolute inset-0">
            <Image src={image} alt="" fill loading="eager" fetchPriority="high" className="object-cover" />
          </div>
          {/* 半透明黑色遮罩，讓白色標題看得清楚 */}
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}

      {/* 標題：放在封面左下，左邊跟下方內容對齊 */}
      <Container className="relative w-full pb-8 lg:pb-12">
        <h1 className="text-cover">{title}</h1>
      </Container>
    </section>
  );
}
