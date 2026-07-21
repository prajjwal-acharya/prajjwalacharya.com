import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

/** Calm "nothing here yet" state for listing pages before content exists — dashed border reads as "in progress," not broken. */
export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "border-outline-variant/50 flex flex-col items-start gap-2 rounded-xl border border-dashed px-6 py-12",
        className,
      )}
    >
      <span className="text-on-surface-variant flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase">
        <Icon name="hourglass_empty" className="text-[14px]" />
        Empty
      </span>
      <p className="font-display text-on-surface text-xl font-medium">{title}</p>
      {description ? (
        <p className="font-body text-on-surface-variant text-sm">{description}</p>
      ) : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}
