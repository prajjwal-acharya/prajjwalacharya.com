import type { Metadata } from "next";
import NextLink from "next/link";
import { EmptyState } from "@/components/content/empty-state";
import { EntryCard } from "@/components/content/entry-card";
import { SectionHeader } from "@/components/content/section-header";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/lib/config";
import { getBlueprints } from "@/lib/content";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

const TITLE = "Blueprints";
const DESCRIPTION = "Foundational documents and architectural blueprints.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/blueprints",
  feedPath: "/blueprints/feed.xml",
  feedTitle: `${siteConfig.name} — Blueprints`,
});

export default function BlueprintsPage() {
  const blueprints = getBlueprints();
  const [featured, ...rest] = blueprints;
  const url = `${siteConfig.url}/blueprints`;

  return (
    <div className="drafting-grid relative">
      <Section width="wide">
        <JsonLd
          data={[
            collectionPageJsonLd({ name: TITLE, description: DESCRIPTION, url }),
            breadcrumbJsonLd([
              { name: "Home", url: siteConfig.url },
              { name: TITLE, url },
            ]),
          ]}
        />
        <SectionHeader
          as="h1"
          eyebrow="Blueprints Archive"
          title="Dispatches from the engineering frontier"
          description={DESCRIPTION}
        />

        {blueprints.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            description="Blueprints will show up here as they're written."
            className="mt-12"
          />
        ) : (
          <>
            {/* Featured highlight + secondary metadata, web.md's Blueprints mockup. */}
            {featured ? (
              <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-stretch">
                <NextLink
                  href={`/blueprints/${featured.slug}`}
                  className="group from-primary to-tertiary relative flex h-96 w-full flex-col justify-center overflow-hidden rounded-xl bg-gradient-to-br p-8 lg:w-2/3"
                >
                  <div className="mb-4 flex gap-2">
                    <span className="bg-tertiary text-on-tertiary rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                      Primary Record
                    </span>
                    {featured.readingTime ? (
                      <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
                        {featured.readingTime} min read
                      </span>
                    ) : null}
                  </div>
                  <h3 className="font-display mb-4 text-4xl leading-tight font-medium text-white transition-transform duration-500 group-hover:-translate-y-1 lg:text-5xl">
                    {featured.title}
                  </h3>
                  <p className="font-body max-w-xl text-lg text-white/80">{featured.description}</p>
                </NextLink>

                <div className="flex flex-col gap-4 lg:w-1/3">
                  <div className="border-outline-variant/30 bg-surface-container flex flex-1 flex-col justify-between rounded-xl border p-6">
                    <div>
                      <p className="text-tertiary mb-2 text-xs font-bold tracking-widest uppercase">
                        Editor&apos;s Note
                      </p>
                      <h4 className="font-display text-on-surface mb-3 text-2xl">
                        {rest[0]?.title ?? "More records coming soon"}
                      </h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        {rest[0]?.description ?? "Check back as new blueprints are published."}
                      </p>
                    </div>
                    <div className="border-outline-variant/50 text-on-surface-variant mt-6 flex items-center justify-between border-t pt-6 text-xs font-bold">
                      <span>Updated {formatDate(featured.date)}</span>
                      {rest[0] ? (
                        <NextLink
                          href={`/blueprints/${rest[0].slug}`}
                          className="text-primary hover:underline"
                        >
                          Read Now →
                        </NextLink>
                      ) : null}
                    </div>
                  </div>
                  <div className="bg-primary-container/10 border-primary-container/20 rounded-xl border p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary-container text-on-primary-container rounded-lg p-3">
                        <Icon name="analytics" />
                      </div>
                      <div>
                        <p className="text-on-surface text-sm font-bold">Archive Health</p>
                        <p className="text-on-surface-variant text-xs">
                          {blueprints.length} record{blueprints.length === 1 ? "" : "s"} published.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Technical Records archive grid. */}
            <div className="mt-16">
              <SectionHeader as="h2" title="Technical Records" />
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(featured ? rest : blueprints).map((blueprint) => (
                  <EntryCard
                    key={blueprint.slug}
                    href={`/blueprints/${blueprint.slug}`}
                    id={blueprint.id}
                    title={blueprint.title}
                    description={blueprint.description}
                    status={blueprint.status}
                    date={blueprint.date}
                    readingTime={blueprint.readingTime}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </Section>
    </div>
  );
}
