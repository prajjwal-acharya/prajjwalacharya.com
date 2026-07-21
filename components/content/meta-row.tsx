import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MetaRowProps = {
  items: ReactNode[];
  className?: string;
};

/** Inline metadata (date · reading time · status), dot-separated. */
export function MetaRow({ items, className }: MetaRowProps) {
  const visible = items.filter(Boolean);

  return (
    <div
      className={cn(
        "font-body text-on-surface-variant/60 flex flex-wrap items-center gap-x-2 text-[11px] font-bold tracking-tighter uppercase",
        className,
      )}
    >
      {visible.map((item, index) => (
        <Fragment key={index}>
          {index > 0 ? <span aria-hidden="true">·</span> : null}
          <span>{item}</span>
        </Fragment>
      ))}
    </div>
  );
}
