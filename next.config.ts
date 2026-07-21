import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Lets `next dev` resolve Cloudflare bindings (none defined yet) via the
// local Workers runtime instead of failing when they're eventually added.
initOpenNextCloudflareForDev();

/**
 * Builds the Velite content layer before webpack compiles any module that
 * imports from it (see `lib/content.ts`). Runs once per `next dev` / `next
 * build` invocation, awaited via `beforeCompile` so there's no race between
 * content generation and the first page that reads it.
 * https://velite.js.org/guide/with-nextjs
 */
class VeliteWebpackPlugin {
  static started = false;

  apply(compiler: {
    hooks: { beforeCompile: { tapPromise: (name: string, fn: () => Promise<void>) => void } };
    options: { mode?: string };
  }) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      const { build } = await import("velite");
      await build({ watch: dev, clean: !dev });
    });
  }
}

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

export default nextConfig;
