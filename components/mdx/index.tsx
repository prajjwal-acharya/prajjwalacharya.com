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
