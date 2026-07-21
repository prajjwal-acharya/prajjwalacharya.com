import { watch } from "node:fs";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { rehypeImageSize } from "./lib/rehype-image-size";

// Lets `next dev` resolve Cloudflare bindings (none defined yet) via the
// local Workers runtime instead of failing when they're eventually added.
initOpenNextCloudflareForDev();

/** Mirrors `output` in `velite.config.ts` — `rehypeImageSize` needs to know where copied assets land. Kept in sync by hand since the two configs can't share a module (Velite's config isn't webpack-bundled). */
const veliteOutput = {
  assets: "public/static",
  base: "/static/",
} as const;

/**
 * Builds the Velite content layer before webpack compiles any module that
 * imports from it (see `lib/content.ts`), then regenerates the MDX
 * registries (`.generated/mdx/*-registry.ts`, via
 * `scripts/generate-mdx-registry.mjs`) that statically import every
 * `content/**\/*.mdx` file. Both run once per `next dev` / `next build`
 * invocation, awaited via `beforeCompile` so nothing compiles against
 * stale content or a missing registry.
 *
 * In dev, Velite's own `watch: true` keeps `.velite/{systems,blueprints}.json`
 * current as `content/` changes (including a brand-new `.mdx` file), so
 * this also watches those two JSON files and reruns the registry
 * generator whenever they change — the registry `.ts` files webpack
 * bundles change on disk, and webpack's own watcher picks that up like
 * any other edited source file. Without this, adding a new System or
 * Blueprint would need a `next dev` restart to show up.
 *
 * The registry generator is plain `.mjs`, not `.ts`: this file itself is
 * transpiled by Next's own config loader, but a runtime `import()` inside
 * it is not, so anything it dynamically imports has to already be
 * runnable by Node directly.
 * https://velite.js.org/guide/with-nextjs
 */
class ContentWebpackPlugin {
  static started = false;

  apply(compiler: {
    hooks: { beforeCompile: { tapPromise: (name: string, fn: () => Promise<void>) => void } };
    options: { mode?: string };
  }) {
    compiler.hooks.beforeCompile.tapPromise("ContentWebpackPlugin", async () => {
      if (ContentWebpackPlugin.started) return;
      ContentWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      const { build } = await import("velite");
      await build({ watch: dev, clean: !dev });
      const { generateMdxRegistries } = await import("./scripts/generate-mdx-registry.mjs");
      await generateMdxRegistries();

      if (dev) {
        let pending: Promise<void> | null = null;
        const regenerate = () => {
          pending ??= generateMdxRegistries()
            .catch((error: unknown) => console.error(error))
            .finally(() => {
              pending = null;
            });
        };
        watch(".velite/systems.json", regenerate);
        watch(".velite/blueprints.json", regenerate);
      }
    });
  }
}

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(new ContentWebpackPlugin());
    return config;
  },
};

/**
 * Same MDX pipeline as `velite.config.ts`'s `mdxOptions` (heading IDs +
 * Shiki highlighting + image size enforcement), so a document renders
 * identically whether Velite compiles it for `toc`/`readingTime` or
 * `@next/mdx` compiles it here for the actual component. `remarkFrontmatter`
 * is the one addition: unlike Velite (which parses frontmatter into typed
 * fields separately), a directly-imported `.mdx` file still has its raw
 * `---`-delimited block in the document, so it has to be stripped before
 * the body renders or it'd show up as literal text.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        { theme: { light: "vitesse-light", dark: "vitesse-dark" }, keepBackground: false },
      ],
      [rehypeImageSize, veliteOutput],
    ],
  },
});

export default withMDX(nextConfig);
