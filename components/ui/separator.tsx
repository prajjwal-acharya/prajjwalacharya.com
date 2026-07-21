import { cn } from "@/lib/utils";

type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

/**
 * Low-level structural rule. `Divider` (components/content) composes this
 * with section-level spacing; use `Separator` directly for tighter
 * contexts (e.g. between inline metadata).
 */
export function Separator({ orientation = "horizontal", className }: SeparatorProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("bg-outline-variant w-px self-stretch", className)}
      />
    );
  }

  return <hr className={cn("border-outline-variant border-0 border-t", className)} />;
}
