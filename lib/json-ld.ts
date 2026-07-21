import { siteConfig } from "@/lib/config";

/**
 * Reusable structured-data builders (Phase 4). Every page composes these
 * instead of hand-writing schema.org objects inline — one shape per
 * schema type, used everywhere that type applies.
 */

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function personJsonLd() {
  const sameAs = [siteConfig.socials.github, siteConfig.socials.linkedin].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

type ArticleJsonLdInput = {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
};

export function articleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    ...(image ? { image: [image] } : {}),
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
  };
}

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

type CollectionPageJsonLdInput = {
  name: string;
  description: string;
  url: string;
};

export function collectionPageJsonLd({ name, description, url }: CollectionPageJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
  };
}
