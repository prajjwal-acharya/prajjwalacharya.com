import { Badge } from "@/components/ui/badge";
import { getStatusLabel, getStatusTone, type Status } from "@/lib/status";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: Status;
  className?: string;
};

/** The status-specific composition of `Badge` — label + tone come from `lib/status.ts`, never chosen ad hoc at the call site. */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const tone = getStatusTone(status);

  return (
    <Badge tone={tone} className={className}>
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          tone === "accent" ? "bg-primary animate-pulse" : "bg-on-surface-variant",
        )}
      />
      {getStatusLabel(status)}
    </Badge>
  );
}
