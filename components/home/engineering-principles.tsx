import NextLink from "next/link";
import { Icon } from "@/components/ui/icon";

const PRINCIPLES = [
  {
    n: "01",
    title: "Clarity over cleverness",
    description:
      "Simple code is easier to debug, maintain, and reason about. If it requires a 5-minute explanation, it's too clever.",
  },
  {
    n: "02",
    title: "Maintainability is a feature",
    description:
      "Design for the person who has to fix your code at 3 AM. Often, that person is you six months from now.",
  },
  {
    n: "03",
    title: "Document decisions, not just results",
    description:
      "Knowing why a choice was made is often more valuable than the implementation itself.",
  },
  {
    n: "04",
    title: "Question abstractions",
    description:
      "Every layer of abstraction has a cost. Ensure the benefit outweighs the cognitive load and performance overhead.",
  },
  {
    n: "05",
    title: "Ship, measure, refine",
    description:
      "Software is never finished. Get it into production, gather data, and iterate based on reality, not assumptions.",
  },
] as const;

/**
 * Home's merged "06. Engineering Principles" + "Building in Public"
 * section — a fixed list of five named principles followed by the build-
 * in-public statement, sharing one band instead of two. Distinct from the
 * full essay on `/philosophy` (untouched; this only links there).
 */
export function EngineeringPrinciples() {
  return (
    <section className="bg-surface-container-low border-outline-variant/10 border-y px-8 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h2 className="text-on-surface font-display text-3xl font-bold">
            Engineering Principles
          </h2>
        </div>
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          <div className="bg-surface flex h-full flex-col justify-center gap-3 rounded-xl p-8">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.n}
                className="group hover:bg-surface-bright flex items-center gap-4 rounded-lg p-3 transition-colors"
              >
                <span className="text-outline-variant/40 group-hover:text-primary/40 font-display text-2xl font-bold transition-colors">
                  {principle.n}
                </span>
                <h4 className="text-on-surface text-lg font-bold">{principle.title}</h4>
              </div>
            ))}
          </div>

          <div className="glass-green flex h-full flex-col justify-center gap-6 rounded-xl p-10">
            <h3 className="font-display text-2xl font-bold">Building publicly.</h3>
            <p className="font-body text-on-surface-variant leading-relaxed">
              Most technical portfolios only show the finished, polished product. I believe
              there&apos;s immense value in documenting the unfinished, the failed experiments, and
              the messy mid-journey transitions — it holds me accountable to architectural rigor and
              gives back to the community that taught me everything I know.
            </p>
            <NextLink
              href="/philosophy"
              className="bg-secondary text-on-secondary inline-flex w-fit items-center gap-2 rounded-lg px-8 py-3 font-bold transition-all hover:opacity-90"
            >
              Read Philosophy <Icon name="arrow_forward" />
            </NextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
