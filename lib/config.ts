export type NavItem = {
  label: string;
  /** Compact label for the sidebar / bottom nav, where "Current Build" is too long. */
  shortLabel: string;
  href: string;
  /** Material Symbols Outlined ligature name (see components/ui/icon.tsx). */
  icon: string;
};

/**
 * The six locked routes (ARCHITECTURE.md §2), plus Home for the sidebar/
 * bottom nav — those render Home as its own entry, distinct from the
 * workspace logo. Adding a page here means adding a route in `app/` too —
 * this list doesn't grow on its own.
 */
export const navItems: NavItem[] = [
  { label: "Home", shortLabel: "Home", href: "/", icon: "home" },
  { label: "Systems", shortLabel: "Systems", href: "/systems", icon: "account_tree" },
  { label: "Blueprints", shortLabel: "Blueprints", href: "/blueprints", icon: "architecture" },
  { label: "Current Build", shortLabel: "Build", href: "/current-build", icon: "construction" },
  { label: "Philosophy", shortLabel: "Philosophy", href: "/philosophy", icon: "menu_book" },
  { label: "Stack", shortLabel: "Stack", href: "/stack", icon: "layers" },
];

/** Top app bar shows every route except Home (the logo already goes there). */
export const primaryNavItems = navItems.filter((item) => item.href !== "/");

/**
 * `github` / `linkedin` / `email` / `twitter` are intentionally blank —
 * real values weren't provided yet. Fill these in before Phase 1 renders
 * the footer; an empty string here is an honest "not set," not a
 * placeholder to design around.
 */
export const siteConfig = {
  name: "Prajjwal Acharya",
  title: "Prajjwal Acharya",
  description: "Building intelligent infrastructure, backend systems, and developer tools.",
  /** Hero's H2 — professional identity line, distinct from `description` (used for SEO/meta tags) though currently the same copy. */
  role: "Building intelligent infra, backend systems, and dev tools.",
  /**
   * Hero's lead paragraph (home.md's "01. Hero"). Describes the site's own
   * structure — what the visitor will find and how it's published.
   */
  tagline:
    "This website is my engineering notebook. I document systems, experiments, design decisions and lessons while they're still evolving; not after they're finished.",
  /** Home's "02. About" section — two paragraphs, home.md verbatim. */
  bio: [
    "I am a Computer Science student at NIT Rourkela, obsessed with how software moves from a single line of code to a resilient system serving thousands. My primary focus is to explore the intersection of AI orchestration and low-level system performance, trying to bridge the gap between abstract intelligence and it's implementation.",
    'This site serves as a living notebook. Rather than polished portfolios, I prefer sharing the raw sketches of architectures, the "why" behind failed experiments, and the evolving mental models I use to build. It\'s an invitation to see the engineering process as it happens messy, iterative, and deeply grounded in first principles.',
  ],
  url: "https://prajjwalacharya.com",
  /** Linked from the Stack page's heading — the actual dotfiles behind the tools listed there. */
  dotfilesUrl: "https://github.com/prajjwal-acharya/dotfiles",
  socials: {
    github: "https://github.com/prajjwal-acharya",
    linkedin: "https://www.linkedin.com/in/prajjwal-acharya-9a4a26325/",
    email: "contact@prajjwalacharya.com",
    twitter: "https://x.com/acharya1729",
    productHunt: "https://www.producthunt.com/@prajjwal_acharya",
  },
  nav: navItems,
};

export type SiteConfig = typeof siteConfig;
