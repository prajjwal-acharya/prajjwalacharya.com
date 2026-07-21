import type { Metadata } from "next";
import { EmptyState } from "@/components/content/empty-state";
import { SectionHeader } from "@/components/content/section-header";
import { TableOfContents } from "@/components/content/table-of-contents";
import { Section } from "@/components/layout/section";
import { MDXContent } from "@/components/mdx";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/lib/config";
import { getCurrentBuild } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export function generateMetadata(): Metadata {
  const currentBuild = getCurrentBuild();
  return buildMetadata({
    title: currentBuild?.title ?? "Current Build",
    description: currentBuild?.description,
    path: "/current-build",
    image: currentBuild?.heroImage?.src,
  });
}

const SEVERITY_LABEL = { critical: "Critical", medium: "Moderate", low: "Minor" } as const;
const SEVERITY_BORDER = {
  critical: "border-error",
  medium: "border-tertiary",
  low: "border-outline",
} as const;
const SEVERITY_TEXT = {
  critical: "text-error",
  medium: "text-tertiary",
  low: "text-on-surface-variant",
} as const;

const LEARNING_ICONS = ["database", "psychology", "memory", "insights"];

export default function CurrentBuildPage() {
  const currentBuild = getCurrentBuild();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Current Build", url: `${siteConfig.url}/current-build` },
  ]);

  if (!currentBuild) {
    return (
      <Section width="prose">
        <JsonLd data={breadcrumb} />
        <SectionHeader as="h1" eyebrow="Build Log" title="Current Build" />
        <EmptyState
          title="Nothing here yet"
          description="A living snapshot of what I'm building, learning, and thinking about will show up here."
          className="mt-12"
        />
      </Section>
    );
  }

  const { activeProject, challenges, learningProgress, recentProgress } = currentBuild;

  return (
    <div className="drafting-grid relative">
      <Section width="wide">
        <JsonLd data={breadcrumb} />
        <SectionHeader
          as="h1"
          eyebrow="Build Log"
          title={currentBuild.title}
          description={currentBuild.description}
        />
        {currentBuild.toc.length > 0 ? (
          <TableOfContents items={currentBuild.toc} className="mt-8" />
        ) : null}

        <div className="mt-10 grid grid-cols-1 items-start gap-6 md:grid-cols-12">
          {/* Left column: the open-journal core. */}
          <div className="flex flex-col gap-6 md:col-span-8">
            {activeProject ? (
              <section className="bg-surface-container-lowest relative overflow-hidden rounded-xl p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)]">
                <div className="mb-6 flex items-center gap-2">
                  <Icon name="edit_note" className="text-primary" />
                  <h2 className="font-display text-on-surface text-2xl font-bold">
                    Currently Building: {activeProject.name}
                  </h2>
                </div>
                <div className="flex flex-col gap-6">
                  <p className="font-body text-on-surface-variant leading-relaxed">
                    {activeProject.summary}
                  </p>
                  {activeProject.codeSnippet ? (
                    <pre className="border-primary text-on-secondary-container overflow-x-auto rounded-lg border-l-4 bg-[#fdfaf5] p-4 font-mono text-xs">
                      <code>{activeProject.codeSnippet}</code>
                    </pre>
                  ) : null}
                  <div className="border-outline-variant/30 flex flex-wrap items-center gap-4 border-y py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-primary size-3 animate-pulse rounded-full" />
                      <span className="text-on-surface-variant text-xs font-bold tracking-wider uppercase">
                        Active Process: {activeProject.stage ?? activeProject.name}
                      </span>
                    </div>
                    {activeProject.repoUrl ? (
                      <a
                        href={activeProject.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-on-surface-variant hover:text-primary flex items-center gap-1 text-xs font-bold transition-colors"
                      >
                        <Icon name="code" className="text-sm" />
                        View Repository
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="text-on-surface-variant/40 flex cursor-not-allowed items-center gap-1 text-xs font-bold"
                      >
                        <Icon name="code" className="text-sm" />
                        Repository link coming soon
                      </span>
                    )}
                  </div>
                </div>
              </section>
            ) : null}

            {challenges.length > 0 ? (
              <section className="bg-error-container/30 border-error/10 rounded-xl border p-6">
                <div className="text-error mb-4 flex items-center gap-2">
                  <Icon name="warning" />
                  <h2 className="text-lg font-bold">Current Targets</h2>
                </div>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-error/20 text-on-surface-variant border-b text-left text-xs font-bold uppercase">
                      <th className="py-2 pr-2 font-bold">Issue</th>
                      <th className="py-2 pr-2 font-bold">Description</th>
                      <th className="py-2 font-bold">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {challenges.map((challenge) => (
                      <tr
                        key={challenge.ticket}
                        className={`border-error/10 border-b border-l-4 align-top last:border-b-0 ${SEVERITY_BORDER[challenge.priority]}`}
                      >
                        <td className="text-on-surface py-2 pr-2 pl-2 font-medium">
                          {challenge.title}
                        </td>
                        <td className="text-on-surface-variant py-2 pr-2 text-xs">
                          {challenge.note ?? "—"}
                        </td>
                        <td
                          className={`py-2 text-xs font-bold uppercase ${SEVERITY_TEXT[challenge.priority]}`}
                        >
                          {SEVERITY_LABEL[challenge.priority]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ) : null}

            {currentBuild.body ? (
              <div className="max-w-prose">
                <MDXContent code={currentBuild.body} />
              </div>
            ) : null}
          </div>

          {/* Right column: recent progress & learning. */}
          <div className="flex flex-col gap-6 md:col-span-4">
            {recentProgress.length > 0 ? (
              <section className="bg-surface-container-low border-outline-variant/10 rounded-xl border p-8">
                <h2 className="font-display text-on-surface mb-6 text-xl font-bold">
                  Recent Progress
                </h2>
                <div className="flex flex-col">
                  {recentProgress.map((entry, index) => (
                    <div key={index} className="group relative flex gap-4 pb-8 last:pb-0">
                      {index < recentProgress.length - 1 ? (
                        <div className="bg-primary/25 absolute top-8 bottom-0 left-4 w-px" />
                      ) : null}
                      <div className="bg-primary-fixed text-primary z-10 flex size-8 shrink-0 items-center justify-center rounded-full">
                        <Icon name="check_circle" filled className="text-[20px]" />
                      </div>
                      <div className="flex-1 pt-0.5">
                        <h3 className="group-hover:text-primary text-on-surface font-bold transition-colors">
                          {entry.title}
                        </h3>
                        <p className="text-on-surface-variant text-sm">
                          {formatDate(entry.date)}
                          {entry.tags.length > 0 ? ` · ${entry.tags.join(", ")}` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {learningProgress.length > 0 ? (
              <section className="bg-secondary-container rounded-xl p-6">
                <div className="text-on-secondary-container mb-4 flex items-center gap-2">
                  <Icon name="school" />
                  <h2 className="text-lg font-bold">Currently Learning</h2>
                </div>
                <div className="flex flex-col gap-4">
                  {learningProgress.map((topic, index) => (
                    <div key={topic.topic} className="flex items-center gap-3">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded bg-white/50">
                        <Icon
                          name={LEARNING_ICONS[index % LEARNING_ICONS.length] ?? "psychology"}
                          className="text-secondary"
                        />
                      </div>
                      <div>
                        <div className="text-on-surface text-sm font-bold">{topic.topic}</div>
                        <div className="text-on-secondary-container/80 text-xs">{topic.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </Section>
    </div>
  );
}
