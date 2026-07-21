import NextLink from "next/link";
import { MetaRow } from "@/components/content/meta-row";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Status } from "@/lib/status";
import { formatDate } from "@/lib/utils";

type EntryCardProps = {
  href: string;
  id: string;
  title: string;
  description: string;
  status: Status;
  date: string;
  // `number | undefined`, matching `readingTimeFromRaw`'s return type
  // (undefined for empty content) — Systems/Blueprints always have real
  // body text in practice, but the type doesn't guarantee it, so this
  // stays defensive rather than asserting non-null.
  readingTime: number | undefined;
};

/**
 * Shared Systems/Blueprints listing-card shape — the two collections
 * differ only in field naming (`summary` vs `description`), not
 * structure, so this exists once instead of being copy-pasted per
 * listing page. Mirrors web.md's Blueprints "archive record" card.
 */
export function EntryCard({
  href,
  id,
  title,
  description,
  status,
  date,
  readingTime,
}: EntryCardProps) {
  return (
    <NextLink
      href={href}
      className="glass-green group flex flex-col rounded-xl p-6 transition-all duration-300 hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <span className="bg-surface-container-highest text-on-surface-variant rounded px-2 py-1 text-[10px] font-bold tracking-widest uppercase">
          {id}
        </span>
        <StatusBadge status={status} />
      </div>
      <h2 className="font-display group-hover:text-primary text-on-surface mb-2 text-xl font-medium transition-colors">
        {title}
      </h2>
      <p className="font-body text-on-surface-variant mb-6 line-clamp-3 flex-1 text-sm">
        {description}
      </p>
      <MetaRow
        items={[
          <time key="date" dateTime={date}>
            {formatDate(date)}
          </time>,
          readingTime ? <span key="reading-time">{readingTime} min read</span> : null,
        ]}
      />
    </NextLink>
  );
}
