import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

/** Canonical production origin. Single source of truth for SEO/metadata. */
export const SITE_URL = "https://geleceginadanasi.com.tr";

/** Supported locales, in declaration order (TR is the default / canonical). */
export const LOCALES = routing.locales;
export type SiteLocale = AppLocale;

/**
 * Build `alternates` metadata for a route under next-intl's `[locale]` routing.
 *
 * With `localePrefix: "as-needed"`, Turkish (the default) keeps the bare path
 * (`/`, `/projeler/...`) and English is served under `/en/...`. Each language
 * therefore has its own server-rendered, crawlable URL; we pair them via
 * hreflang (`tr-TR` / `en-US` / `x-default`) and set the canonical to the
 * URL of the *currently rendered* locale.
 *
 * `href` is the locale-agnostic route (begins with "/", use "/" for the home).
 * `currentLocale` is the locale being rendered (drives the `canonical`).
 */
export async function alternatesFor(
  href: string,
  currentLocale: AppLocale
): Promise<NonNullable<Metadata["alternates"]>> {
  const trPath = await getPathname({ locale: "tr", href });
  const enPath = await getPathname({ locale: "en", href });
  const trUrl = `${SITE_URL}${trPath}`;
  const enUrl = `${SITE_URL}${enPath}`;
  const canonicalPath = currentLocale === "en" ? enPath : trPath;

  return {
    canonical: canonicalPath,
    languages: {
      "tr-TR": trUrl,
      "en-US": enUrl,
      // Turkish is the canonical default for crawlers without a language match.
      "x-default": trUrl,
    },
  };
}
