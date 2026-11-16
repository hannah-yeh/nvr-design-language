// Logo 頁
// 段落順序：NVR 圖標 → 圖標與標準字組合 → 淨空範圍 → 顏色應用 → 顏色錯誤示範 → Q&A
// 全部段落都完成了
import Container from "@/components/Container";
import Cover from "@/components/Cover";
import DownloadCard from "@/components/DownloadCard";
import MediaText from "@/components/MediaText";
import NvrMarkAnimated from "@/components/NvrMarkAnimated";
import Notice from "@/components/Notice";
import LogoSvg from "@/components/LogoSvg";
import Image from "next/image";
import cover from "@/assets/covers/logo.webp";
import combinations from "@/assets/images/logo-combinations.webp";
import clearSpace from "@/assets/images/logo-clear-space.webp";
import misuse from "@/assets/images/logo-misuse.webp";

// 顏色應用的 4 格示範（順序：左上、右上、左下、右下）
const colorExamples = [
  { bg: "bg-pink", logo: "text-white", label: "White logo on pink background" },
  { bg: "bg-black", logo: "text-pink", label: "Pink logo on black background" },
  { bg: "bg-black", logo: "text-white", label: "White logo on black background" },
  { bg: "bg-white", logo: "text-pink", label: "Pink logo on white background" },
];

// Q&A：要新增問題，在這裡多加一組 { q, a } 就好
const faqs = [
  {
    q: "There are so many logo packages. Which one should I download?",
    a: "Unless you're working on a design project, just download the NVR Logo Pink or White Package.",
  },
  {
    q: "What's the difference between PNG and SVG?",
    a: "Use PNG for presentations, Instagram, and documents. Use SVG for print shops or large-format output.",
  },
  {
    q: "I don't know which logo combination to use.",
    a: "No worries. Ask in the media team channel on the 交通管制大車隊 Discord, and someone will help you out.",
  },
];

export default function Page() {
  return (
    <main>
      <Cover title="Logo" image={cover} />

      {/* 段落之間：mt-section（電腦 128px、手機 80px） */}
      <Container className="py-section">
        {/* ---------- 段落 1：NVR 圖標 ---------- */}
        <section>
          <h2 className="text-heading">The NVR Mark</h2>

          {/* 左：N、V、R 輪流亮的動畫；右：說明 */}
          <MediaText
            className="mt-heading-body"
            media={<NvrMarkAnimated className="mx-auto w-full max-w-80" />}
          >
            <p>
              Built from the letters N, V, and R, the mark is made of sharp, angular lines. The V at
              its center narrows to a downward point, expressing speed and tension. The mark can be
              used on its own, and it is the core of every logo combination.
            </p>
          </MediaText>

          <DownloadCard
            className="mt-text-image"
            title="NVR Logo"
            file="/downloads/logo/nvr-logo_logo.svg"
          />
        </section>

        {/* ---------- 段落 2：圖標與標準字組合 ---------- */}
        <section className="mt-section">
          <h2 className="text-heading">Logo Combinations</h2>
          <div className="mt-heading-body text-body">
            <p>Choose a combination based on the shape of the space:</p>
            <ul className="pl-4">
              <li>・ Stacked (text below): for spaces close to square</li>
              <li>・ Horizontal (text on the right): for wide spaces, such as presentations</li>
              <li>・ Inline (single line): for long, narrow spaces, such as banners</li>
            </ul>
            <p>
              If you&apos;re not sure, go with the horizontal Chinese and English combination (file:
              &ldquo;nvr-logo_nvr-horizontal-zh-en&rdquo;).
            </p>
          </div>

          {/* 11 種組合一覽（透明背景） */}
          <Image
            src={combinations}
            alt="All 11 NVR logo combinations: stacked, horizontal, and inline versions in Chinese, English, and both"
            className="mt-text-image h-auto w-full"
          />

          <Notice className="mt-heading-body">
            To keep the brand recognizable, do not rearrange the combinations or change their colors.
          </Notice>

          <DownloadCard
            className="mt-text-image"
            title="NVR Logo Combination Package"
            file="/downloads/logo/nvr-logo_combination-package.zip"
          />
        </section>

        {/* ---------- 段落 3：淨空範圍 ---------- */}
        <section className="mt-section">
          <h2 className="text-heading">Clear Space</h2>
          <p className="mt-heading-body text-body">
            The same rule applies to every combination: half the height of the mark equals one unit,
            and at least one unit of clear space must be kept around the logo.
          </p>

          {/* 左：標出淨空範圍的示意；右：實際使用的樣子（透明背景） */}
          <Image
            src={clearSpace}
            alt="Clear space diagram: half the mark's height as one unit of space on every side of the logo, shown next to the logo in use"
            className="mt-text-image h-auto w-full"
          />
        </section>

        {/* ---------- 段落 4：顏色應用 ---------- */}
        <section className="mt-section">
          <h2 className="text-heading">Logo Colors</h2>
          <p className="mt-heading-body text-body">
            The NVR logo only comes in pink or white. On screen, the standard pink is HEX #D02E8B
            (RGB 208, 46, 139). For print, use CMYK C15 M90 Y0 K0, or PANTONE 225 C for spot color
            printing. Choose the logo color based on the background: on black or dark backgrounds,
            use pink or white; on pink backgrounds, use white; on white or light backgrounds, use
            pink.
          </p>

          {/* 4 格示範：背景色 ＋ logo 顏色（電腦 2×2，手機 1 欄） */}
          <div className="mt-text-image grid gap-gap sm:grid-cols-2">
            {colorExamples.map(({ bg, logo, label }) => (
              <div key={label} className={`flex aspect-[2.35] items-center justify-center ${bg}`}>
                <LogoSvg
                  file="nvr-logo_nvr-horizontal-zh-en.svg"
                  label={label}
                  className={`w-3/5 ${logo}`}
                />
              </div>
            ))}
          </div>

          <DownloadCard
            className="mt-text-image"
            title="NVR Logo White Package"
            file="/downloads/logo/nvr-logo_white-package.zip"
          />
          <DownloadCard
            className="mt-gap"
            title="NVR Logo Pink Package"
            file="/downloads/logo/nvr-logo_pink-package.zip"
          />
        </section>

        {/* ---------- 段落 5：顏色錯誤示範 ---------- */}
        <section className="mt-section">
          <h2 className="text-heading">Color Misuse</h2>
          <p className="mt-heading-body text-body">
            To keep the mark and logotype visible and recognizable, always choose the logo color that
            suits the background it sits on.
          </p>
          <Image
            src={misuse}
            alt="12 examples of incorrect logo colors, such as black, gray, blue, or yellow logos, low-contrast backgrounds, glows, outlines, shadows, and photo fills"
            className="mt-text-image h-auto w-full"
          />
        </section>

        {/* ---------- 段落 6：Q&A ---------- */}
        <section className="mt-section">
          <h2 className="text-heading">Q&amp;A</h2>
          <dl className="mt-heading-body text-body">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <dt>Q: {q}</dt>
                <dd>A: {a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>
    </main>
  );
}
