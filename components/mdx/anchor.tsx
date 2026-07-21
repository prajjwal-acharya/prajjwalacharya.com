import type { ComponentProps } from "react";
import { ExternalLink } from "@/components/ui/external-link";
import { Link } from "@/components/ui/link";

const ABSOLUTE_URL = /^https?:\/\//;

/**
 * Dispatches markdown `[text](url)` links — absolute `http(s)` URLs get
 * `ExternalLink`'s new-tab affordance automatically, so content authors
 * never have to remember a special syntax for outbound links.
 */
export function A({ href = "", children, ...props }: ComponentProps<"a">) {
  if (ABSOLUTE_URL.test(href)) {
    return (
      <ExternalLink href={href} {...props}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
