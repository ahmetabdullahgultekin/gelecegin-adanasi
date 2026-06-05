import type { Metadata } from "next";

/** Canonical production origin. Single source of truth for SEO/metadata. */
export const SITE_URL = "https://geleceginadanasi.com.tr";

/** Supported locales, in declaration order (TR is the default / canonical). */
export const LOCALES = ["tr", "en"] as const;
export type SiteLocale = (typeof LOCALES)[number];

/**
 * Build `alternates` metadata for a route, pairing the Turkish (canonical)
 * URL with its English `?lang=en` twin via hreflang. This is what makes the
 * client-toggled EN content discoverable and linkable for crawlers.
 *
 * `path` is the route path beginning with "/" (use "/" for the homepage).
 */
export function alternatesFor(path: string): NonNullable<Metadata["alternates"]> {
  const clean = path === "/" ? "" : path;
  const trUrl = `${SITE_URL}${clean}` || SITE_URL;
  const enUrl = `${trUrl}?lang=en`;
  return {
    canonical: path,
    languages: {
      "tr-TR": trUrl || SITE_URL,
      "en-US": enUrl,
      "x-default": trUrl || SITE_URL,
    },
  };
}
