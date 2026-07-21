import { siteConfig } from "@/lib/config";

export type RssItem = {
  title: string;
  description: string;
  url: string;
  /** ISO date string. */
  date: string;
};

type RssFeedInput = {
  title: string;
  description: string;
  feedPath: string;
  items: RssItem[];
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * One RSS 2.0 generator shared by every feed route (`app/**​/feed.xml/route.ts`)
 * — Phase 4: "no duplicated RSS logic." Feeds are computed at request time
 * from `lib/content.ts`, so they always reflect current content without a
 * separate build step.
 */
export function generateRssFeed({ title, description, feedPath, items }: RssFeedInput): string {
  const feedUrl = `${siteConfig.url}${feedPath}`;
  const lastBuildDate = items[0]?.date
    ? new Date(items[0].date).toUTCString()
    : new Date().toUTCString();

  const itemsXml = items
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />${itemsXml}
  </channel>
</rss>
`;
}

export function rssResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
