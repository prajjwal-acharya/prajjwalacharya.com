import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Plain `<img>`, not `next/image` — deliberate (ARCHITECTURE.md §12:
 * Cloudflare Pages/Workers doesn't support `next/image`'s default
 * loader). `max-w-full h-auto` is what actually guarantees images never
 * overflow their container, regardless of the source file's dimensions.
 */
export function Image({ className, alt, loading = "lazy", ...props }: ComponentProps<"img">) {
  return (
    <img
      alt={alt}
      loading={loading}
      className={cn("border-outline-variant/20 h-auto max-w-full rounded-xl border", className)}
      {...props}
    />
  );
}
