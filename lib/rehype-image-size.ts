import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { imageSize } from "image-size";
import { visit } from "unist-util-visit";

/** Shape-checked locally rather than importing `hast` for types alone — kept the dependency list to what's already resolvable. */
type HastImgNode = {
  type: "element";
  tagName?: string;
  properties?: Record<string, unknown>;
};

function isImgElement(node: unknown): node is HastImgNode {
  return (
    typeof node === "object" &&
    node !== null &&
    (node as { type?: unknown }).type === "element" &&
    (node as { tagName?: unknown }).tagName === "img"
  );
}

/**
 * Injects `width`/`height` on `<img>` elements produced by bare markdown
 * image syntax (`![alt](src)`) — MDX's own `<Image>`/`<Figure>` JSX
 * components already accept explicit width/height props, but markdown
 * syntax has no way to specify them, so without this those images ship
 * with no known dimensions and cause layout shift on load.
 *
 * Runs as a rehype plugin, which in Velite's `s.mdx()` pipeline means it
 * sees the image's `src` *after* `remarkCopyLinkedFiles` has already
 * rewritten it to the final public URL (`{output.base}{hash}.{ext}`) —
 * confirmed by reading Velite's source, not assumed — so this reads the
 * already-copied file from `{output.assets}/…` rather than the original
 * relative path, which no longer resolves at this point in the pipeline.
 * Verified against a real image end-to-end before relying on it.
 */
export function rehypeImageSize(options: { base: string; assets: string }) {
  return async (tree: unknown) => {
    const tasks: Promise<void>[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- `tree` is a hast Root at runtime; typed generically to avoid a types-only `hast` dependency
    visit(tree as any, isImgElement, (node) => {
      const props = node.properties ?? {};
      const src = props.src;
      if (typeof src !== "string" || !src.startsWith(options.base)) return;
      if (props.width != null && props.height != null) return;

      tasks.push(
        (async () => {
          const relativePath = src.slice(options.base.length);
          const filePath = join(process.cwd(), options.assets, relativePath);

          try {
            const buffer = await readFile(filePath);
            const { width, height } = imageSize(buffer);
            node.properties ??= {};
            node.properties.width = width;
            node.properties.height = height;
          } catch {
            // Unreadable or unsupported format — leave dimensions unset
            // rather than failing the build; `Image`'s max-w-full/h-auto
            // still prevents overflow, just without the CLS guarantee.
          }
        })(),
      );
    });

    await Promise.all(tasks);
  };
}
