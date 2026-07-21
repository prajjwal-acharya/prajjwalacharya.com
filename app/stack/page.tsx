import type { Metadata } from "next";
import { EmptyState } from "@/components/content/empty-state";
import { SectionHeader } from "@/components/content/section-header";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/lib/config";
import { getStack } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const stack = getStack();
  return buildMetadata({
    title: stack?.title ?? "Stack",
    description: stack?.description,
    path: "/stack",
    image: stack?.heroImage?.src,
  });
}

export default function StackPage() {
  const stack = getStack();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Stack", url: `${siteConfig.url}/stack` },
  ]);

  if (!stack) {
    return (
      <Section width="prose">
        <JsonLd data={breadcrumb} />
        <SectionHeader as="h1" eyebrow="Stack" title="Stack" />
        <EmptyState
          title="Nothing here yet"
          description="Development environment and tools will show up here."
          className="mt-12"
        />
      </Section>
    );
  }

  const largeTool = stack.tools.find((tool) => tool.size === "large");
  const compactTools = stack.tools.filter((tool) => tool.size !== "large");

  return (
    <div className="drafting-grid relative">
      <Section width="wide">
        <JsonLd data={breadcrumb} />

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <div className="bg-tertiary-fixed text-on-tertiary-fixed inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-wider">
              <Icon name="inventory" className="text-sm" />
              Workshop Inventory
            </div>
            <h1 className="font-display text-on-surface text-5xl font-medium md:text-6xl">
              {stack.title === "Stack" ? "A Curated Tool Stack." : stack.title}
            </h1>
            {stack.description ? (
              <p className="font-body text-on-surface-variant max-w-2xl text-lg leading-relaxed">
                {stack.description}
              </p>
            ) : null}
          </div>
          {siteConfig.dotfilesUrl ? (
            <a
              href={siteConfig.dotfilesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-outline-variant bg-surface-container-lowest text-on-surface hover:border-primary hover:text-primary flex w-fit shrink-0 items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-bold transition-colors"
            >
              <Icon name="code" className="text-base" />
              Grab the dotfiles
            </a>
          ) : null}
        </div>

        {largeTool || stack.principles.length > 0 || compactTools.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {largeTool ? (
              <div className="border-outline-variant/20 bg-surface-container flex flex-col gap-6 rounded-xl border p-8 lg:col-span-8">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-lg">
                    <Icon name={largeTool.icon ?? "terminal"} className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{largeTool.name}</h3>
                    {largeTool.tagline ? (
                      <p className="text-on-surface-variant text-sm">{largeTool.tagline}</p>
                    ) : null}
                  </div>
                </div>
                <div className="grid gap-6 pt-4 md:grid-cols-3">
                  <div>
                    <p className="text-primary mb-1 text-xs font-bold uppercase">What it is</p>
                    <p className="text-on-surface-variant text-sm">{largeTool.whatItIs}</p>
                  </div>
                  <div>
                    <p className="text-primary mb-1 text-xs font-bold uppercase">Why I use it</p>
                    <p className="text-on-surface-variant text-sm">{largeTool.why}</p>
                  </div>
                  <div>
                    <p className="text-primary mb-1 text-xs font-bold uppercase">Irreplaceable</p>
                    <p className="text-on-surface-variant text-sm">{largeTool.irreplaceable}</p>
                  </div>
                </div>
              </div>
            ) : null}

            {stack.principles.length > 0 ? (
              <div className="border-outline-variant/20 bg-surface-container-high rounded-xl border p-8 lg:col-span-4">
                <h3 className="font-display mb-4 text-xl font-semibold">Workspace Principles</h3>
                <ul className="text-on-surface-variant flex flex-col gap-2 text-sm">
                  {stack.principles.map((principle) => (
                    <li key={principle} className="flex items-center gap-2">
                      <span className="bg-primary size-1.5 shrink-0 rounded-full" />
                      {principle}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {compactTools.map((tool) => (
              <div
                key={tool.name}
                className="border-outline-variant/20 bg-surface-container flex flex-col gap-3 rounded-xl border p-6 md:col-span-6 lg:col-span-4"
              >
                <h4 className="text-primary font-bold">{tool.name}</h4>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  <span className="font-bold">What:</span> {tool.whatItIs}
                  <br />
                  <span className="font-bold">Why:</span> {tool.why}
                  <br />
                  <span className="font-bold">Irreplaceable:</span> {tool.irreplaceable}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {stack.categories.length > 0 ? (
          <div className="mt-16 flex flex-col gap-8">
            <h2 className="font-display text-2xl font-semibold">Technology Inventory</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stack.categories.map((category) => (
                <div key={category.category} className="flex flex-col gap-3">
                  <p className="text-tertiary text-xs font-bold tracking-widest uppercase">
                    {category.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="bg-surface-container-high text-on-surface-variant rounded-full px-3 py-1 text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Section>
    </div>
  );
}
