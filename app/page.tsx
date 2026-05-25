import Link from "next/link";
import { ChapterCard } from "@/components/chapter-card";
import { getChapters } from "@/lib/chapters";

export default function HomePage() {
  const chapters = getChapters();
  const featuredChapter = chapters[0];

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10 sm:px-8 lg:pt-16">
      <section className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-copper/20 bg-white/55 px-4 py-2 text-sm font-medium text-copper shadow-sm backdrop-blur">
            <span className="size-2 rounded-full bg-copper" />
            Markdown 连载 · 静态部署 · 沉浸阅读
          </div>
          <h1 className="font-serif text-5xl font-semibold leading-tight tracking-[0.08em] text-ink sm:text-7xl">
            在风起之前，
            <span className="block text-copper">写下离开的理由。</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-9 text-ink/68">
            《间年》是一段关于停顿、远行与重新选择的故事。网站采用 Next.js App Router
            构建，章节以 Markdown 维护，适合持续发布、归档与静态托管。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={featuredChapter ? `/chapters/${featuredChapter.slug}` : "/chapters"}
              className="rounded-full bg-night px-7 py-4 text-center text-sm font-semibold tracking-[0.18em] text-paper shadow-xl shadow-night/15 transition hover:-translate-y-0.5 hover:bg-copper"
            >
              开始阅读
            </Link>
            <Link
              href="/chapters"
              className="rounded-full border border-copper/25 bg-white/55 px-7 py-4 text-center text-sm font-semibold tracking-[0.18em] text-copper backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
            >
              浏览章节
            </Link>
          </div>
        </div>

        <aside className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-copper/10 blur-3xl" />
          <div className="rounded-[2.5rem] border border-white/75 bg-white/62 p-7 shadow-2xl shadow-copper/10 backdrop-blur">
            <div className="rounded-[2rem] bg-night p-8 text-paper">
              <p className="text-sm uppercase tracking-[0.35em] text-paper/55">Current Serial</p>
              <h2 className="mt-12 font-serif text-4xl font-semibold leading-tight tracking-[0.08em]">
                间年
              </h2>
              <p className="mt-5 text-sm leading-7 text-paper/68">
                “如果人生是一张已经写满批注的车票，那么间年就是背面那片空白。”
              </p>
              <div className="mt-16 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/10 p-4">
                  <span className="block text-2xl font-semibold">{chapters.length}</span>
                  <span className="text-xs text-paper/50">章节</span>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <span className="block text-2xl font-semibold">MD</span>
                  <span className="text-xs text-paper/50">格式</span>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <span className="block text-2xl font-semibold">SSG</span>
                  <span className="text-xs text-paper/50">导出</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-copper/80">Chapters</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-wide text-ink">最新章节</h2>
          </div>
          <Link href="/chapters" className="hidden text-sm font-semibold text-copper hover:text-ink sm:inline">
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {chapters.slice(0, 3).map((chapter) => (
            <ChapterCard key={chapter.slug} chapter={chapter} />
          ))}
        </div>
      </section>
    </div>
  );
}
