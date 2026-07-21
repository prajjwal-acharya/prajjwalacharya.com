import { siteConfig } from "@/lib/config";
import { getSystems } from "@/lib/content";
import { generateRssFeed, rssResponse } from "@/lib/rss";

// See app/feed.xml/route.ts — same reasoning (fully static site, no ISR).
export const dynamic = "force-static";

export function GET() {
  const items = getSystems().map((system) => ({
    title: system.title,
    description: system.summary,
    url: `${siteConfig.url}/systems/${system.slug}`,
    date: system.date,
  }));

  const xml = generateRssFeed({
    title: `${siteConfig.name} — Systems`,
    description: "Things I'm building.",
    feedPath: "/systems/feed.xml",
    items,
  });

  return rssResponse(xml);
}
