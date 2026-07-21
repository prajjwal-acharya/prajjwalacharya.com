"use client";

import { useEffect } from "react";
import NextLink from "next/link";
import { SectionHeader } from "@/components/content/section-header";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Handles errors thrown within a route segment — rendered inside the
 * existing root layout (Navbar/Footer still show). Must be a Client
 * Component (Next.js requirement for error boundaries).
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // No error-reporting service wired up (out of scope this phase) —
    // logging is the honest minimum rather than silently swallowing it.
    console.error(error);
  }, [error]);

  return (
    <Section width="prose">
      <div className="flex flex-col gap-8">
        <SectionHeader
          as="h1"
          eyebrow="Error"
          title="Something went wrong"
          description="An unexpected error occurred. You can try again, or head back to the homepage."
        />
        <div className="flex flex-wrap gap-4">
          <Button type="button" onClick={() => reset()}>
            Try again
          </Button>
          <Button asChild variant="ghost">
            <NextLink href="/">Back to home</NextLink>
          </Button>
        </div>
      </div>
    </Section>
  );
}
