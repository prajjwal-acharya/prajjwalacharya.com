import type { ReactNode } from "react";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import { SideNav } from "@/components/layout/side-nav";

type PageShellProps = {
  children: ReactNode;
};

/**
 * The root chrome every page renders inside: skip link, SideNav (desktop,
 * floating hover-reveal — doesn't occupy layout space), `<main>`, Footer,
 * BottomNav (mobile). Wired into `app/layout.tsx`.
 */
export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <a
        href="#main-content"
        className="focus:border-outline-variant focus:bg-surface focus:text-on-surface sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:border focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <SideNav />
      <div className="flex min-h-screen flex-1 flex-col pb-24 lg:pb-0">
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <BottomNav />
    </>
  );
}
