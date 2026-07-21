import NextLink from "next/link";
import { EmptyState } from "@/components/content/empty-state";
import { Icon } from "@/components/ui/icon";
import { getCurrentBuild } from "@/lib/content";

/** The homepage's "01. Hero" right column — the Current Focus card (home.md). */
export function CurrentFocus() {
  const currentBuild = getCurrentBuild();
  const title = currentBuild?.activeProject?.name ?? currentBuild?.building[0];
  const focus = currentBuild?.activeProject?.summary;
  const learning = currentBuild?.learning ?? [];

  if (!currentBuild || !title) {
    return (
      <div className="bg-surface-container w-full rounded-xl p-8 md:w-[30%]">
        <EmptyState
          title="Nothing here yet"
          description="A snapshot of current work will show up here."
        />
      </div>
    );
  }

  return (
    <NextLink
      href="/current-build"
      className="glass-green relative w-full space-y-6 overflow-hidden rounded-xl p-8 transition-colors duration-300 md:w-[30%]"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Icon name="target" className="text-6xl" />
      </div>
      <h3 className="border-outline-variant/30 font-display border-b pb-4 text-xl font-bold">
        Current Focus
      </h3>
      <div className="space-y-4">
        <div>
          <p className="text-tertiary mb-1 font-mono text-[10px] tracking-widest uppercase">
            Building
          </p>
          <p className="text-on-surface font-bold">{title}</p>
        </div>
        {focus ? (
          <div>
            <p className="text-tertiary mb-1 font-mono text-[10px] tracking-widest uppercase">
              Focus
            </p>
            <p className="text-on-surface-variant leading-relaxed">{focus}</p>
          </div>
        ) : null}
        {learning.length > 0 ? (
          <div>
            <p className="text-tertiary mb-1 font-mono text-[10px] tracking-widest uppercase">
              Learning
            </p>
            <div className="mt-1 flex flex-wrap gap-1">
              {learning.map((topic) => (
                <span
                  key={topic}
                  className="bg-surface-variant text-on-surface-variant rounded px-2 py-0.5 text-[11px]"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </NextLink>
  );
}
