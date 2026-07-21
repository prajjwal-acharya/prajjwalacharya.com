import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      ".velite/**",
      ".generated/**",
      ".next/**",
      ".open-next/**",
      ".wrangler/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // `next/image` is deliberately unused site-wide (ARCHITECTURE.md
      // §12: Cloudflare Pages/Workers doesn't support its default
      // loader) — this warning would otherwise fire on every `<img>`.
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
