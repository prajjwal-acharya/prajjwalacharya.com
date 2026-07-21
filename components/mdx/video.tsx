import { cn } from "@/lib/utils";

type VideoProps = {
  src: string;
  title: string;
  poster?: string;
  className?: string;
};

/** Future-compatible wrapper — no video content exists yet, but the primitive is ready: contained, responsive, never overflows. */
export function Video({ src, title, poster, className }: VideoProps) {
  return (
    <div
      className={cn(
        "border-outline-variant/20 bg-surface-container-low overflow-hidden rounded-xl border",
        className,
      )}
    >
      <video
        controls
        preload="metadata"
        poster={poster}
        title={title}
        className="aspect-video w-full"
      >
        <source src={src} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
