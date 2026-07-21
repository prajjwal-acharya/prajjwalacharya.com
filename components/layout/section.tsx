import type { ComponentProps } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type SectionProps = ComponentProps<"section"> & {
  width?: "prose" | "wide";
  containerClassName?: string;
};

/** Vertical rhythm block — ~64px mobile / 96px tablet / 128px desktop between major sections (ARCHITECTURE.md §7), horizontally constrained via `Container`. */
export function Section({
  className,
  width = "wide",
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 md:py-24 lg:py-32", className)} {...props}>
      <Container width={width} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
