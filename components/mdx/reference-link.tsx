import { AlertTriangle } from "lucide-react";
import { Link } from "@/components/ui/link";
import { getBlueprintById, getSystemById } from "@/lib/content";
import { cn } from "@/lib/utils";

type ReferenceLinkProps = {
  id: string;
  className?: string;
};

/**
 * Cross-reference by content ID (e.g. `SYS-001`, `BLD-002`) — resolves to
 * the entry's real title and href through `lib/content.ts`. IDs are
 * immutable per ARCHITECTURE.md §9's numbering policy, so this stays a
 * stable link even if the entry's title or slug changes later. A broken
 * reference (bad ID, deleted entry) renders visibly flagged, not as a
 * silently dead link.
 */
export function ReferenceLink({ id, className }: ReferenceLinkProps) {
  const isBlueprint = id.startsWith("BLD-");
  const entry = isBlueprint ? getBlueprintById(id) : getSystemById(id);

  if (!entry) {
    return (
      <span
        className={cn(
          "font-body text-primary inline-flex items-center gap-1 text-xs font-bold uppercase",
          className,
        )}
        title={`No content entry found for ${id}`}
      >
        <AlertTriangle aria-hidden="true" className="size-3.5" />
        {id} (broken reference)
      </span>
    );
  }

  const href = isBlueprint ? `/blueprints/${entry.slug}` : `/systems/${entry.slug}`;

  return (
    <Link href={href} className={className}>
      {entry.title}{" "}
      <span className="font-body text-on-surface-variant text-xs uppercase">{id}</span>
    </Link>
  );
}
