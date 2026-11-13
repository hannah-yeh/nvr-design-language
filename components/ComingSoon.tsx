// 「還沒做好的頁面」共用的佔位內容
// 用法：<ComingSoon title="Colors" />
// 等正式頁面做好，就把那一頁的 page.tsx 換成正式內容

import Container from "@/components/Container";
import Cover from "@/components/Cover";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <main>
      <Cover title={title} />
      <Container className="py-section">
        <p className="text-body">Coming soon</p>
      </Container>
    </main>
  );
}
