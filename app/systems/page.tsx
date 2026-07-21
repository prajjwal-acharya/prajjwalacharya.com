import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/content/empty-state";
import { EntryCard } from "@/components/content/entry-card";
import { SectionHeader } from "@/components/content/section-header";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/config";
import { getSystems } from "@/lib/content";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { SYSTEM_STATUSES, getStatusLabel } from "@/lib/status";

const TITLE = "Systems";
const DESCRIPTION = "A technical record of infrastructure, core engines, and running projects.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/systems",
  feedPath: "/systems/feed.xml",
  feedTitle: `${siteConfig.name} — Systems`,
});

export default function SystemsPage() {
  const systems = getSystems();
  const url = `${siteConfig.url}/systems`;
  const statusCounts = SYSTEM_STATUSES.map((status) => ({
    status,
    label: getStatusLabel(status),
    count: systems.filter((system) => system.status === status).length,
  }));

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
          eyebrow="Engineering Index"
          title="Active Systems Architecture"
          description={DESCRIPTION}
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {systems.length === 0 ? (
            <EmptyState
              title="Nothing here yet"
              description="Systems will show up here as they're built."
              className="md:col-span-2 xl:col-span-3"
            />
          ) : (
            systems.map((system) => (
              <EntryCard
                key={system.slug}
                href={`/systems/${system.slug}`}
                id={system.id}
                title={system.title}
                description={system.summary}
                status={system.status}
                date={system.date}
                readingTime={system.readingTime}
              />
            ))
          )}
        </div>

        {systems.length > 0 ? (
          <div className="border-outline-variant/20 mt-16 flex flex-wrap justify-center gap-12 border-t pt-12">
            {statusCounts.map(({ status, label, count }) => (
              <div key={status} className="text-center">
                <p className="text-primary text-2xl font-bold">{count}</p>
                <p className="text-tertiary text-[10px] font-bold uppercase">{label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </Section>
    </div>
  );
}
