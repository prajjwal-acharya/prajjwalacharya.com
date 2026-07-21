import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Vertical rhythm + readable line length for rendered MDX. No
 * `@tailwindcss/typography` plugin — every element it would style already
 * has its own override in the MDX component registry (Heading, Table,
 * Callout, list, …), so a generic prose plugin would just fight them.
 * Registered as MDX's special `wrapper` component (`components/mdx/index.tsx`)
 * so every document gets this automatically.
 */
export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "font-body text-on-surface flex max-w-prose flex-col gap-6 leading-relaxed",
        className,
      )}
    >
      {children}
    </div>
  );
}
