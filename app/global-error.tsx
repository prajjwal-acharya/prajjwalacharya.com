"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Replaces the root layout entirely when an error escapes it — the true
 * last-resort fallback, so this deliberately doesn't import PageShell,
 * fonts, or anything else that could itself be part of what broke.
 * Inline styles rather than Tailwind classes for the same reason: zero
 * dependency on the rest of the app's build output. Colors approximate
 * (not exactly) the workspace dark palette (the site is dark-only, so
 * this fallback stays dark too rather than flashing light); text colors
 * are verified at 4.5:1+ against the background, not just eyeballed. The
 * button's focus state falls back to the browser default (inline styles
 * can't express `:focus-visible`) — an accepted, deliberate tradeoff on
 * this one page, not an oversight.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
          background: "#18120a",
          color: "#eee0d2",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "28rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <p
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#ffd79e",
                margin: 0,
              }}
            >
              Error
            </p>
            <h1 style={{ fontSize: "1.75rem", margin: "0.5rem 0", fontWeight: 600 }}>
              Something went wrong
            </h1>
            <p style={{ color: "#d6c4ad", margin: 0 }}>
              A critical error occurred. Try reloading the page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              alignSelf: "flex-start",
              border: "1px solid #514533",
              borderRadius: "0.25rem",
              padding: "0.5rem 1rem",
              background: "transparent",
              cursor: "pointer",
              fontSize: "0.875rem",
              color: "#eee0d2",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
