import NextLink from "next/link";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type AdjacentEntry = {
  slug: string;
  title: string;
};

type PrevNextProps = {
  basePath: string;
  prev?: AdjacentEntry;
  next?: AdjacentEntry;
  className?: string;
};

/** Chronological neighbor navigation — data comes from `lib/content.ts`'s `getAdjacent*` helpers. */
export function PrevNext({ basePath, prev, next, className }: PrevNextProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Adjacent entries"
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}
    >
      {prev ? (
        <NextLink
          href={`${basePath}/${prev.slug}`}
          className="group bg-surface-container-low hover:bg-surface-container flex flex-col gap-1 rounded-xl p-6 transition-colors"
        >
          <span className="text-on-surface-variant group-hover:text-primary inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase transition-colors">
            <Icon name="arrow_back" className="text-[16px]" />
            Previous
          </span>
          <span className="font-display group-hover:text-primary text-on-surface text-lg transition-colors">
            {prev.title}
          </span>
        </NextLink>
      ) : (
        <div aria-hidden="true" />
      )}
      {next ? (
        <NextLink
          href={`${basePath}/${next.slug}`}
          className="group bg-surface-container-low hover:bg-surface-container flex flex-col gap-1 rounded-xl p-6 text-right transition-colors sm:items-end"
        >
          <span className="text-on-surface-variant group-hover:text-primary inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase transition-colors">
            Next
            <Icon name="arrow_forward" className="text-[16px]" />
          </span>
          <span className="font-display group-hover:text-primary text-on-surface text-lg transition-colors">
            {next.title}
          </span>
        </NextLink>
      ) : (
        <div aria-hidden="true" />
      )}
    </nav>
  );
}
