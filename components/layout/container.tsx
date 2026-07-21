import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-6 md:px-8", {
  variants: {
    /** `prose` = entry template (~720px, tuned for reading), `wide` = listing template (~1100px). ARCHITECTURE.md §4. */
    width: {
      prose: "max-w-[45rem]",
      wide: "max-w-[68.75rem]",
    },
  },
  defaultVariants: {
    width: "wide",
  },
});

type ContainerProps = ComponentProps<"div"> & VariantProps<typeof containerVariants>;

export function Container({ className, width, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ width }), className)} {...props} />;
}
