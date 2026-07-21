import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Wrapping scroll container is the point — a wide table must scroll internally, never overflow the page (ARCHITECTURE.md content styling). */
export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div className="border-outline-variant/20 overflow-x-auto rounded-xl border">
      <table
        className={cn("w-full border-collapse text-sm [&_tr:last-child>td]:border-b-0", className)}
        {...props}
      />
    </div>
  );
}

export function Thead({ className, ...props }: ComponentProps<"thead">) {
  return <thead className={cn("bg-surface-container-low", className)} {...props} />;
}

export function Th({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "font-body border-outline-variant/10 text-on-surface-variant border-b px-4 py-2 text-left text-xs font-bold uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function Td({ className, ...props }: ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "font-body border-outline-variant/10 text-on-surface border-b px-4 py-2",
        className,
      )}
      {...props}
    />
  );
}
