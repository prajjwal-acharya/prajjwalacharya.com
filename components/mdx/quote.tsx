import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Markdown `>` blockquote override. */
export function Blockquote({ className, ...props }: ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "font-body border-primary text-on-surface-variant border-l-4 pl-4 italic",
        className,
      )}
      {...props}
    />
  );
}

type QuoteProps = {
  children: ReactNode;
  cite?: string;
  className?: string;
};

/** Explicit attributed pull-quote (`<Quote cite="…">`) — larger and standalone, distinct from an inline `Blockquote`. */
export function Quote({ children, cite, className }: QuoteProps) {
  return (
    <figure className={cn("border-primary border-l-4 pl-4", className)}>
      <blockquote className="font-display text-on-surface text-2xl italic">{children}</blockquote>
      {cite ? (
        <figcaption className="font-body text-on-surface-variant mt-2 text-xs">— {cite}</figcaption>
      ) : null}
    </figure>
  );
}
