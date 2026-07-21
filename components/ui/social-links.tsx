import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import {
  GithubIcon,
  LinkedinIcon,
  ProductHuntIcon,
  TwitterIcon,
} from "@/components/ui/brand-icons";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const iconLinkClass =
  "inline-flex size-8 items-center justify-center rounded-sm text-on-surface-variant transition-colors hover:text-primary";
const iconPlaceholderClass =
  "inline-flex size-8 cursor-not-allowed items-center justify-center rounded-sm text-on-surface-variant/40";

type SocialItem = {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
};

type SocialLinksProps = {
  className?: string;
};

/**
 * The footer's social row. `github`/`linkedin`/`email` are real values in
 * `lib/config.ts`; any that are blank render as inert, clearly-labeled
 * placeholders rather than broken links. Email is last by design — it's
 * the "reach me directly" fallback after the public profile links.
 */
export function SocialLinks({ className }: SocialLinksProps) {
  const socials: SocialItem[] = [
    { label: "GitHub", href: siteConfig.socials.github, Icon: GithubIcon, external: true },
    { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedinIcon, external: true },
    { label: "Twitter", href: siteConfig.socials.twitter, Icon: TwitterIcon, external: true },
    {
      label: "Product Hunt",
      href: siteConfig.socials.productHunt,
      Icon: ProductHuntIcon,
      external: true,
    },
    {
      label: "Email",
      href: siteConfig.socials.email ? `mailto:${siteConfig.socials.email}` : "",
      Icon: Mail,
    },
  ];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {socials.map(({ label, href, Icon, external }) =>
        href ? (
          <a
            key={label}
            href={href}
            className={iconLinkClass}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            <Icon aria-hidden="true" className="size-4" />
            <span className="sr-only">{label}</span>
          </a>
        ) : (
          <span key={label} className={iconPlaceholderClass} aria-disabled="true">
            <Icon aria-hidden="true" className="size-4" />
            <span className="sr-only">{label} (coming soon)</span>
          </span>
        ),
      )}
    </div>
  );
}
