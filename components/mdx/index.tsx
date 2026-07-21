import type { ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import { A } from "@/components/mdx/anchor";
import { Callout } from "@/components/mdx/callout";
import { Code, Pre } from "@/components/mdx/code-block";
import { Figure } from "@/components/mdx/figure";
import { H1, H2, H3, H4 } from "@/components/mdx/heading";
import { Image } from "@/components/mdx/image";
import { Li, Ol, Ul } from "@/components/mdx/list";
import { Prose } from "@/components/mdx/prose";
import { Blockquote, Quote } from "@/components/mdx/quote";
import { ReferenceLink } from "@/components/mdx/reference-link";
import { Table, Td, Th, Thead } from "@/components/mdx/table";
import { Video } from "@/components/mdx/video";
import { Divider } from "@/components/ui/divider";

/**
 * The component registry every compiled MDX body renders through — no
 * page ever styles a heading, table, or code block on its own
 * (Phase 2: "no duplicated styling"). `wrapper` is MDX's special name for
 * the element wrapping the whole document (here, `Prose`).
 */
export const mdxComponents = {
  wrapper: Prose,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  ul: Ul,
  ol: Ol,
  li: Li,
  a: A,
  blockquote: Blockquote,
  hr: Divider,
  img: Image,
  table: Table,
  thead: Thead,
  th: Th,
  td: Td,
  pre: Pre,
  code: Code,
  Callout,
  Figure,
  Quote,
  ReferenceLink,
  Video,
};

type MDXContentProps = {
  code: string;
  /** Overrides the wrapping `Prose`'s max-width (e.g. `"max-w-none"` for a full-width card). Defaults to `Prose`'s own `max-w-prose`. */
  proseClassName?: string;
};

/**
 * Executes Velite's compiled `s.mdx()` output. `s.mdx()` compiles to a
 * function-body string (not raw HTML or a bundled component) specifically
 * so components can be injected at render time instead of build time —
 * verified against Velite's docs before wiring this in, not assumed.
 * `new Function` only ever runs during `next build`'s static generation
 * (this site has no dynamic runtime rendering), so it never executes in
 * the Cloudflare Workers request path.
 */
function getMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function MDXContent({ code, proseClassName }: MDXContentProps) {
  const Component = getMDXComponent(code);
  const components = proseClassName
    ? {
        ...mdxComponents,
        wrapper: ({ children }: { children: ReactNode }) => (
          <Prose className={proseClassName}>{children}</Prose>
        ),
      }
    : mdxComponents;
  return <Component components={components} />;
}
