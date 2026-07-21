const WORDS_PER_MINUTE = 200;

/**
 * Derives reading time from raw MDX source (via `s.raw()`) at build time —
 * no manual field, no per-collection reimplementation. Shared by every
 * collection in `velite.config.ts` that has a body. Returns `undefined`
 * for empty/whitespace-only content (Current Build and Stack allow a
 * body with effectively no prose — see the comment on their schemas) so
 * `EntryHeader` doesn't show a misleading "1 min read" for a page with
 * nothing to read.
 */
export function readingTimeFromRaw(raw: string | undefined): number | undefined {
  const words = (raw ?? "").trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return undefined;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
