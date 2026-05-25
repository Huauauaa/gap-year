# 间年书屋

一个使用 Next.js、Tailwind CSS 和 pnpm 构建的小说网站。章节内容以 Markdown 文件维护，并通过 GitHub Actions 静态导出到 GitHub Pages。

## 技术栈

- Next.js App Router
- Tailwind CSS
- pnpm
- Markdown 章节内容
- GitHub Pages 静态部署

## 本地开发

```bash
pnpm install
pnpm dev
```

访问 <http://localhost:3000> 查看网站。

## 新增章节

在 `src/content/chapters` 中新增 `.md` 文件，并填写 frontmatter：

```md
---
title: "第三章：新的标题"
description: "章节摘要"
date: "2026-05-25"
order: 4
---

# 第三章：新的标题

正文内容……
```

`order` 用于控制章节排序，文件名会成为阅读页路由。

## 构建

```bash
pnpm build
```

项目配置为 `output: "export"`，构建产物会输出到 `out/`。

## GitHub Pages

`.github/workflows/pages.yml` 会在 `main` 分支推送时执行：

1. 安装 pnpm 和 Node.js 22
2. 使用 `pnpm install --frozen-lockfile` 安装依赖
3. 执行 `pnpm build` 静态导出
4. 上传 `out/` 并部署到 GitHub Pages

部署时会自动设置仓库名作为 Next.js `basePath`，适配项目页地址。
