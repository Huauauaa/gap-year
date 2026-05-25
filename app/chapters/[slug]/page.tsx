import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAdjacentChapters, getChapterBySlug, getChapters } from "@/lib/chapters";

type ChapterPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getChapters().map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return {
      title: "章节不存在",
    };
  }

  return {
    title: chapter.title,
    description: chapter.description,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  const { previous, next } = getAdjacentChapters(chapter.slug);

  return (
    <article className="mx-auto max-w-4xl px-6 pt-10 sm:px-8">
      <Link href="/chapters" className="text-sm font-semibold text-copper transition hover:text-ink">
        ← 返回章节目录
      </Link>

      <header className="mt-8 rounded-[2.5rem] border border-white/75 bg-white/62 p-8 shadow-xl shadow-copper/10 backdrop-blur sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-copper/75">
          Chapter {chapter.order.toString().padStart(2, "0")}
        </p>
        <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-[0.08em] text-ink sm:text-6xl">
          {chapter.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-ink/64">{chapter.description}</p>
        <div className="mt-7 flex flex-wrap gap-3 text-sm text-ink/55">
          <span className="rounded-full bg-mist/80 px-4 py-2">{chapter.date}</span>
          <span className="rounded-full bg-mist/80 px-4 py-2">{chapter.readingTime}</span>
          <span className="rounded-full bg-mist/80 px-4 py-2">Markdown</span>
        </div>
      </header>

      <div className="mt-10 rounded-[2rem] border border-white/75 bg-white/76 px-6 py-8 shadow-sm backdrop-blur sm:px-10 sm:py-12">
        <div className="prose prose-lg max-w-none prose-headings:text-ink prose-p:text-ink/76 prose-strong:text-ink prose-a:text-copper prose-blockquote:border-copper prose-blockquote:text-ink/62">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{chapter.content}</ReactMarkdown>
        </div>
      </div>

      <nav className="mt-10 grid gap-4 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/chapters/${previous.slug}`}
            className="rounded-3xl border border-white/75 bg-white/55 p-5 text-sm text-ink/65 transition hover:bg-white"
          >
            <span className="block text-copper">上一篇</span>
            <strong className="mt-2 block font-serif text-xl text-ink">{previous.title}</strong>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/chapters/${next.slug}`}
            className="rounded-3xl border border-white/75 bg-white/55 p-5 text-right text-sm text-ink/65 transition hover:bg-white"
          >
            <span className="block text-copper">下一篇</span>
            <strong className="mt-2 block font-serif text-xl text-ink">{next.title}</strong>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
