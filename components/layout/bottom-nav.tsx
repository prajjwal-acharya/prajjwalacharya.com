"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { navItems } from "@/lib/config";
import { cn } from "@/lib/utils";

/** Fixed bottom tab bar — the primary nav surface below the lg breakpoint. */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="bg-surface fixed bottom-0 left-0 z-50 flex w-full items-center justify-around px-3 py-3 shadow-[0_-4px_20px_rgba(46,50,48,0.06)] lg:hidden"
    >
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <NextLink
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg px-1.5 py-1.5 transition-all duration-300",
              active
                ? "bg-primary-container text-on-primary-container font-bold"
                : "text-on-surface-variant",
            )}
          >
            <Icon name={item.icon} filled={active} />
            <span className="font-label truncate text-[10px]">{item.shortLabel}</span>
          </NextLink>
        );
      })}
    </nav>
  );
}
