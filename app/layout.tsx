import type { Metadata } from "next";
import { JetBrains_Mono, Literata, Nunito_Sans } from "next/font/google";
import { Analytics } from "@/components/analytics/analytics";
import { JsonLd } from "@/components/seo/json-ld";
import { PageShell } from "@/components/layout/page-shell";
import { siteConfig } from "@/lib/config";
import { personJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import "./globals.css";

const literata = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-literata",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  // `buildMetadata()` spreads first: it sets `title: undefined` when a
  // page doesn't override it (correct for every other page, which relies
  // on inheriting this template), but as a later key in the *same*
  // object literal it would otherwise silently clobber the object below
  // — confirmed as a real bug, not assumed: the homepage rendered with
  // no <title> tag at all, and other pages' titles skipped the "%s · …"
  // template entirely.
  ...buildMetadata({ path: "/" }),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="light" lang="en" suppressHydrationWarning>
      <head>
        {/*
          Icon font used throughout the workspace chrome (Icon component
          wraps this). next/font/google has no icon-font entry, so this is
          the documented App Router pattern for a global font link — the
          `no-page-custom-font` lint rule targets the Pages Router's
          `_document.js` and doesn't apply to a link rendered in the root
          layout's own `<head>`.
        */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${literata.variable} ${nunitoSans.variable} ${jetbrainsMono.variable} bg-background text-on-surface font-body flex min-h-screen flex-col antialiased`}
      >
        <JsonLd data={[websiteJsonLd(), personJsonLd()]} />
        <PageShell>{children}</PageShell>
        <Analytics />
      </body>
    </html>
  );
}
