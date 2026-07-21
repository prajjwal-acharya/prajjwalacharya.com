import NextLink from "next/link";
import { Icon } from "@/components/ui/icon";
import { getSystems } from "@/lib/content";

/** Home's merged "04. Featured Work" section — the featured System card. */
export function FeaturedSystem() {
  const [system] = getSystems();
  if (!system) return null;

  return (
    <div className="bg-surface flex flex-col overflow-hidden rounded-xl shadow-sm lg:flex-row">
      <div className="from-primary-container to-primary relative flex min-h-[320px] items-center justify-center bg-gradient-to-br lg:w-1/2">
        <Icon name="hub" filled className="text-on-primary/30 text-8xl" />
      </div>
      <div className="flex flex-col justify-center p-8 lg:w-1/2 lg:p-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="bg-tertiary-container/30 text-tertiary rounded-full px-3 py-1 font-mono text-[11px] font-bold tracking-wider uppercase">
            {system.id}
          </span>
          <span className="text-primary flex items-center gap-1 font-mono text-[11px] tracking-widest uppercase">
            <span className="bg-primary size-1.5 animate-pulse rounded-full" />
            Active Build
          </span>
        </div>
        <h3 className="text-on-surface font-display mb-6 text-4xl font-bold">{system.title}</h3>
        <p className="text-on-surface-variant mb-8 text-lg leading-relaxed">{system.summary}</p>
        {system.techStack.length > 0 ? (
          <div className="mb-10 flex flex-wrap gap-2">
            {system.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-surface-container border-outline-variant/30 text-on-surface-variant rounded border px-3 py-1 font-mono text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-4">
          <NextLink
            href={`/systems/${system.slug}`}
            className="bg-primary text-on-primary flex items-center gap-2 rounded-lg px-6 py-3 font-bold transition-all hover:opacity-90"
          >
            <Icon name="menu_book" className="text-[20px]" />
            Read Architecture
          </NextLink>
          {system.links.length > 0 ? (
            <a
              href={system.links[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-outline-variant text-on-surface-variant hover:bg-surface-variant/30 flex items-center gap-2 rounded-lg border px-6 py-3 font-bold transition-all"
            >
              <Icon name="code" className="text-[20px]" />
              View Repository
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
