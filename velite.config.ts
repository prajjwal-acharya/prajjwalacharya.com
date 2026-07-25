import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineConfig, s } from "velite";
import { readingTimeFromRaw } from "./lib/reading-time";
import { rehypeImageSize } from "./lib/rehype-image-size";

/** Shared with `mdxOptions.rehypePlugins` below (`rehypeImageSize` needs to know where copied assets land) — one definition, not two. */
const output = {
  data: ".velite",
  assets: "public/static",
  base: "/static/",
  clean: true,
} as const;

/**
 * Status vocabularies, finalized Phase 1 (was Open Question #1). Mirrored
 * in `lib/status.ts` for the `StatusBadge` component — that file is the
 * one to also update if this vocabulary ever changes.
 *
 * Philosophy and Stack deliberately don't get a `status` field (Phase 2):
 * no meaningful vocabulary exists for a singleton reference page, and
 * inventing one just to fill a schema slot would be exactly the kind of
 * fabricated business logic this project avoids. `slug` is skipped there
 * too — a singleton has exactly one URL, nothing to disambiguate.
 */
const systemStatus = ["active", "research", "archived"] as const;
const blueprintStatus = ["draft", "published", "revised"] as const;

// Content numbering policy (ARCHITECTURE.md §9): IDs are immutable, never
// reused, and assigned as max(existing) + 1 per collection — enforced by
// authors, not computed here. The pattern below only guards the *shape*.
const systemId = s.string().regex(/^SYS-\d{3}$/, "System id must match SYS-###");
const blueprintId = s.string().regex(/^BLD-\d{3}$/, "Blueprint id must match BLD-###");

/**
 * Table of contents: H2–H3 only (Phase 2 spec — no H1, since the page
 * title already owns H1; no H4+, that's too granular for a TOC). Built on
 * the same heading text `rehype-slug` (below) IDs in the rendered body —
 * both use github-slugger under the hood, so the anchors line up.
 */
const tocField = () => s.toc({ minDepth: 2, maxDepth: 3 });

/**
 * Shared MDX pipeline: GFM (tables, strikethrough, autolinks) since plain
 * CommonMark has no table syntax at all — a bare `| a | b |` block would
 * otherwise render as a literal paragraph of pipe-delimited text instead
 * of an actual `<table>`. Also heading IDs for anchor links (must run
 * before/alongside `s.toc()`'s slugging so `#anchor` hrefs actually
 * resolve), and build-time syntax highlighting via Shiki through
 * rehype-pretty-code — verified output structure empirically
 * (figure/figcaption/pre/code with data-language, data-theme,
 * data-highlighted-line) before wiring it in, not assumed from docs.
 * `keepBackground: false` so the block's background comes from our own
 * `--color-surface` token, not the Shiki theme.
 */
const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypePrettyCode,
      {
        theme: { light: "vitesse-light", dark: "vitesse-dark" },
        keepBackground: false,
      },
    ],
    // Phase 4: width/height enforcement for bare markdown images (no
    // CLS). Placed after the plugins above — order doesn't matter here,
    // none of them touch `img` elements.
    [rehypeImageSize, { base: output.base, assets: output.assets }],
  ],
} satisfies Parameters<typeof s.mdx>[0];

