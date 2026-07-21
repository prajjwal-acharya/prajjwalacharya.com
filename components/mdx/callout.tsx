import { AlertCircle, AlertTriangle, Info, Lightbulb, Search } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CalloutType = "note" | "warning" | "insight" | "research" | "important";

/**
 * Two tones only, same rule as `StatusBadge` (ARCHITECTURE.md §6/§13):
 * "flag" (Warning, Important) gets the accent-colored left stripe and
 * icon; "neutral" (Note, Insight, Research) stays muted. The label and
 * icon — not a five-color palette — are what actually distinguish the
 * five types.
 */
const CALLOUT_CONFIG: Record<
  CalloutType,
  {
    label: string;
    icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
    tone: "neutral" | "flag";
  }
> = {
  note: { label: "Note", icon: Info, tone: "neutral" },
  insight: { label: "Insight", icon: Lightbulb, tone: "neutral" },
  research: { label: "Research", icon: Search, tone: "neutral" },
  warning: { label: "Warning", icon: AlertTriangle, tone: "flag" },
  important: { label: "Important", icon: AlertCircle, tone: "flag" },
};

type CalloutProps = {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
};

export function Callout({ type = "note", title, children }: CalloutProps) {
  const config = CALLOUT_CONFIG[type];
  const Icon = config.icon;
  const isFlag = config.tone === "flag";

  return (
    <div
      role="note"
      className={cn(
        "border-outline-variant bg-surface-container-low flex gap-3 rounded-xl border p-4",
        isFlag && "border-l-primary border-l-4",
      )}
    >
      <Icon
        aria-hidden
        className={cn(
          "mt-0.5 size-4 shrink-0",
          isFlag ? "text-primary" : "text-on-surface-variant",
        )}
      />
      <div className="flex flex-col gap-1">
        <p
          className={cn(
            "font-body text-xs font-bold tracking-widest uppercase",
            isFlag ? "text-primary" : "text-on-surface-variant",
          )}
        >
          {title ?? config.label}
        </p>
        <div className="font-body text-on-surface text-sm leading-relaxed [&>p]:m-0">
          {children}
        </div>
      </div>
    </div>
  );
}
