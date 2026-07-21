import type { ReactNode } from "react";
import { Image } from "@/components/mdx/image";
import { cn } from "@/lib/utils";

type FigureProps = {
  src: string;
  alt: string;
  caption?: ReactNode;
  width?: number;
  height?: number;
  className?: string;
};

/** Explicit image-with-caption for MDX authors (`<Figure src=… alt=… caption=…/>`) — distinct from a bare markdown `![]()`, which renders via `Image` alone. */
export function Figure({ src, alt, caption, width, height, className }: FigureProps) {
  return (
    <figure className={cn("flex flex-col gap-2", className)}>
      <Image src={src} alt={alt} width={width} height={height} />
      {caption ? (
        <figcaption className="font-body text-on-surface-variant text-xs">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