export default defineConfig({
  root: "content",
  output,
  mdx: mdxOptions,
  collections: {
    systems: {
      name: "System",
      pattern: "systems/**/*.mdx",
      schema: s
        .object({
          id: systemId,
          title: s.string().min(1).max(99),
          status: s.enum(systemStatus),
          // "description" in ARCHITECTURE.md §9 / Phase 2 — kept as `summary`,
          // its Phase 0 name, rather than renamed for its own sake.
          summary: s.string().min(1).max(300),
          date: s.isodate(),
          heroImage: s.image().optional(),
          // Home's Featured System card (home.md's "04.") shows the tech
          // stack as chips — optional/defaulted so existing entries
          // written before this field don't need updating.
          techStack: s.array(s.string()).default([]),
          links: s
            .array(
              s.object({
                label: s.string(),
                url: s.string().url(),
              }),
            )
            .default([]),
          slug: s.slug("systems"),
          // Extension-less path relative to `content/` (e.g. `systems/extract-it`)
          // — the single source of truth `scripts/generate-mdx-registry.mjs`
          // reads to resolve each slug to its `.mdx` file, instead of
          // re-deriving that mapping itself.
          path: s.path(),
          toc: tocField(),
          raw: s.raw(),
          body: s.mdx(),
        })
        .strict()
        .transform(({ raw, ...rest }) => ({
          ...rest,
          readingTime: readingTimeFromRaw(raw),
        })),
    },
    blueprints: {
      name: "Blueprint",
      pattern: "blueprints/**/*.mdx",
      schema: s
        .object({
          id: blueprintId,
          title: s.string().min(1).max(99),
          description: s.string().min(1).max(300),
          revision: s.string().default("1.0"),
          status: s.enum(blueprintStatus),
          date: s.isodate(),
          heroImage: s.image().optional(),
          crossRefs: s.array(s.string()).default([]),
          slug: s.slug("blueprints"),
          // Same reasoning as `systems.path` above.
          path: s.path(),
          toc: tocField(),
          raw: s.raw(),
          body: s.mdx(),
        })
        .strict()
        .transform(({ raw, ...rest }) => ({
          ...rest,
          readingTime: readingTimeFromRaw(raw),
        })),
    },
    // Not marked `single: true` yet: Velite throws a build error for a
    // single-collection with zero matching files, and no content exists
    // until an entry is authored. `lib/content.ts` reads `[0]` to treat
    // this as a singleton in the meantime.
    currentBuild: {
      name: "CurrentBuild",
      pattern: "current-build/index.mdx",
      schema: s
        .object({
          title: s.string().default("Current Build"),
          description: s.string().max(300).optional(),
          heroImage: s.image().optional(),
          building: s.array(s.string()).default([]),
          learning: s.array(s.string()).default([]),
          reading: s.array(s.string()).default([]),
          thinkingAbout: s.array(s.string()).default([]),
          nextMilestone: s.string().optional(),
          updatedAt: s.isodate(),
          // Dashboard-specific fields below (app/current-build/page.tsx's
          // bento view) — additive to the plain building/learning/reading/
          // thinkingAbout lists above, which stay the source for the
          // homepage's CurrentFocus teaser. All optional/defaulted so a
          // Current Build entry with just the plain lists still renders.
          activeProject: s
            .object({
              name: s.string(),
              summary: s.string(),
              completion: s.number().min(0).max(100),
              branch: s.string(),
              lastCommit: s.string(),
              uptime: s.string(),
              releaseNote: s.string(),
              // Terra theme additions (web.md's "Currently Building" journal
              // card): a short code excerpt and a build-stage label. Both
              // optional so the pre-Terra activeProject shape still validates.
              codeSnippet: s.string().optional(),
              stage: s.string().optional(),
              // Link to the repo for whatever's in `activeProject` — optional
              // since it's routinely unset while a project is still private
              // or hasn't been pushed anywhere yet.
              repoUrl: s.string().url().optional(),
            })
            .optional(),
          challenges: s
            .array(
              s.object({
                priority: s.enum(["critical", "medium", "low"]),
                ticket: s.string(),
                title: s.string(),
                note: s.string().optional(),
              }),
            )
            .default([]),
          terminalLog: s
            .array(
              s.object({
                prompt: s.boolean().default(false),
                tone: s.enum(["default", "info", "warn"]).default("default"),
                text: s.string(),
              }),
            )
            .default([]),
          readingProgress: s
            .object({
              title: s.string(),
              author: s.string(),
              progressLabel: s.string(),
              percent: s.number().min(0).max(100),
            })
            .optional(),
          learningProgress: s
            .array(
              s.object({
                topic: s.string(),
                note: s.string(),
                percent: s.number().min(0).max(100),
              }),
            )
            .default([]),
          recentProgress: s
            .array(
              s.object({
                date: s.isodate(),
                title: s.string(),
                tags: s.array(s.string()).default([]),
              }),
            )
            .default([]),
          toc: tocField(),
          // Not `.optional()`: Zod's optional wrapper short-circuits to
          // `undefined` before `s.mdx()`'s own "fall back to the file's
          // body text" transform ever runs, so an optional MDX field
          // never actually reads content — confirmed by reading Velite's
          // source, not assumed. A file with no body text below its
          // frontmatter still compiles fine (to a component that renders
          // nothing); `readingTimeFromRaw` returns `undefined` for empty
          // content so the page doesn't claim a nonexistent reading time.
          raw: s.raw(),
          body: s.mdx(),
        })
        .strict()
        .transform(({ raw, ...rest }) => ({
          ...rest,
          readingTime: readingTimeFromRaw(raw),
        })),
    },
    // Same deferral as `currentBuild` above — see that comment.
    philosophy: {
      name: "Philosophy",
      pattern: "philosophy/index.mdx",
      schema: s
        .object({
          title: s.string().default("Philosophy"),
          description: s.string().max(300).optional(),
          date: s.isodate().optional(),
          heroImage: s.image().optional(),
          // Structured bento layout (app/philosophy/page.tsx), same
          // pattern as `stack`/`currentBuild`'s dashboard fields — this
          // page is placed content, not flowing prose, so it's frontmatter
          // fields rather than MDX body text.
          quote: s
            .object({
              text: s.string(),
              cite: s.string().optional(),
            })
            .optional(),
          // "Why I Build" — the large bento card. One entry per paragraph.
          whyIBuild: s.array(s.string()).default([]),
          // The three smaller bento cards (Negative Space / First
          // Principles / Systems Thinking) — order maps to their fixed
          // positions in the grid, styling is a page-level design choice
          // rather than content.
          pillars: s
            .array(
              s.object({
                title: s.string(),
                body: s.string(),
              }),
            )
            .default([]),
          // Closing reflection section.
          learningPrinciples: s.array(s.string()).default([]),
          currentlyResearching: s.string().optional(),
          mindChanges: s
            .array(
              s.object({
                from: s.string(),
                to: s.string(),
              }),
            )
            .default([]),
          // Auto-derived from the body text (Velite's own excerpt
          // mechanism) — the homepage Philosophy preview needs short
          // teaser text, and `description` is optional/may be blank, so
          // this is the honest fallback rather than requiring authors to
          // duplicate a summary by hand.
          excerpt: s.excerpt({ length: 200 }),
          toc: tocField(),
          raw: s.raw(),
          body: s.mdx(),
        })
        .strict()
        .transform(({ raw, ...rest }) => ({
          ...rest,
          readingTime: readingTimeFromRaw(raw),
        })),
    },
    // Same deferral as `currentBuild` above — see that comment.
    stack: {
      name: "Stack",
      pattern: "stack/index.mdx",
      schema: s
        .object({
          title: s.string().default("Stack"),
          description: s.string().max(300).optional(),
          date: s.isodate().optional(),
          heroImage: s.image().optional(),
          // Bento tool cards (app/stack/page.tsx). `size: "large"` gets the
          // 3-column what-it-is/why/irreplaceable treatment; everything
          // else renders as a compact card with the same three facts
          // folded into one paragraph. Only one `"large"` entry is
          // expected at a time — the layout gives it the wide bento slot.
          tools: s
            .array(
              s.object({
                name: s.string(),
                tagline: s.string().optional(),
                // Material Symbols Outlined ligature name — only rendered
                // for `"large"` cards.
                icon: s.string().optional(),
                size: s.enum(["large", "compact"]).default("compact"),
                whatItIs: s.string(),
                why: s.string(),
                irreplaceable: s.string(),
              }),
            )
            .default([]),
          // Short bullet list of workspace values, sitting alongside the
          // large tool card in the bento grid.
          principles: s.array(s.string()).default([]),
          // "Technology Inventory" tag-pill groups.
          categories: s
            .array(
              s.object({
                category: s.string(),
                items: s.array(s.string()),
              }),
            )
            .default([]),
          toc: tocField(),
          // Same reasoning as `currentBuild.body` above: not `.optional()`.
          raw: s.raw(),
          body: s.mdx(),
        })
        .strict()
        .transform(({ raw, ...rest }) => ({
          ...rest,
          readingTime: readingTimeFromRaw(raw),
        })),
    },
  },
});
