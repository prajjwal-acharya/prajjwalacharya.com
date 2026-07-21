import { blueprints, currentBuild, philosophy, stack, systems } from "#velite";

export type { Blueprint, CurrentBuild, Philosophy, Stack, System } from "#velite";

/**
 * Pages should only ever read content through these accessors, never import
 * `#velite` directly — keeps Velite's raw output shape an implementation
 * detail (ARCHITECTURE.md §9).
 */

/** Oldest-first — the order prev/next adjacency (below) walks. */
function byDateAscending<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.date.localeCompare(b.date));
}

export function getSystems() {
  return byDateAscending(systems).reverse();
}

export function getSystemBySlug(slug: string) {
  return systems.find((system) => system.slug === slug);
}

export function getBlueprints() {
  return byDateAscending(blueprints).reverse();
}

export function getBlueprintBySlug(slug: string) {
  return blueprints.find((blueprint) => blueprint.slug === slug);
}

export function getBlueprintById(id: string) {
  return blueprints.find((blueprint) => blueprint.id === id);
}

export function getSystemById(id: string) {
  return systems.find((system) => system.id === id);
}

export type Adjacent<T> = {
  prev: T | undefined;
  next: T | undefined;
};

/**
 * Chronological neighbors of `slug` — `prev` is the entry published just
 * before it, `next` just after (reader's forward-in-time direction, the
 * conventional blog/journal sense). Shared by Systems and Blueprints so
 * the ordering logic exists in exactly one place.
 */
function getAdjacent<T extends { slug: string; date: string }>(
  items: T[],
  slug: string,
): Adjacent<T> {
  const ordered = byDateAscending(items);
  const index = ordered.findIndex((item) => item.slug === slug);

  if (index === -1) {
    return { prev: undefined, next: undefined };
  }

  return { prev: ordered[index - 1], next: ordered[index + 1] };
}

export function getAdjacentSystems(slug: string) {
  return getAdjacent(systems, slug);
}

export function getAdjacentBlueprints(slug: string) {
  return getAdjacent(blueprints, slug);
}

/**
 * `current-build`, `philosophy`, and `stack` are singleton content types
 * but aren't declared `single: true` in velite.config.ts yet — see the
 * comment there. `[0]` is the singleton read; `undefined` until Phase 1
 * adds the first entry for each.
 */
export function getCurrentBuild() {
  return currentBuild[0];
}

export function getPhilosophy() {
  return philosophy[0];
}

export function getStack() {
  return stack[0];
}
