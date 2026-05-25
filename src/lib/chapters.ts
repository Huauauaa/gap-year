import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const chaptersDirectory = path.join(process.cwd(), "src/content/chapters");

export type Chapter = {
  slug: string;
  title: string;
  description: string;
  date: string;
  order: number;
  readingTime: string;
  excerpt: string;
  content: string;
};

type FrontMatter = {
  title?: unknown;
  description?: unknown;
  date?: unknown;
  order?: unknown;
};

function asString(value: unknown, fallback: string) {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return fallback;
}

function asOrder(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return Number.MAX_SAFE_INTEGER;
}

function stripMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_`\-[\]]/g, "")
    .replace(/\((.*?)\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadingTime(content: string) {
  const compactLength = content.replace(/\s/g, "").length;
  const minutes = Math.max(1, Math.ceil(compactLength / 500));
  return `${minutes} 分钟阅读`;
}

function parseChapter(fileName: string): Chapter {
  const fullPath = path.join(chaptersDirectory, fileName);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content, excerpt } = matter(source, {
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });
  const frontMatter = data as FrontMatter;
  const slug = fileName.replace(/\.md$/, "");
  const title = asString(frontMatter.title, slug);
  const fallbackExcerpt = stripMarkdown(excerpt ?? content.split(/
{2,}/)[0] ?? "");

  return {
    slug,
    title,
    description: asString(frontMatter.description, fallbackExcerpt),
    date: asString(frontMatter.date, "未定稿"),
    order: asOrder(frontMatter.order),
    readingTime: estimateReadingTime(content),
    excerpt: fallbackExcerpt,
    content,
  };
}

export function getChapters() {
  return fs
    .readdirSync(chaptersDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(parseChapter)
    .sort((left, right) => left.order - right.order);
}

export function getChapterBySlug(slug: string) {
  return getChapters().find((chapter) => chapter.slug === slug);
}

export function getAdjacentChapters(slug: string) {
  const chapters = getChapters();
  const index = chapters.findIndex((chapter) => chapter.slug === slug);

  return {
    previous: index > 0 ? chapters[index - 1] : undefined,
    next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : undefined,
  };
}
