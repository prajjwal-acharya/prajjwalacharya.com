import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  /** Absolute or `siteConfig.url`-relative image URL — typically a collection entry's `heroImage.src`. */
  image?: string;
  /**
   * `"article"` for Systems/Blueprints entries — adds OpenGraph's
   * `article:published_time` (and `modified_time`, `section`, `tags`
   * when given). Everything else stays `"website"` (the default).
   */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** OpenGraph article `section` — the collection name ("Systems", "Blueprints"). */
  section?: string;
  tags?: string[];
  /**
   * Collection-specific RSS feed (e.g. `/systems/feed.xml`) to advertise
   * alongside the site-wide one, which every page gets by default.
   */
  feedPath?: string;
  feedTitle?: string;
};

/**
 * Shared `generateMetadata` builder so per-page metadata stays a one-liner.
 * Pages pass only what differs from the site default. Every entry/singleton
 * page routes its OpenGraph/Twitter/canonical metadata through this one
 * function — no page hand-rolls its own (Phase 2: "no duplicated metadata
 * generation").
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  section,
  tags,
  feedPath,
  feedTitle,
}: BuildMetadataInput = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const imageUrl = image ? new URL(image, siteConfig.url).toString() : undefined;

  // Every page advertises the site-wide feed; a page can additionally
  // advertise its own collection feed (Systems/Blueprints listings).
  const feedLinks = [
    { title: `${siteConfig.name} — All content`, url: "/feed.xml" },
    ...(feedPath ? [{ title: feedTitle ?? siteConfig.name, url: feedPath }] : []),
  ];

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          title: title ?? siteConfig.title,
          description,
          url,
          siteName: siteConfig.name,
          images: imageUrl ? [{ url: imageUrl }] : undefined,
          publishedTime,
          modifiedTime,
          authors: [siteConfig.name],
          section,
          tags,
        }
      : {
          type: "website",
          title: title ?? siteConfig.title,
          description,
          url,
          siteName: siteConfig.name,
          images: imageUrl ? [{ url: imageUrl }] : undefined,
        };

  return {
    // Omitted entirely, not `title: undefined`, when no title is given:
    // Next's layout/page metadata merge treats an explicitly-present
    // `title` key as an override even when its value is `undefined`,
    // which clobbers the root layout's `title.template` — confirmed by
    // checking the actual rendered `<title>` tag, not assumed. The
    // homepage (the one page with no title override) needs this key
    // absent so it inherits the layout's default title.
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": feedLinks },
    },
    openGraph,
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: title ?? siteConfig.title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
