"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { navItems } from "@/lib/config";
import { cn } from "@/lib/utils";

/**
 * Floating, glass-morphed desktop sidebar. Collapsed to a slim icon-only
 * rail by default (always visible, not hidden off-screen); hovering (or
 * keyboard-focusing into) it expands the rail to show labels alongside the
 * icons, collapsing again once the pointer/focus leaves. Links blur
 * themselves on click so a mouse click doesn't leave the rail pinned open
 * via `:focus-within` after a same-layout client-side navigation. No
 * branding/version/status footer — just the page list, per the redesign
 * brief.
 */
export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="group fixed top-1/2 left-3 z-40 hidden -translate-y-1/2 lg:block">
      <nav
        aria-label="Primary"
        className={cn(
          // `bg-surface` is the exact same hex as the page's own
          // `bg-background` (Terra's tokens), so it renders invisible here —
          // `surface-container-lowest` (pure white) is what actually shows
          // contrast against the page, matching the other floating cards
          // (e.g. the "Currently Building" journal card) on the site.
          "bg-surface-container-lowest/90 border-outline-variant/30 flex w-14 flex-col gap-1 overflow-hidden rounded-2xl border p-3 shadow-xl backdrop-blur-xl transition-[width] duration-300 ease-out",
          "group-focus-within:w-56 group-hover:w-56",
        )}
      >
        {navItems.map((item) => {
          const active =
            pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
          return (
            <NextLink
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={(event) => event.currentTarget.blur()}
              className={cn(
                "group/link flex w-full items-center gap-3 transition-colors duration-300",
                active ? "font-bold" : "",
              )}
            >
              {/* Fixed 32x32 box exactly matching the collapsed rail's inner
                  content width (56px rail - 24px padding) — the highlight
                  background lives here, not on the full-width row, so it's
                  always a square, never a pill stretched by the row's
                  vertical padding. It stays put as the anchor point when the
                  rail expands and the label reveals to its right. */}
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300",
                  active
                    ? "bg-primary-container text-on-primary-container"
                    : "text-on-surface-variant group-hover/link:bg-surface-container-high group-hover/link:text-on-surface",
                )}
              >
                <Icon name={item.icon} filled={active} className="text-2xl" />
              </span>
              <span
                className={cn(
                  "font-body min-w-0 flex-1 truncate whitespace-nowrap opacity-0 transition-opacity duration-200",
                  active ? "text-on-surface" : "text-on-surface-variant",
                  "group-focus-within:opacity-100 group-hover:opacity-100",
                )}
              >
                {item.label}
              </span>
            </NextLink>
          );
        })}
      </nav>
    </aside>
  );
}
