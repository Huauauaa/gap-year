import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/chapters", label: "章节" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.42)_0,transparent_28%),radial-gradient(circle_at_80%_12%,rgba(168,95,50,0.16),transparent_24rem)]" />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-night text-lg font-semibold text-paper shadow-lg shadow-copper/20 transition group-hover:-rotate-3">
            旅
          </span>
          <span>
            <span className="block font-serif text-lg font-semibold tracking-[0.18em] text-ink">
              间年书屋
            </span>
            <span className="block text-xs uppercase tracking-[0.34em] text-copper/80">
              Gap Year Novel
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 rounded-full border border-white/70 bg-white/55 p-1 text-sm shadow-sm backdrop-blur">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 font-medium text-ink/70 transition hover:bg-white hover:text-copper"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mx-auto mt-20 max-w-6xl px-6 pb-10 text-sm text-ink/55 sm:px-8">
        <div className="rounded-3xl border border-white/70 bg-white/45 p-6 backdrop-blur">
          <p>章节以 Markdown 管理，可直接在 `src/content/chapters` 中继续创作。</p>
        </div>
      </footer>
    </div>
  );
}
