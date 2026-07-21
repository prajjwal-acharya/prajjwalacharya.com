"use client";

import { Check, Copy, WrapText } from "lucide-react";
import { useRef, useState, type ComponentProps } from "react";
import { InlineCode } from "@/components/mdx/inline-code";
import { cn } from "@/lib/utils";

/**
 * Overrides MDX's `pre` element — this is what rehype-pretty-code's
 * output (`<pre data-language data-theme>...`) actually renders through
 * (verified empirically against the installed version, not assumed from
 * docs). Adds the chrome rehype-pretty-code itself doesn't: a hover-
 * revealed language label, word-wrap toggle, and copy button. Filename
 * (when a code fence has `title="..."`) renders via rehype-pretty-code's
 * own `<figcaption data-rehype-pretty-code-title>` sibling, styled in
 * `app/globals.css` rather than reimplemented here.
 */
type PreProps = ComponentProps<"pre"> & { "data-language"?: string };

export function Pre({ children, className, ...props }: PreProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [wrap, setWrap] = useState(false);
  const [copied, setCopied] = useState(false);
  const language = props["data-language"];

  async function handleCopy() {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group/code relative">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1 opacity-0 transition-opacity group-focus-within/code:opacity-100 group-hover/code:opacity-100">
        {language ? (
          <span className="font-body text-on-surface-variant px-1.5 py-1 text-xs font-bold uppercase">
            {language}
          </span>
        ) : null}
        <button
          type="button"
          onClick={() => setWrap((value) => !value)}
          aria-pressed={wrap}
          aria-label={wrap ? "Disable word wrap" : "Enable word wrap"}
          className="border-outline-variant bg-surface-container-low text-on-surface-variant hover:text-primary inline-flex size-7 items-center justify-center rounded-md border transition-colors"
        >
          <WrapText aria-hidden="true" className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="border-outline-variant bg-surface-container-low text-on-surface-variant hover:text-primary inline-flex size-7 items-center justify-center rounded-md border transition-colors"
        >
          {copied ? (
            <Check aria-hidden="true" className="size-3.5" />
          ) : (
            <Copy aria-hidden="true" className="size-3.5" />
          )}
        </button>
      </div>
      <pre
        ref={preRef}
        data-wrap={wrap ? "" : undefined}
        className={cn(
          "overflow-x-auto p-4 text-sm leading-relaxed",
          "data-[wrap]:overflow-x-hidden data-[wrap]:break-words data-[wrap]:whitespace-pre-wrap",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

/**
 * Dispatches `code` to `InlineCode` or lets a rehype-pretty-code block
 * pass through untouched — block code already carries its own Shiki
 * inline colors, and `data-theme` (present only on block code, verified
 * empirically) is what tells the two apart.
 */
export function Code(props: ComponentProps<"code">) {
  const isBlockCode = "data-theme" in props;
  if (isBlockCode) return <code {...props} />;
  return <InlineCode {...props} />;
}
