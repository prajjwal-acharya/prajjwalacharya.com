import NextLink from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type LinkProps = ComponentProps<typeof NextLink>;

/**
 * The content-context link treatment (underlined, accent on hover). Nav
 * items and other non-prose links style themselves directly rather than
 * fighting this default.
 */
export function Link({ className, ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(
        "text-primary font-bold underline decoration-transparent underline-offset-2 transition-colors hover:decoration-current",
        className,
      )}
      {...props}
    />
  );
}
