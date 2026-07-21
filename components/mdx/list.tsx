import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Not in Phase 2's named component list, but required for correctness:
 * Tailwind's preflight resets `list-style`/padding to none, so without
 * this, MDX lists would render with no bullets/numbers/indentation at
 * all — the opposite of "excellent formatting."
 */
export function Ul({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("list-disc space-y-2 pl-6", className)} {...props} />;
}

export function Ol({ className, ...props }: ComponentProps<"ol">) {
  return <ol className={cn("list-decimal space-y-2 pl-6", className)} {...props} />;
}

export function Li({ className, ...props }: ComponentProps<"li">) {
  return <li className={cn("font-body text-on-surface pl-1", className)} {...props} />;
}
