import { siteConfig } from "@/lib/config";
import { getBlueprints } from "@/lib/content";
import { generateRssFeed, rssResponse } from "@/lib/rss";

// See app/feed.xml/route.ts — same reasoning (fully static site, no ISR).
export const dynamic = "force-static";

export function GET() {
  const items = getBlueprints().map((blueprint) => ({
    title: blueprint.title,
    description: blueprint.description,
    url: `${siteConfig.url}/blueprints/${blueprint.slug}`,
    date: blueprint.date,
  }));

  const xml = generateRssFeed({
    title: `${siteConfig.name} — Blueprints`,
    description: "Technical writing.",
    feedPath: "/blueprints/feed.xml",
    items,
  });

  return rssResponse(xml);
}
