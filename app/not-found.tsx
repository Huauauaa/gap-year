import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-24 text-center sm:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-copper/80">404</p>
      <h1 className="mt-4 font-serif text-5xl font-semibold tracking-[0.08em] text-ink">章节走失了</h1>
      <p className="mt-5 text-lg leading-8 text-ink/62">也许它还在路上。回到目录，继续阅读已经发布的篇章。</p>
      <Link
        href="/chapters"
        className="mt-8 inline-flex rounded-full bg-night px-7 py-4 text-sm font-semibold tracking-[0.18em] text-paper transition hover:bg-copper"
      >
        返回目录
      </Link>
    </div>
  );
}
