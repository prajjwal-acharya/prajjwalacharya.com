import NextLink from "next/link";
import { RotatingRole } from "@/components/home/rotating-role";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

/** The homepage's "01. Hero" left column (home.md) — the page's own `<h1>` equivalent, no separate `EntryHeader`. */
export function Hero() {
  return (
    <div className="w-full space-y-6 md:w-[70%]">
      <h1 className="text-on-surface font-display text-5xl leading-[1.1] font-bold tracking-tight md:text-7xl">
        {siteConfig.name}
      </h1>
      <p className="text-primary font-display max-w-3xl text-2xl leading-snug md:text-3xl">
        Building <RotatingRole />
      </p>
      <p className="font-body text-on-surface-variant max-w-2xl text-lg leading-relaxed">
        {siteConfig.tagline}
      </p>
      <div className="flex flex-wrap gap-4 pt-4">
        <Button asChild size="lg">
          <NextLink href="/systems">Explore Systems</NextLink>
        </Button>
        <Button asChild variant="outline" size="lg">
          <NextLink href="/current-build">Current Build →</NextLink>
        </Button>
      </div>
    </div>
  );
}
