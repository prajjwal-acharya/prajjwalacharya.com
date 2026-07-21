import { siteConfig } from "@/lib/config";
import { getBlueprints, getCurrentBuild, getSystems } from "@/lib/content";
import { generateRssFeed, rssResponse, type RssItem } from "@/lib/rss";

// Route Handlers are dynamic by default; this site is fully static (no
// ISR — ARCHITECTURE.md §10), and content only changes on deploy, so the
// feed is generated once at build time like every other route.
export const dynamic = "force-static";

/** Systems + Blueprints + the Current Build snapshot, merged and sorted newest-first. */
export function GET() {
  const currentBuild = getCurrentBuild();

  const systemItems: RssItem[] = getSystems().map((system) => ({
    title: `[System] ${system.title}`,
    description: system.summary,
    url: `${siteConfig.url}/systems/${system.slug}`,
    date: system.date,
  }));

  const blueprintItems: RssItem[] = getBlueprints().map((blueprint) => ({
    title: `[Blueprint] ${blueprint.title}`,
    description: blueprint.description,
    url: `${siteConfig.url}/blueprints/${blueprint.slug}`,
    date: blueprint.date,
  }));

  const currentBuildItems: RssItem[] = currentBuild
    ? [
        {
          title: `[Current Build] ${currentBuild.title}`,
          description: currentBuild.description ?? "A snapshot of current work.",
          url: `${siteConfig.url}/current-build`,
          date: currentBuild.updatedAt,
        },
      ]
    : [];

  const items = [...systemItems, ...blueprintItems, ...currentBuildItems].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  const xml = generateRssFeed({
    title: siteConfig.name,
    description: siteConfig.description,
    feedPath: "/feed.xml",
    items,
  });

  return rssResponse(xml);
}
