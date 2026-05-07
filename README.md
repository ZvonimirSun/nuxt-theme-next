# Nuxt Theme Next (WIP)

[![Publish](https://github.com/ZvonimirSun/nuxt-theme-next/actions/workflows/publish.yml/badge.svg)](https://github.com/ZvonimirSun/nuxt-theme-next/actions/workflows/publish.yml) [![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config) [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ZvonimirSun/nuxt-theme-next)

`nuxt-theme-next` 是一个基于 Nuxt 4、Nuxt Content 和 Nuxt UI 的博客主题层（layer）。

项目内置了文章列表、文章详情、搜索、分页与 404 处理，并通过 `.playground` 提供了开箱即用的本地预览环境。

## 特性

- 基于 Nuxt Layer，可通过 `extends` 复用主题
- 基于 Nuxt Content 的 Markdown 博客内容管理
- 首页列表 + `/page/:page/` 分页
- 文章搜索（`UContentSearch`）
- 文章永久链接支持（`permalink`），未配置时自动回退
- 静态站点构建（`nitro.preset: static`）

## 环境要求

- 包管理器：`pnpm@10.33.2`（见 `package.json`）
- Node.js：请使用与 Nuxt 4 兼容的版本（CI 当前使用 Node 24）

## 快速开始（本仓库）

```bash
pnpm install
pnpm dev
```

默认会启动 `.playground`，用于调试主题效果。

## 可用脚本

```bash
pnpm dev          # 运行 .playground 开发环境
pnpm dev:prepare  # 预生成 Nuxt 类型与构建产物
pnpm build        # 构建 .playground
pnpm generate     # 生成静态站点
pnpm preview      # 预览生产构建
pnpm lint         # ESLint 自动修复
pnpm typecheck    # 类型检查（.playground）
```

## 作为主题层使用

在你的 Nuxt 项目中安装此包后，可在 `nuxt.config.ts` 中通过 `extends` 引入：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@zvonimirsun/nuxt-theme-next'],
})
```

引入 `content.config.ts`：

```ts
// content.config.ts
import contentConfig from '@zvonimirsun/nuxt-theme-next/content.config'

export default contentConfig
```

然后在你的项目中提供内容目录（见下方内容规范）。

## 配置项

主题通过 `runtimeConfig.public` 读取站点配置（见 `nuxt.config.ts`）：

- `title`: 站点标题
- `subtitle`: 副标题
- `description`: 站点描述
- `language`: 语言（默认 `zh-CN`）
- `index.perPage`: 列表每页文章数（默认 `10`）

示例：

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      title: 'My Blog',
      subtitle: 'Notes and Ideas',
      description: 'Personal blog powered by Nuxt',
      language: 'zh-CN',
      index: {
        perPage: 10,
      },
    },
  },
})
```

## 内容组织规范

内容模型定义见 `content.config.ts`：

- `content` 集合：`posts/**/*.md`（博客文章）
- `pages` 集合：除 `posts/**` 外的其他页面

### 文章 Frontmatter（`posts/**/*.md`）

- `title`: `string`（必填）
- `date`: `date`（必填）
- `description`: `string`（可选）
- `updated`: `string`（可选）
- `tags`: `string[]`（可选）
- `permalink`: `string`（可选）

示例：

```md
---
title: 我的第一篇文章
date: 2026-05-07 10:00:00
updated: 2026-05-07 10:00:00
tags:
  - Nuxt
  - Blog
permalink: /my-first-post/
---

正文内容...
```

## 链接与路由说明

- 首页：`/`
- 分页：`/page/:page/`
- 文章页：根据 `permalink` 访问
- 普通页面：由 `pages` 集合按路径匹配

`transformers/path-handler.ts` 会为 `posts` 下未设置 `permalink` 的文章自动生成链接（基于文件路径）。

## 目录结构（核心）

```text
app/
  components/theme/   # 主题组件
  composables/        # 内容查询与页面逻辑
  pages/              # 路由入口
transformers/
  path-handler.ts     # permalink 处理
.playground/
  nuxt.config.ts      # 主题调试入口（extends: ['..']）
  content/posts/      # 示例文章
content.config.ts     # 内容模型定义
nuxt.config.ts        # 主题配置
```

## License

[MIT](./LICENSE)
