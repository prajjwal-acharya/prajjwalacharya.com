# prajjwalacharya.com

> This repository contains the source code for [prajjwalacharya.com](https://prajjwalacharya.com).

My personal website and engineering notebook documenting systems, software architecture, projects, and the way I build software.

It's not a typical "hero + project cards" portfolio. The site is organized around a few durable pages — **Systems**, **Blueprints**, **Stack**, **Philosophy**, **Current Build**. Structure is meant to stay stable over time; only the content underneath it changes.

## Pages

| Route            | What it is                                                                      |
| ---------------- | ------------------------------------------------------------------------------- |
| `/`              | Home — an overview built from real content, not a static hero section           |
| `/systems`       | Things I've built or am building, each with a status (active/research/archived) |
| `/blueprints`    | Longer-form writeups on how I approach problems (draft/published/revised)       |
| `/stack`         | The tools and technologies I actually use                                       |
| `/philosophy`    | A singleton reference page on how I think about building software               |
| `/current-build` | What I'm working on right now                                                   |

Content lives as MDX files under `content/`, validated against schemas in `velite.config.ts`. Systems and Blueprints use immutable, sequential IDs (`SYS-###`, `BLD-###`) — see that config for the numbering policy.

## Architecture

Every MDX file is compiled entirely at build time — Velite owns metadata, `@next/mdx` owns rendering, and nothing touches an MDX document at request time:

```
MDX Content
     │
     ├── Velite
     │      ├── Metadata
     │      ├── TOC
     │      ├── Reading Time
     │      └── Content Index
     │
     └── Next.js MDX
            └── Static React Components
                     │
                     ▼
                App Router
                     │
                     ▼
                 OpenNext
                     │
                     ▼
             Cloudflare Workers
```

Velite reads each MDX file's frontmatter into typed, validated metadata (title, status, dates, TOC, reading time, cross-references) and indexes every collection. `@next/mdx` separately compiles each file's body into a plain React component at build time, using the same remark/rehype pipeline (heading anchors, syntax highlighting) so the two never drift apart. Route pages read metadata from Velite and render the matching compiled component — both are static build artifacts, and MDX is compiled entirely at build time to ensure compatibility with Cloudflare Workers, with no runtime code generation.

## Stack

**Content**

- **Next.js 15** (App Router) + **React 19**
- **MDX** via **@next/mdx** — compiles each `content/**/*.mdx` file into a static React component at build time
- **Velite** — type-safe metadata layer: frontmatter validation, TOC, reading time, content index
- **Shiki** via `rehype-pretty-code` for syntax highlighting, `rehype-slug` for heading anchors/TOC
- **Tailwind CSS 4**
- **shadcn/ui**-style components (`class-variance-authority`, Radix Slot) in `components/ui`

**Deployment**

- **OpenNext** (`@opennextjs/cloudflare`) + **Cloudflare Workers**

## Project structure

```
app/                Next.js App Router pages
components/         Shared UI components and page sections
content/            MDX content collections
lib/                Utilities, metadata, RSS, helpers
public/             Static assets
scripts/            Build-time codegen (MDX component registry)
velite.config.ts    Content schemas and metadata pipeline
```

## Development

Requires Node 22+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev            # start the dev server
```

Other useful scripts:

```bash
pnpm content:build         # rebuild the Velite content layer from content/
pnpm generate:mdx-registry # regenerate the static MDX component registry
pnpm typecheck             # type-check (also rebuilds content + registry first)
pnpm lint                  # eslint
pnpm format                # prettier
pnpm build                 # production build
pnpm verify                # format:check + lint + typecheck + build — what CI runs
```

`pnpm build` (and `pnpm dev`) run the full content pipeline automatically:

```
MDX
  ↓
Velite
  ↓
Registry Generation
  ↓
Next Build
  ↓
OpenNext
```

### Pre-commit hooks

Husky + lint-staged run on every commit: staged files are formatted with Prettier (and linted with ESLint for JS/TS) before the commit completes. Hooks are installed automatically via the `prepare` script after `pnpm install`.

## Continuous Integration

Every push and pull request to `main` runs `pnpm verify` (format check, lint, typecheck, build) via GitHub Actions — see `.github/workflows/ci.yml`.

## Deployment

The site builds to Cloudflare via OpenNext:

```bash
pnpm pages:build     # build for Cloudflare
pnpm pages:preview   # preview the Cloudflare build locally
pnpm pages:deploy    # deploy
```

## License

Licensed under the MIT License.
