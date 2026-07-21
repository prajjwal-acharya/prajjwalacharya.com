import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/lib/config";

const LINKS = [
  { label: "GitHub", href: siteConfig.socials.github, icon: "code", external: true },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: "link", external: true },
  {
    label: "Twitter / X",
    href: siteConfig.socials.twitter,
    icon: "alternate_email",
    external: true,
  },
  {
    label: "Product Hunt",
    href: siteConfig.socials.productHunt,
    icon: "rocket_launch",
    external: true,
  },
  {
    label: "Email",
    href: siteConfig.socials.email ? `mailto:${siteConfig.socials.email}` : "",
    icon: "mail",
  },
];

/** Home's "09. Contact" section (home.md) — five circular icon buttons, generic Material Symbols rather than brand marks. */
export function ContactSection() {
  return (
    <section className="drafting-grid border-outline-variant/10 border-t px-8 py-24">
      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-12 flex flex-col items-center gap-4">
          <h2 className="text-on-surface font-display text-3xl font-bold">
            Let&apos;s build something meaningful.
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {LINKS.map(({ label, href, icon, external }) =>
            href ? (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center gap-3"
              >
                <span className="bg-surface-container group-hover:bg-primary group-hover:text-on-primary flex size-16 items-center justify-center rounded-full transition-all duration-300">
                  <Icon name={icon} className="text-2xl" />
                </span>
                <span className="text-on-surface-variant group-hover:text-primary font-bold">
                  {label}
                </span>
              </a>
            ) : (
              <span
                key={label}
                aria-disabled="true"
                className="flex cursor-not-allowed flex-col items-center gap-3 opacity-40"
              >
                <span className="bg-surface-container flex size-16 items-center justify-center rounded-full">
                  <Icon name={icon} className="text-2xl" />
                </span>
                <span className="text-on-surface-variant font-bold">{label}</span>
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
