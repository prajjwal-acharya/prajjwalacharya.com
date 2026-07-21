import { siteConfig } from "@/lib/config";

/** Home's "02. About" section (home.md) — real bio, not the generic site-structure copy used elsewhere. */
export function AboutSection() {
  return (
    <section className="bg-surface-container-low px-8 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-on-surface font-display mb-10 text-4xl font-bold">
          Engineering with systems in mind.
        </h2>
        <div className="text-on-surface-variant grid gap-12 text-lg leading-relaxed md:grid-cols-2">
          {siteConfig.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
