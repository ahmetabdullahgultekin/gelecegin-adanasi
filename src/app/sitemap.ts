import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { projects as projectSlugs } from "@/data/projects";

/**
 * Sitemap with bilingual hreflang alternates. Each route lists its Turkish
 * (canonical) URL plus the English `?lang=en` twin under `alternates.languages`,
 * so Google can surface the right language to the right user and the EN content
 * is no longer invisible to crawlers. Per-project detail pages are included.
 */
function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
): MetadataRoute.Sitemap[number] {
  const clean = path === "/" ? "" : path;
  const trUrl = `${SITE_URL}${clean}`;
  return {
    url: trUrl,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        "tr-TR": trUrl,
        "en-US": `${trUrl}?lang=en`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    entry("/", 1.0),
    entry("/projeler", 0.9),
    entry("/harita", 0.8),
    entry("/hakkinda", 0.7),
  ];

  const detail: MetadataRoute.Sitemap = projectSlugs.map((p) =>
    entry(`/projeler/${p.slug}`, 0.6)
  );

  return [...core, ...detail];
}
