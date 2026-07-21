import Script from "next/script";
import { getAnalyticsConfig } from "@/lib/analytics";

/**
 * Renders at most one third-party analytics script, chosen entirely by
 * `getAnalyticsConfig()` (environment variables — never hardcoded IDs).
 * Off by default: with no provider configured, this renders nothing and
 * ships zero extra JS. Server Component — `next/script` handles its own
 * client-side loading strategy without the parent needing to be one.
 */
export function Analytics() {
  const config = getAnalyticsConfig();

  switch (config.provider) {
    case "plausible":
      return (
        <Script
          defer
          data-domain={config.domain}
          src={config.scriptSrc}
          strategy="afterInteractive"
        />
      );
    case "google":
      return (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${config.measurementId}');`}
          </Script>
        </>
      );
    case "cloudflare":
      return (
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: config.beaconToken })}
          strategy="afterInteractive"
        />
      );
    default:
      return null;
  }
}
