// 主頁 NVR Brand：車隊介紹 ＋ 這個網站的用途 ＋ 快速入口
import Container from "@/components/Container";
import Cover from "@/components/Cover";
import Image from "next/image";
import cover from "@/assets/covers/home.webp";
import home01 from "@/assets/images/home01.webp";
import replace1 from "@/assets/images/replace1.webp"; // 暫時的佔位圖，之後換成正式圖片

export default function Home() {
  return (
    <main>
      {/* 封面：照片 + 標題（標題放在封面左下） */}
      <Cover title="NVR Design Language" image={cover} />

      {/* 內容：文字、圖片、下載卡都放在 Container 裡，寬度一致 */}
      {/* 段落之間：mt-section（電腦 128px、手機 80px） */}
      <Container className="py-section">
        {/* ---------- 段落 1：車隊介紹 ---------- */}
        <section>
          <h2 className="text-heading">We Are NYCU Vulpes Racing</h2>
          <div className="mt-heading-body text-body">
            <p>
              In 2008, at a time when student-built race cars were still rare, a group of students
              from National Yang Ming Chiao Tung University came together over a shared passion for
              cars and building them, and NYCU Vulpes Racing Team was born.
            </p>
            <p>
              We come from many different departments, including mechanical engineering, electrical
              engineering, computer science, and management. Guided by our core values of theory,
              design, and hands-on building, we start from scratch every year to build a brand-new
              formula race car.
            </p>
          </div>

          {/* 團隊合照：滿版（跟文字同寬），高度依照片比例自動算 */}
          {/* mt-text-image：和上面內文距離 64px */}
          <Image
            src={home01}
            alt="Close-up of the NYCU Vulpes Racing car's cockpit and nose cone with sponsor logos"
            className="mt-text-image h-auto w-full"
          />
        </section>

        {/* ---------- 段落 2：這個網站的用途 ---------- */}
        <section className="mt-section">
          <h2 className="text-heading">About Our Identity</h2>
          <p className="mt-heading-body text-body">
            Every year brings a new car, new members, and new sponsors, and our posters, social media
            posts, team uniforms, and car liveries keep changing too. NVR Design Language brings all
            of the team&apos;s visual guidelines together in one place, from the logo, colors, and
            typography to social media templates and merchandise. Whether or not you know design,
            just follow this guide and everything you make will look unmistakably NVR.
          </p>
          {/* 暫時的佔位圖：和上面內文距離 64px */}
          <Image
            src={replace1}
            alt="Placeholder image"
            className="mt-text-image h-auto w-full"
          />
        </section>

        {/* ---------- 段落 3：快速入口 ---------- */}
        {/* 清單項目：有填 href 的會變成連結（另開新分頁）；還沒填的先只顯示文字 */}
        <section className="mt-section">
          <h2 className="text-heading">Everything You Need Is Here</h2>
          <p className="mt-heading-body text-body">
            Not sure where to start? Just pick what you want to do:
          </p>
          {/* 每一項：滑鼠移上去變粉紅底（w-fit：粉紅底只包住文字，不會拉滿整行） */}
          <ul className="mt-heading-body text-body">
            {[
              { label: "I need a presentation template" },
              { label: "I need a document template" },
              { label: "I need the logo files" },
              { label: "I need a little energy", href: "https://youtu.be/ZZ5LpwO-An4" },
            ].map(({ label, href }) => (
              <li key={label} className="w-fit transition-colors hover:bg-pink">
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    ↳ {label}
                  </a>
                ) : (
                  <>↳ {label}</>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-heading-body text-body">
            Got questions? Don&apos;t ask me. I don&apos;t know either.
          </p>
        </section>
      </Container>
    </main>
  );
}
