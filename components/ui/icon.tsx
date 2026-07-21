import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type IconProps = Omit<ComponentProps<"span">, "children"> & {
  /** Material Symbols Outlined ligature name, e.g. "home", "developer_board". */
  name: string;
  /** Renders the filled variant (FILL 1) — used for the active nav item. */
  filled?: boolean;
};

/** Thin wrapper around the Material Symbols Outlined icon font (web.md's icon system). */
export function Icon({ name, filled = false, className, style, ...props }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("material-symbols-outlined", className)}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        ...style,
      }}
      {...props}
    >
      {name}
    </span>
  );
}
