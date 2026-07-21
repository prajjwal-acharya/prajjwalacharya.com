import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type DividerProps = {
  className?: string;
};

/** Section-level break: a `Separator` plus the vertical rhythm that marks a real content boundary. */
export function Divider({ className }: DividerProps) {
  return (
    <div className={cn("py-8 md:py-12", className)}>
      <Separator />
    </div>
  );
}
