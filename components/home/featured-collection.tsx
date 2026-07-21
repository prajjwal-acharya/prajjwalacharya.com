import NextLink from "next/link";
import type { ReactNode } from "react";
import { EmptyState } from "@/components/content/empty-state";
import { Icon } from "@/components/ui/icon";

type FeaturedCollectionProps = {
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
  items: ReactNode[];
  emptyTitle: string;
  emptyDescription: string;
};

/**
 * Home's numbered-section header + a list collection's cards — one
 * implementation instead of duplicating the header pattern per section.
 * Callers pass pre-built `EntryCard`s; this owns only the header/link/
 * empty-state structure around them.
 */
export function FeaturedCollection({
  title,
  viewAllHref,
  viewAllLabel,
  items,
  emptyTitle,
  emptyDescription,
}: FeaturedCollectionProps) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <h2 className="text-on-surface font-display text-3xl font-bold">{title}</h2>
        {items.length > 0 ? (
          <NextLink
            href={viewAllHref}
            className="text-on-surface-variant hover:text-primary flex items-center gap-2 transition-colors"
          >
            {viewAllLabel} <Icon name="arrow_forward" className="text-sm" />
          </NextLink>
        ) : null}
      </div>
      {items.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">{items}</div>
      )}
    </div>
  );
}
