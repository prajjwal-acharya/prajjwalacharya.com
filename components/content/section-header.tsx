import type { ElementType } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Which heading tag to render — callers own page-level heading hierarchy, this never hardcodes it (ARCHITECTURE.md §13). */
  as?: HeadingLevel;
  className?: string;
};

const HEADING_STYLES: Record<HeadingLevel, string> = {
  h1: "text-4xl md:text-6xl font-medium",
  h2: "text-3xl md:text-4xl font-medium",
  h3: "text-2xl font-medium",
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  as = "h2",
  className,
}: SectionHeaderProps) {
  const Heading = as as ElementType;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {eyebrow ? (
        <p className="text-tertiary text-[10px] font-bold tracking-widest uppercase">{eyebrow}</p>
      ) : null}
      <Heading className={cn("font-display text-on-surface leading-tight", HEADING_STYLES[as])}>
        {title}
      </Heading>
      {description ? (
        <p className="font-body text-on-surface-variant max-w-prose leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
