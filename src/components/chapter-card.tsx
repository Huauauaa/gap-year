import Link from "next/link";
import type { Chapter } from "@/lib/chapters";

export function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <Link
      href={`/chapters/${chapter.slug}`}
      className="group block rounded-[2rem] border border-white/75 bg-white/60 p-6 shadow-sm shadow-copper/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-xl hover:shadow-copper/10"
    >
      <div className="mb-5 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.24em] text-copper/75">
        <span>第 {chapter.order.toString().padStart(2, "0")} 章</span>
        <span>{chapter.readingTime}</span>
      </div>
      <h3 className="font-serif text-2xl font-semibold tracking-wide text-ink transition group-hover:text-copper">
        {chapter.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-ink/62">{chapter.description}</p>
      <div className="mt-6 flex items-center justify-between text-sm font-medium text-copper">
        <span>{chapter.date}</span>
        <span className="transition group-hover:translate-x-1">开始阅读 →</span>
      </div>
    </Link>
  );
}
