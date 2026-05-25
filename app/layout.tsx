import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "间年书屋 | Gap Year Novel",
    template: "%s | 间年书屋",
  },
  description: "一个使用 Next.js、Tailwind CSS 和 Markdown 构建的沉浸式小说网站。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
