import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "@/components/mdx";

/**
 * Next.js's `@next/mdx` convention: every statically-imported `.mdx` file
 * (via `.generated/mdx/*-registry.ts`) renders through this ambient map
 * automatically, merged with whatever a caller passes as its own
 * `components` prop (e.g. a page overriding `wrapper` for a wider prose
 * column). Keeping the actual component definitions in
 * `components/mdx/index.tsx` rather than here — this file just wires them
 * up to the MDX runtime.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
