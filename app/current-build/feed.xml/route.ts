import { siteConfig } from "@/lib/config";
import { getCurrentBuild } from "@/lib/content";
import { generateRssFeed, rssResponse } from "@/lib/rss";

// See app/feed.xml/route.ts — same reasoning (fully static site, no ISR).
export const dynamic = "force-static";

/** Singleton, so this feed carries at most one item — the current snapshot — rather than a history of past ones. */
export function GET() {
  const currentBuild = getCurrentBuild();

  const items = currentBuild
    ? [
        {
          title: currentBuild.title,
          description: currentBuild.description ?? "A snapshot of current work.",
          url: `${siteConfig.url}/current-build`,
          date: currentBuild.updatedAt,
        },
      ]
    : [];

  const xml = generateRssFeed({
    title: `${siteConfig.name} — Current Build`,
    description: "A living snapshot of what's currently being built.",
    feedPath: "/current-build/feed.xml",
    items,
  });

  return rssResponse(xml);
}
