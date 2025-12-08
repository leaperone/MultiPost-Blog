# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm install          # Install dependencies (use pnpm to stay aligned with lockfile)
pnpm dev              # Run dev server with Turbo on port 3000
pnpm build            # Production build with type checks
pnpm start            # Serve production build
pnpm next lint        # Run ESLint
```

## Architecture Overview

This is a **Fumadocs-based multilingual blog** for MultiPost, built with Next.js 15 and React 19. It supports 11 languages via a dynamic `[lang]` route segment.

### Key Files

- `lib/source.ts` - MDX content loader using Fumadocs; wires content from `@/.source` (generated) with i18n config
- `lib/i18n.ts` - Defines supported languages: en (default), zh-Hans, zh-Hant, ja, ko, fr, es, pt, ms, id, ru
- `source.config.ts` - Fumadocs MDX configuration; defines frontmatter schema (title, description, keywords, date, author)
- `app/layout.config.tsx` - Shared layout options (nav, i18n) used by both home and blog layouts
- `mdx-components.tsx` - MDX component overrides; extends `fumadocs-ui/mdx` defaults

### Routing Structure

```
app/
├── [lang]/
│   ├── (home)/page.tsx       # Blog listing page with language navigation
│   ├── blog/
│   │   ├── [[...slug]]/page.tsx  # Individual blog post (catch-all)
│   │   └── layout.tsx            # DocsLayout with disabled sidebar
│   ├── api/search/route.ts   # Search endpoint via Fumadocs
│   └── layout.tsx            # RootProvider with i18n translations
├── sitemap.ts                # Auto-generated multilingual sitemap
└── layout.tsx                # Root HTML layout
```

### Content Structure

MDX files in `content/docs/` use locale suffixes:

- `index.mdx` - English (default)
- `index.zh-Hans.mdx` - Simplified Chinese
- `index.ja.mdx` - Japanese
- etc.

Frontmatter fields: `title`, `description`, `keywords` (comma-separated), `date`, `author`

## i18n Workflow

When creating new articles:

1. Write the English version first (`index.mdx`)
2. Only create translations when explicitly requested
3. Use full-width punctuation for Chinese content

## Coding Conventions

- TypeScript with 2-space indentation
- Components in `app/`: PascalCase
- Utilities in `lib/`: camelCase
- MDX filenames: kebab-case
- Run `pnpm next lint` before PRs

## Deployment

Pushes to `main` auto-deploy to Vercel via GitHub Actions (`.github/workflows/deploy.yml`).
