import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "font-body inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase",
  {
    variants: {
      tone: {
        default: "bg-surface-container-highest text-on-surface-variant",
        accent: "bg-primary-fixed text-on-primary-fixed-variant",
        muted: "bg-surface-container-highest text-on-surface-variant",
        tertiary: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

/** Generic pill label. `StatusBadge` is the status-specific composition of this. */
export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
