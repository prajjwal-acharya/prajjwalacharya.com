import type { Metadata } from "next";
import { EmptyState } from "@/components/content/empty-state";
import { SectionHeader } from "@/components/content/section-header";
import { Section } from "@/components/layout/section";
import { Quote } from "@/components/mdx/quote";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/lib/config";
import { getPhilosophy } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const philosophy = getPhilosophy();
  return buildMetadata({
    title: philosophy?.title ?? "Philosophy",
    description: philosophy?.description,
    path: "/philosophy",
    image: philosophy?.heroImage?.src,
  });
}

// The three smaller bento cards (Negative Space / First Principles /
// Systems Thinking, in that content order) — icon + color treatment is a
// page-level design choice, kept separate from the content itself.
const PILLAR_STYLES = [
  {
    icon: "blur_on",
    colSpan: "md:col-span-4",
    className: "bg-primary text-on-primary shadow-xl",
    bodyClassName: "text-on-primary/80",
  },
  {
    icon: "foundation",
    colSpan: "md:col-span-4",
    className:
      "bg-tertiary-container text-on-tertiary-container shadow-[0_4px_20px_rgba(46,50,48,0.06)]",
    bodyClassName: "opacity-90",
  },
  {
    icon: "hub",
    colSpan: "md:col-span-8",
    className: "bg-surface-container text-on-surface shadow-[0_4px_20px_rgba(46,50,48,0.06)]",
    bodyClassName: "text-on-surface-variant",
  },
] as const;

export default function PhilosophyPage() {
  const philosophy = getPhilosophy();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Philosophy", url: `${siteConfig.url}/philosophy` },
  ]);

  if (!philosophy) {
    return (
      <Section width="prose">
        <JsonLd data={breadcrumb} />
        <SectionHeader as="h1" eyebrow="Philosophy" title="Philosophy" />
        <EmptyState
          title="Nothing here yet"
          description="How I think about building will show up here."
          className="mt-12"
        />
      </Section>
    );
  }

  return (
    <div className="drafting-grid relative">
      <Section width="wide">
        <JsonLd data={breadcrumb} />

        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 py-8 text-center md:py-16">
          <span className="bg-tertiary-fixed text-on-tertiary-fixed inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase">
            Philosophy
          </span>
          <h1 className="font-display text-on-surface text-4xl font-medium md:text-6xl">
            {philosophy.title}
          </h1>
          {philosophy.description ? (
            <p className="text-on-surface-variant font-mono text-sm tracking-[0.2em] uppercase">
              {philosophy.description}
            </p>
          ) : null}
          {philosophy.quote ? (
            <Quote cite={philosophy.quote.cite} className="mt-4 text-left">
              {philosophy.quote.text}
            </Quote>
          ) : null}
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-12">
          {philosophy.whyIBuild.length > 0 ? (
            <div className="border-outline-variant/10 bg-surface-container-lowest flex flex-col gap-6 rounded-xl border p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] md:col-span-8 md:p-12">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-primary text-3xl font-bold md:text-4xl">
                  Why I Build
                </h2>
                <Icon name="architecture" className="text-primary-container/40 shrink-0 text-4xl" />
              </div>
              <div className="flex flex-col gap-4">
                {philosophy.whyIBuild.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="font-body text-on-surface-variant text-lg leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          {philosophy.pillars.map((pillar, index) => {
            const style = PILLAR_STYLES[index % PILLAR_STYLES.length] ?? PILLAR_STYLES[0];
            return (
              <div
                key={pillar.title}
                className={`flex flex-col gap-4 rounded-xl p-8 ${style.colSpan} ${style.className}`}
              >
                <div className="flex items-center gap-3">
                  <Icon name={style.icon} />
                  <h2 className="font-display text-2xl font-bold">{pillar.title}</h2>
                </div>
                <p className={`font-body leading-relaxed ${style.bodyClassName}`}>{pillar.body}</p>
              </div>
            );
          })}
        </div>

        {philosophy.learningPrinciples.length > 0 || philosophy.mindChanges.length > 0 ? (
          <div className="border-outline-variant/20 mx-auto mt-16 max-w-4xl border-t pt-16">
            <h3 className="font-display text-on-surface mb-10 text-center text-3xl font-bold">
              Still Learning
            </h3>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {philosophy.learningPrinciples.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <p className="text-tertiary text-xs font-bold tracking-widest uppercase">
                    Learning Philosophy
                  </p>
                  <ol className="text-on-surface-variant flex flex-col gap-3 text-sm leading-relaxed">
                    {philosophy.learningPrinciples.map((item, index) => (
                      <li key={item} className="flex gap-3">
                        <span className="font-display text-primary shrink-0 font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                  {philosophy.currentlyResearching ? (
                    <p className="text-on-surface-variant text-sm italic">
                      Currently researching: {philosophy.currentlyResearching}.
                    </p>
                  ) : null}
                </div>
              ) : null}

              {philosophy.mindChanges.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <p className="text-tertiary text-xs font-bold tracking-widest uppercase">
                    Things I&apos;ve Changed My Mind About
                  </p>
                  <ul className="text-on-surface-variant flex flex-col gap-3 text-sm leading-relaxed">
                    {philosophy.mindChanges.map((change) => (
                      <li key={change.from}>
                        <span className="text-on-surface font-bold">Then: {change.from}.</span> Now:{" "}
                        {change.to}.
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </Section>
    </div>
  );
}
