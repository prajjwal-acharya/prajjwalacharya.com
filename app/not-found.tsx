import NextLink from "next/link";
import { SectionHeader } from "@/components/content/section-header";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

/** Required Next.js convention file — this is the actual 404 page, styled like the rest of the site rather than left as boilerplate. */
export default function NotFound() {
  return (
    <Section width="prose">
      <div className="flex flex-col gap-8">
        <SectionHeader
          as="h1"
          eyebrow="404"
          title="Page not found"
          description="There's nothing at this address — the page may have moved, or never existed."
        />
        <div>
          <Button asChild>
            <NextLink href="/">Back to home</NextLink>
          </Button>
        </div>
      </div>
    </Section>
  );
}
