import type { ComponentProps } from "react";

/**
 * lucide-react dropped brand/logo marks (GitHub, LinkedIn, Product Hunt,
 * ...) — verified against the installed version, not assumed. Hand-authored
 * SVGs are cheaper and more honest than pulling in a full brand-icon
 * package for a footer that needs exactly three of them.
 */

export function GithubIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export function ProductHuntIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12S5.65 23.5 12 23.5 23.5 18.35 23.5 12 18.35.5 12 .5Zm1.4 13.1h-3.3V17H7.5V7h5.9a3.3 3.3 0 0 1 0 6.6Zm0-4.2h-3.3v1.8h3.3a.9.9 0 0 0 0-1.8Z" />
    </svg>
  );
}

export function TwitterIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2.25h3.2l-7 8 8.24 11.5h-6.45l-5.05-6.87-5.78 6.87H2.9l7.49-8.56L2.5 2.25h6.61l4.56 6.28 5.23-6.28Zm-1.12 17.6h1.77L7.3 4.05H5.4l12.38 15.8Z" />
    </svg>
  );
}
