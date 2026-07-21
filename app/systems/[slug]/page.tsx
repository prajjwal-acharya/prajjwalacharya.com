import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryHeader } from "@/components/content/entry-header";
import { PrevNext } from "@/components/content/prev-next";
import { TableOfContents } from "@/components/content/table-of-contents";
import { Section } from "@/components/layout/section";
import { Prose } from "@/components/mdx/prose";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/config";
import { getSystemsComponent } from "@/.generated/mdx/systems-registry";
import { getAdjacentSystems, getSystemBySlug, getSystems } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";

type SystemPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getSystems().map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({ params }: SystemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const system = getSystemBySlug(slug);
  if (!system) return {};

  return buildMetadata({
    title: system.title,
    description: system.summary,
    path: `/systems/${system.slug}`,
    image: system.heroImage?.src,
    type: "article",
    publishedTime: system.date,
    section: "Systems",
  });
}

export default async function SystemPage({ params }: SystemPageProps) {
  const { slug } = await params;
  const system = getSystemBySlug(slug);
  if (!system) notFound();

  const { prev, next } = getAdjacentSystems(slug);
  const url = `${siteConfig.url}/systems/${system.slug}`;
  const Body = getSystemsComponent(system.slug);
  if (!Body) notFound();

  return (
    <div className="drafting-grid relative">
      <Section width="wide">
        <JsonLd
          data={[
            articleJsonLd({
              title: system.title,
              description: system.summary,
              url,
              datePublished: system.date,
              image: system.heroImage?.src,
            }),
            breadcrumbJsonLd([
              { name: "Home", url: siteConfig.url },
              { name: "Systems", url: `${siteConfig.url}/systems` },
              { name: system.title, url },
            ]),
          ]}
        />
        <div className="border-outline-variant/20 bg-surface-container-lowest shadow-on-surface/5 rounded-3xl border p-8 shadow-xl md:p-16">
          <EntryHeader
            id={system.id}
            title={system.title}
            status={system.status}
            date={system.date}
            readingTime={system.readingTime}
            heroImage={system.heroImage}
            links={system.links}
          />
          {system.toc.length > 0 ? <TableOfContents items={system.toc} className="mt-10" /> : null}
          <div className="mt-10">
            <Body
              components={{
                wrapper: ({ children }) => <Prose className="max-w-none">{children}</Prose>,
              }}
            />
          </div>
        </div>
        <PrevNext basePath="/systems" prev={prev} next={next} className="mt-16" />
      </Section>
    </div>
  );
}
