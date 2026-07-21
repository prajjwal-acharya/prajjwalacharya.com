import { SocialLinks } from "@/components/ui/social-links";

/** Footer bar — sits inside <main> so it shifts with the sidebar on lg+. */
export function Footer() {
  return (
    <footer className="border-outline-variant/20 flex w-full flex-col items-center justify-center gap-3 border-t px-6 py-[2.4rem]">
      <p className="text-on-surface-variant font-body text-sm">© Prajjwal.</p>
      <SocialLinks />
    </footer>
  );
}
