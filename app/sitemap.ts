import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getBlueprints, getCurrentBuild, getPhilosophy, getStack, getSystems } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentBuild = getCurrentBuild();
  const philosophy = getPhilosophy();
  const stack = getStack();

  // Real content dates where available (singleton pages) rather than
  // `new Date()` for every build — a sitemap claiming everything changed
  // on every deploy is misleading to crawlers, not just imprecise.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/systems`, lastModified: new Date() },
    { url: `${siteConfig.url}/blueprints`, lastModified: new Date() },
    {
      url: `${siteConfig.url}/current-build`,
      lastModified: currentBuild ? new Date(currentBuild.updatedAt) : new Date(),
    },
    {
      url: `${siteConfig.url}/philosophy`,
      lastModified: philosophy?.date ? new Date(philosophy.date) : new Date(),
    },
    {
      url: `${siteConfig.url}/stack`,
      lastModified: stack?.date ? new Date(stack.date) : new Date(),
    },
  ];

  const systemRoutes: MetadataRoute.Sitemap = getSystems().map((system) => ({
    url: `${siteConfig.url}/systems/${system.slug}`,
    lastModified: system.date,
  }));

  const blueprintRoutes: MetadataRoute.Sitemap = getBlueprints().map((blueprint) => ({
    url: `${siteConfig.url}/blueprints/${blueprint.slug}`,
    lastModified: blueprint.date,
  }));

  return [...staticRoutes, ...systemRoutes, ...blueprintRoutes];
}
