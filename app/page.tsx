import type { Metadata } from "next";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { CurrentFocus } from "@/components/home/current-focus";
import { EngineeringPrinciples } from "@/components/home/engineering-principles";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { FeaturedSystem } from "@/components/home/featured-system";
import { FindHereGrid } from "@/components/home/find-here-grid";
import { Hero } from "@/components/home/hero";
import { EntryCard } from "@/components/content/entry-card";
import { getBlueprints } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({ path: "/" });

const FEATURED_COUNT = 3;

/**
 * Every section below is full-bleed at the page level (own bg + padding,
 * own inner `max-w-*` container) — matching home.md's actual DOM
 * structure — rather than sharing one outer `<Section>` wrapper like every
 * other page. That's what makes the alternating background bands
 * (surface-container-low / surface-container / primary) possible.
 */
export default function HomePage() {
  const blueprints = getBlueprints().slice(0, FEATURED_COUNT);

  return (
    <>
      {/* 01. Hero: Engineer Identity + Current Focus. */}
      <section className="drafting-grid px-8 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-12 md:flex-row">
          <Hero />
          <CurrentFocus />
        </div>
      </section>

      <AboutSection />

      <FindHereGrid />

      {/* 04. Featured Work: the featured System + latest Blueprints, merged. */}
      <section className="bg-surface-container px-8 py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-16">
          <h2 className="text-on-surface font-display text-3xl font-bold">Featured Work</h2>
          <FeaturedSystem />
          <FeaturedCollection
            title="Latest Blueprints"
            viewAllHref="/blueprints"
            viewAllLabel="View Archive"
            emptyTitle="Nothing here yet"
            emptyDescription="Blueprints will show up here as they're written."
            items={blueprints.map((blueprint) => (
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
          />
        </div>
      </section>

      {/* 06. Engineering Principles + Building in Public, merged. */}
      <EngineeringPrinciples />

      <ContactSection />
    </>
  );
}
