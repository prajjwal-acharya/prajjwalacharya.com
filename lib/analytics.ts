/**
 * Analytics provider resolution — reads entirely from environment
 * variables. No tracking ID is ever hardcoded in the repo, and the site
 * ships with analytics off by default: `NEXT_PUBLIC_ANALYTICS_PROVIDER`
 * has to be explicitly set to opt into one of Plausible, Google
 * Analytics, or Cloudflare Web Analytics. See `.env.example`.
 *
 * These are `NEXT_PUBLIC_*` on purpose — this is a fully static site
 * (no server at request time), so the choice of provider and its ID are
 * baked in at build time either way; there's no runtime secret to keep
 * server-only.
 */
export type AnalyticsConfig =
  | { provider: "none" }
  | { provider: "plausible"; domain: string; scriptSrc: string }
  | { provider: "google"; measurementId: string }
  | { provider: "cloudflare"; beaconToken: string };

export function getAnalyticsConfig(): AnalyticsConfig {
  switch (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER) {
    case "plausible": {
      const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
      if (!domain) return { provider: "none" };
      return {
        provider: "plausible",
        domain,
        scriptSrc:
          process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC ?? "https://plausible.io/js/script.js",
      };
    }
    case "google": {
      const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
      if (!measurementId) return { provider: "none" };
      return { provider: "google", measurementId };
    }
    case "cloudflare": {
      const beaconToken = process.env.NEXT_PUBLIC_CLOUDFLARE_BEACON_TOKEN;
      if (!beaconToken) return { provider: "none" };
      return { provider: "cloudflare", beaconToken };
    }
    default:
      return { provider: "none" };
  }
}
