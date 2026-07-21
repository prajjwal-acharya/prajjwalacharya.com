import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrevNext } from "@/components/content/prev-next";
import { TableOfContents } from "@/components/content/table-of-contents";
import { Section } from "@/components/layout/section";
import { MDXContent } from "@/components/mdx";
import { JsonLd } from "@/components/seo/json-ld";
import { StatusBadge } from "@/components/ui/status-badge";
import { siteConfig } from "@/lib/config";
import { getAdjacentBlueprints, getBlueprintBySlug, getBlueprints } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";

type BlueprintPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlueprints().map((blueprint) => ({ slug: blueprint.slug }));
}

export async function generateMetadata({ params }: BlueprintPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);
  if (!blueprint) return {};

  return buildMetadata({
    title: blueprint.title,
    description: blueprint.description,
    path: `/blueprints/${blueprint.slug}`,
    image: blueprint.heroImage?.src,
    type: "article",
    publishedTime: blueprint.date,
    section: "Blueprints",
  });
}

/** The "Deep Reading Inset" treatment from web.md's Blueprints mockup — a large centered editorial card with a serif drop-cap opening. */
export default async function BlueprintPage({ params }: BlueprintPageProps) {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);
  if (!blueprint) notFound();

  const { prev, next } = getAdjacentBlueprints(slug);
  const url = `${siteConfig.url}/blueprints/${blueprint.slug}`;

  return (
    <div className="drafting-grid relative">
      <Section width="wide">
        <JsonLd
          data={[
            articleJsonLd({
              title: blueprint.title,
              description: blueprint.description,
              url,
              datePublished: blueprint.date,
              image: blueprint.heroImage?.src,
            }),
            breadcrumbJsonLd([
              { name: "Home", url: siteConfig.url },
              { name: "Blueprints", url: `${siteConfig.url}/blueprints` },
              { name: blueprint.title, url },
            ]),
          ]}
        />

        <div className="border-outline-variant/20 bg-surface-container-lowest shadow-on-surface/5 mx-auto rounded-3xl border p-8 shadow-xl md:p-16">
          <header className="mb-12 text-center">
            <span className="bg-surface-container-highest text-on-surface-variant mb-6 inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
              {blueprint.id}
            </span>
            <h1 className="font-display text-on-surface mb-6 text-4xl md:text-6xl">
              {blueprint.title}
            </h1>
            <div className="text-on-surface-variant font-body flex flex-wrap items-center justify-center gap-4 text-sm italic">
              <StatusBadge status={blueprint.status} />
              <span className="bg-outline-variant size-1 rounded-full" aria-hidden="true" />
              <span>Revision {blueprint.revision}</span>
              {blueprint.readingTime ? (
                <>
                  <span className="bg-outline-variant size-1 rounded-full" aria-hidden="true" />
                  <span>{blueprint.readingTime} min read</span>
                </>
              ) : null}
            </div>
          </header>

          {blueprint.heroImage ? (
            <img
              src={blueprint.heroImage.src}
              width={blueprint.heroImage.width}
              height={blueprint.heroImage.height}
              alt=""
              loading="eager"
              fetchPriority="high"
              className="mb-12 w-full rounded-xl object-cover"
            />
          ) : null}

          {blueprint.toc.length > 0 ? (
            <TableOfContents items={blueprint.toc} className="mb-12" />
          ) : null}

          {/* Drop-cap only the article's opening paragraph: `> div > p:first-of-type` restricts the match to a direct child of Prose's wrapper div (the first heading may come before it in the DOM, hence `:first-of-type` over `:first-child`), so it never reaches into a nested Callout's own paragraphs the way an unscoped `p:first-of-type` would. */}
          <div className="[&>div>p:first-of-type]:first-letter:font-display [&>div>p:first-of-type]:first-letter:text-primary text-lg [&>div>p:first-of-type]:first-letter:float-left [&>div>p:first-of-type]:first-letter:mr-3 [&>div>p:first-of-type]:first-letter:text-7xl [&>div>p:first-of-type]:first-letter:font-bold">
            <MDXContent code={blueprint.body} proseClassName="max-w-none" />
          </div>

          {blueprint.crossRefs.length > 0 ? (
            <div className="border-outline-variant/30 mt-16 border-t pt-8">
              <p className="text-tertiary mb-3 text-xs font-bold tracking-widest uppercase">
                Cross References
              </p>
              <div className="flex flex-wrap gap-2">
                {blueprint.crossRefs.map((ref) => (
                  <span
                    key={ref}
                    className="bg-surface-container-highest text-on-surface-variant rounded-full px-3 py-1 text-xs font-bold"
                  >
                    {ref}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <PrevNext basePath="/blueprints" prev={prev} next={next} className="mt-12" />
      </Section>
    </div>
  );
}
