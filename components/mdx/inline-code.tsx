import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function InlineCode({ className, ...props }: ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "border-outline-variant bg-surface-container-low text-on-surface rounded-md border px-1.5 py-0.5 font-mono text-sm",
        className,
      )}
      {...props}
    />
  );
}
