import type { Metadata } from "next";
import { ChapterCard } from "@/components/chapter-card";
import { getChapters } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "章节目录",
  description: "阅读《间年》的全部 Markdown 章节。",
};

export default function ChaptersPage() {
  const chapters = getChapters();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 sm:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-copper/80">Archive</p>
        <h1 className="mt-4 font-serif text-5xl font-semibold tracking-[0.08em] text-ink">章节目录</h1>
        <p className="mt-5 text-lg leading-9 text-ink/65">
          所有章节都来自 Markdown 文件。新增章节时，只需要在内容目录添加 `.md` 文件并填写
          frontmatter，网站会自动生成目录与阅读页。
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.slug} chapter={chapter} />
        ))}
      </div>
    </div>
  );
}
