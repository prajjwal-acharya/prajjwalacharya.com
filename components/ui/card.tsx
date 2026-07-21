import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Soft rounded panel with a gentle shadow — no hard border, matching web.md's glass-card bento tiles. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-surface-container-low rounded-xl p-6 shadow-[0_4px_20px_rgba(46,50,48,0.06)] sm:p-8",
        className,
      )}
      {...props}
    />
  );
}
