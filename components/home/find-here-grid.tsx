import NextLink from "next/link";
import { Icon } from "@/components/ui/icon";

const CARDS = [
  {
    href: "/systems",
    icon: "account_tree",
    title: "Systems",
    description:
      "Deep dives into end-to-end architectures, deployment strategies, and technical specifications of my core projects.",
    linkLabel: "View Systems",
  },
  {
    href: "/blueprints",
    icon: "architecture",
    title: "Blueprints",
    description:
      "Essays and technical write-ups focusing on specific problems, design patterns, and engineering insights.",
    linkLabel: "Read Archive",
  },
  {
    href: "/current-build",
    icon: "construction",
    title: "Current Build",
    description:
      "Real-time updates, log entries, and current roadblocks for the project I'm currently hacking on.",
    linkLabel: "Follow Progress",
  },
  {
    href: "/philosophy",
    icon: "psychology",
    title: "Philosophy",
    description:
      "The principles and mental models that guide my engineering decisions and life as a builder.",
    linkLabel: "Explore Values",
  },
] as const;

/** Home's "03. What You'll Find Here" section (home.md) — a static 4-card index of the site's own routes. */
export function FindHereGrid() {
  return (
    <section className="drafting-grid px-8 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-on-surface font-display mb-12 text-3xl font-bold">
          What You&apos;ll Find Here
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <div
              key={card.href}
              className="glass-green group rounded-xl p-8 transition-colors duration-300"
            >
              <Icon
                name={card.icon}
                className="text-primary mb-6 text-4xl transition-transform group-hover:scale-110"
              />
              <h4 className="font-display mb-3 text-xl font-bold">{card.title}</h4>
              <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
                {card.description}
              </p>
              <NextLink
                href={card.href}
                className="group/link text-primary flex items-center gap-1 text-sm font-bold"
              >
                {card.linkLabel}
                <Icon
                  name="arrow_forward"
                  className="text-sm transition-transform group-hover/link:translate-x-1"
                />
              </NextLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
