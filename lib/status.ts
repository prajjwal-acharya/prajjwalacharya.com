/**
 * Finalized status vocabulary (Phase 1). Systems/Blueprints values mirror
 * the enums in `velite.config.ts` — keep both in sync if this ever
 * changes. Current Build doesn't have a status field in its content
 * schema yet (ARCHITECTURE.md §9 lists arrays, not a status), so this
 * vocabulary is ready for whenever that schema grows to use one.
 */
export const SYSTEM_STATUSES = ["active", "research", "archived"] as const;
export const BLUEPRINT_STATUSES = ["draft", "published", "revised"] as const;
export const CURRENT_BUILD_STATUSES = ["building", "paused", "completed"] as const;

export type SystemStatus = (typeof SYSTEM_STATUSES)[number];
export type BlueprintStatus = (typeof BLUEPRINT_STATUSES)[number];
export type CurrentBuildStatus = (typeof CURRENT_BUILD_STATUSES)[number];
export type Status = SystemStatus | BlueprintStatus | CurrentBuildStatus;

/**
 * Exactly two visual tones, on purpose (ARCHITECTURE.md §13: status never
 * relies on color alone, and §6: status colors stay near-monochrome). The
 * label is what tells statuses apart; tone only marks "currently live"
 * versus everything else — not-yet-live, paused, and finished all read
 * the same calm, muted way.
 */
export type StatusTone = "accent" | "muted";

const LIVE_STATUSES: ReadonlySet<Status> = new Set(["active", "published", "building"]);

export function getStatusTone(status: Status): StatusTone {
  return LIVE_STATUSES.has(status) ? "accent" : "muted";
}

const STATUS_LABELS: Record<Status, string> = {
  active: "Active",
  research: "Research",
  archived: "Archived",
  draft: "Draft",
  published: "Published",
  revised: "Revised",
  building: "Building",
  paused: "Paused",
  completed: "Completed",
};

export function getStatusLabel(status: Status): string {
  return STATUS_LABELS[status];
}
