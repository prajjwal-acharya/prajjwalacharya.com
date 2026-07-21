import { Section } from "@/components/layout/section";

/**
 * Root-level, so it covers every route during client-side navigation
 * (the whole site is statically pre-rendered, so this mostly appears on
 * slow connections). One shared skeleton rather than a near-identical
 * loading.tsx per route. `animate-pulse` already respects
 * `prefers-reduced-motion` via the global rule in globals.css. No
 * spinner, per Phase 4.
 */
export default function Loading() {
  return (
    <Section width="prose">
      <div role="status" className="flex flex-col gap-8">
        <span className="sr-only">Loading…</span>
        <div className="flex flex-col gap-3">
          <div
            aria-hidden="true"
            className="bg-outline-variant h-3 w-24 animate-pulse rounded-sm"
          />
          <div
            aria-hidden="true"
            className="bg-outline-variant h-10 w-3/4 animate-pulse rounded-sm"
          />
        </div>
        <div aria-hidden="true" className="flex flex-col gap-3">
          <div className="bg-outline-variant h-4 w-full animate-pulse rounded-sm" />
          <div className="bg-outline-variant h-4 w-5/6 animate-pulse rounded-sm" />
          <div className="bg-outline-variant h-4 w-2/3 animate-pulse rounded-sm" />
        </div>
      </div>
    </Section>
  );
}
