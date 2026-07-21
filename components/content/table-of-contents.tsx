"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type TocEntry = {
  title: string;
  url: string;
  items: TocEntry[];
};

type TableOfContentsProps = {
  items: TocEntry[];
  className?: string;
};

/**
 * Renders Velite's auto-generated `toc` field (H2/H3 only, see
 * `velite.config.ts`) as a collapsed dropdown rather than a fully spelled
 * out list: a long article's heading list read as a wall of text on the
 * page, so it starts closed and only expands on click. No scroll spy,
 * plain anchor links, one nesting level since depth is fixed at H2→H3.
 */
export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className={cn("bg-surface-container-low rounded-xl", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="text-tertiary flex w-full items-center justify-between p-6 text-[10px] font-bold tracking-widest uppercase"
      >
        Content
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>
      {open ? (
        <nav aria-label="Table of contents" className="px-6 pb-6">
          <ul className="font-body flex flex-col gap-2 text-sm">
            {items.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  onClick={() => setOpen(false)}
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  {item.title}
                </a>
                {item.items.length > 0 ? (
                  <ul className="mt-2 flex flex-col gap-2 pl-4">
                    {item.items.map((child) => (
                      <li key={child.url}>
                        <a
                          href={child.url}
                          onClick={() => setOpen(false)}
                          className="text-on-surface-variant hover:text-primary transition-colors"
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
