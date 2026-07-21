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

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Velite** — type-safe content layer that compiles MDX + frontmatter into typed data at build time
- **Tailwind CSS 4**
- **shadcn/ui**-style components (`class-variance-authority`, Radix Slot) in `components/ui`
- **Shiki** via `rehype-pretty-code` for syntax highlighting, `rehype-slug` for heading anchors/TOC
- Deployed to **Cloudflare Pages/Workers** via `@opennextjs/cloudflare`

## Project structure

```
app/                Next.js App Router pages
components/         Shared UI components and page sections
content/            MDX content collections
lib/                Utilities, metadata, RSS, helpers
public/             Static assets
velite.config.ts    Content schemas and MDX pipeline
```

## Development

Requires Node 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev            # start the dev server
```

Other useful scripts:

```bash
pnpm content:build   # rebuild the Velite content layer from content/
pnpm typecheck       # type-check (also rebuilds content first)
pnpm lint            # eslint
pnpm format          # prettier
pnpm build           # production build
```

## Deployment

The site builds to Cloudflare via OpenNext:

```bash
pnpm pages:build     # build for Cloudflare
pnpm pages:preview   # preview the Cloudflare build locally
pnpm pages:deploy    # deploy
```

## License

Licensed under the MIT License.
