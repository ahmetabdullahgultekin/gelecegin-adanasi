import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { projects as projectSlugs } from "@/data/projects";

/**
 * Bilingual sitemap. Under next-intl's `localePrefix: "as-needed"` routing,
 * Turkish (the default/canonical) stays at the bare path (`/`, `/projeler/...`)
 * and English is served at the `/en/...` prefix. Each entry's canonical `url`
 * is the Turkish URL, paired via `alternates.languages` with the English twin —
 * giving every language a distinct, server-rendered, crawlable URL.
 */
async function entry(
  href: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
): Promise<MetadataRoute.Sitemap[number]> {
  const trUrl = `${SITE_URL}${await getPathname({ locale: "tr", href })}`;
  const enUrl = `${SITE_URL}${await getPathname({ locale: "en", href })}`;
  return {
    url: trUrl,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        "tr-TR": trUrl,
        "en-US": enUrl,
        "x-default": trUrl,
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Touch `routing` so the dependency between the sitemap and the locale config
  // is explicit (the alternates are derived from `routing.localePrefix`).
  void routing;

  const core = await Promise.all([
    entry("/", 1.0),
    entry("/projeler", 0.9),
    entry("/harita", 0.8),
    entry("/hakkinda", 0.7),
  ]);

  const detail = await Promise.all(
    projectSlugs.map((p) => entry(`/projeler/${p.slug}`, 0.6))
  );

  return [...core, ...detail];
}
