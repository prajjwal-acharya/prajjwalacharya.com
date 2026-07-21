import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { MetaRow } from "@/components/content/meta-row";
import { GithubIcon } from "@/components/ui/brand-icons";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Status } from "@/lib/status";
import { cn, formatDate } from "@/lib/utils";

type HeroImage = {
  src: string;
  width: number;
  height: number;
};

type EntryLink = {
  label: string;
  url: string;
};

type EntryHeaderProps = {
  id?: string;
  title: string;
  status?: Status;
  date?: string;
  readingTime?: number;
  heroImage?: HeroImage;
  links?: EntryLink[];
  className?: string;
};

/** The page's own H1 + metadata row. One per entry/singleton page — never used as a sub-heading. */
export function EntryHeader({
  id,
  title,
  status,
  date,
  readingTime,
  heroImage,
  links,
  className,
}: EntryHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-3">
        {id ? (
          <span className="bg-surface-container-highest text-on-surface-variant w-fit rounded px-2 py-1 text-[10px] font-bold tracking-widest uppercase">
            {id}
          </span>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-on-surface text-4xl font-medium md:text-5xl">{title}</h1>
          {links?.length ? (
            <div className="flex items-center gap-2">
              {links.map((link) => {
                const isGithub = link.label.toLowerCase().includes("github");
                const Icon = isGithub ? GithubIcon : ExternalLinkIcon;
                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary inline-flex size-9 items-center justify-center rounded-full border transition-colors"
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>
        <MetaRow
          items={[
            status ? <StatusBadge key="status" status={status} /> : null,
            date ? (
              <time key="date" dateTime={date}>
                {formatDate(date)}
              </time>
            ) : null,
            readingTime ? <span key="reading-time">{readingTime} min read</span> : null,
          ]}
        />
      </div>
      {heroImage ? (
        // alt="" is deliberate: the title above already announces the page
        // subject in text, so the hero image is decorative/redundant here,
        // not informational — WCAG's guidance for that case is empty alt.
        // fetchPriority="high" + eager loading: this is the largest
        // above-the-fold image on an entry page, i.e. the likely LCP
        // element — lazy-loading it (the `Image`/`Figure` MDX components'
        // default) would work against, not for, load performance here.
        <img
          src={heroImage.src}
          width={heroImage.width}
          height={heroImage.height}
          alt=""
          loading="eager"
          fetchPriority="high"
          className="w-full rounded-xl object-cover"
        />
      ) : null}
    </header>
  );
}
