import { defineRouting } from "next-intl/routing";

/**
 * next-intl routing configuration — the single source of truth for the
 * supported locales and how they appear in the URL.
 *
 * `localePrefix: "as-needed"` keeps Turkish (the default/canonical locale) at
 * the bare path (`/`, `/projeler/...`) so every existing TR URL — and every one
 * of the 14 stable project slugs in the sitemap — is preserved verbatim, while
 * English is served under a distinct, server-rendered `/en/...` prefix. That
 * gives each language its own crawlable URL with automatic hreflang, closing
 * the SEO gap of the previous client-only `?lang=en` toggle.
 */
export const routing = defineRouting({
  // Turkish first = default/canonical; English is the secondary locale.
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
