import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

type ExternalLinkProps = ComponentProps<typeof Link>;

/** `Link`, but for URLs that leave the site — new tab, safe rel, and a visible + accessible affordance that it does. */
export function ExternalLink({ className, children, ...props }: ExternalLinkProps) {
  return (
    <Link
      className={cn("inline-flex items-center gap-1", className)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
      <ExternalLinkIcon aria-hidden="true" className="size-3.5 shrink-0" />
      <span className="sr-only">(opens in a new tab)</span>
    </Link>
  );
}
