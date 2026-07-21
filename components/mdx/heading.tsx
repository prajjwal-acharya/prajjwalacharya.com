import { Link as LinkIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Level = 2 | 3 | 4;

type AnchorHeadingProps = ComponentProps<"h2"> & { level: Level };

const LEVEL_STYLES: Record<Level, string> = {
  2: "font-display text-3xl font-medium",
  // No distinct H4 typography utility — H4 is rare in this content style;
  // it reuses H3's visual weight while staying a real <h4> for hierarchy.
  3: "font-display text-2xl font-medium",
  4: "font-display text-2xl font-medium",
};

function AnchorHeading({ level, id, className, children, ...props }: AnchorHeadingProps) {
  const Tag = `h${level}` as "h2" | "h3" | "h4";

  return (
    <Tag
      id={id}
      className={cn(
        LEVEL_STYLES[level],
        "group text-on-surface flex scroll-mt-24 items-center gap-2",
        className,
      )}
      {...props}
    >
      {children}
      {id ? (
        <a
          href={`#${id}`}
          className="text-on-surface-variant hover:text-primary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          aria-label="Link to this section"
        >
          <LinkIcon aria-hidden="true" className="size-4" />
        </a>
      ) : null}
    </Tag>
  );
}

/**
 * MDX `h1` is remapped to render as `h2` (visual + DOM tag) — the page's
 * own `<h1>` always comes from `EntryHeader`, so an author accidentally
 * writing `# Heading` in the body must not create a second one
 * (ARCHITECTURE.md §13: exactly one `<h1>` per page).
 */
export function H1(props: ComponentProps<"h1">) {
  return <AnchorHeading {...props} level={2} />;
}
export function H2(props: ComponentProps<"h2">) {
  return <AnchorHeading {...props} level={2} />;
}
export function H3(props: ComponentProps<"h3">) {
  return <AnchorHeading {...props} level={3} />;
}
export function H4(props: ComponentProps<"h4">) {
  return <AnchorHeading {...props} level={4} />;
}
