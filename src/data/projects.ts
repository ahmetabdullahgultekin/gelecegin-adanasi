import { projectLocations, railLines, type ProjectLocation } from "./stations";

/**
 * Project category — drives accent colour and map grouping. Mirrors the
 * section grouping used on the homepage and projects list.
 */
export type ProjectCategory = "transport" | "tourism" | "digital" | "urban";

/**
 * Structured, machine-readable metadata for each of the 14 proposals. The
 * human-readable title/description/type/cost/authority still live in
 * `src/lib/i18n.ts` (keyed by `i18nKey`) so translations stay in one place;
 * this module adds the data needed for detail pages, charts, the sitemap, and
 * cross-links to the map — none of which should be free-form prose.
 */
export interface ProjectMeta {
  /** URL slug — stable, ASCII, used in `/projeler/[slug]`. */
  slug: string;
  /** Key into `translations.<locale>.projects`. */
  i18nKey: string;
  category: ProjectCategory;
  /** Accent colour (matches the category palette). */
  color: string;
  /**
   * Rough numeric cost estimate in millions USD, for charts/aggregation.
   * `null` = not a fixed-capital figure (PPP / multi-year / programme budget).
   * Mirrors the free-form `cost` string in i18n; keep the two consistent.
   */
  costUsdM: number | null;
  /** IDs of `railLines` this project realises/depends on (for cross-links). */
  railLineIds: string[];
  /**
   * Substrings matched against `projectLocations[].name` to attach the map
   * markers that belong to this project. Case/locale-insensitive contains.
   */
  locationMatchers: string[];
}

export const projects: ProjectMeta[] = [
  // ─── Transport ────────────────────────────────────────────
  {
    slug: "m1-metro-uzatmasi",
    i18nKey: "m1Extension",
    category: "transport",
    color: "var(--cat-transport)",
    costUsdM: 1000,
    railLineIds: ["m1-extension"],
    locationMatchers: ["Otogar", "Kampüs Servisi", "ABTÜ"],
  },
  {
    slug: "ring-tramvay",
    i18nKey: "ringTram",
    category: "transport",
    color: "var(--cat-transport)",
    costUsdM: 300,
    railLineIds: ["ring-tram"],
    locationMatchers: ["Taşköprü", "Yeşil Koridor"],
  },
  {
    slug: "cukurovaray-banliyo",
    i18nKey: "cukurovaRay",
    category: "transport",
    color: "var(--cat-transport)",
    costUsdM: 500,
    railLineIds: ["cukurovaray-ew", "cukurovaray-north"],
    locationMatchers: ["Park Et", "Merkez Gar"],
  },
  {
    slug: "mavi-hat-sahil-ekspresi",
    i18nKey: "blueLineExpress",
    category: "transport",
    color: "var(--cat-transport)",
    costUsdM: 150,
    railLineIds: ["blue-line", "yumurtalik-branch"],
    locationMatchers: ["Karataş", "Akyatan", "Yumurtalık"],
  },
  {
    slug: "akilli-otogar",
    i18nKey: "smartTerminal",
    category: "transport",
    color: "var(--cat-transport)",
    costUsdM: 200,
    railLineIds: ["m1-extension"],
    locationMatchers: ["Akıllı Otogar"],
  },

  // ─── Tourism & agriculture ────────────────────────────────
  {
    slug: "karatas-yumurtalik-turizm",
    i18nKey: "tourism",
    category: "tourism",
    color: "var(--cat-tourism)",
    costUsdM: null,
    railLineIds: ["blue-line", "yumurtalik-branch"],
    locationMatchers: ["Karataş", "Akyatan", "Yumurtalık", "Seyhan Barajı"],
  },
  {
    slug: "agropark",
    i18nKey: "agropark",
    category: "tourism",
    color: "var(--cat-tourism)",
    costUsdM: 400,
    railLineIds: ["cukurovaray-ew", "cukurovaray-north"],
    locationMatchers: ["Agropark", "Tarım", "Narenciye"],
  },

  // ─── Digital ──────────────────────────────────────────────
  {
    slug: "abb-ai-dijital-masa",
    i18nKey: "abbAI",
    category: "digital",
    color: "var(--cat-digital)",
    costUsdM: 5,
    railLineIds: [],
    locationMatchers: ["ABB AI"],
  },
  {
    slug: "adakart",
    i18nKey: "adakart",
    category: "digital",
    color: "var(--cat-digital)",
    costUsdM: 20,
    railLineIds: [],
    locationMatchers: [],
  },
  {
    slug: "teknopark",
    i18nKey: "technopark",
    category: "digital",
    color: "var(--cat-digital)",
    costUsdM: 100,
    railLineIds: [],
    locationMatchers: ["Teknopark"],
  },

  // ─── Urban ────────────────────────────────────────────────
  {
    slug: "su-drenaj-altyapisi",
    i18nKey: "waterInfra",
    category: "urban",
    color: "var(--cat-urban)",
    costUsdM: 300,
    railLineIds: [],
    locationMatchers: ["Drenaj"],
  },
  {
    slug: "yesil-alan-park",
    i18nKey: "greenSpaces",
    category: "urban",
    color: "var(--cat-urban)",
    costUsdM: 50,
    railLineIds: [],
    locationMatchers: ["Yeşil Koridor"],
  },
  {
    slug: "bisiklet-yaya-aglari",
    i18nKey: "bikeNetwork",
    category: "urban",
    color: "var(--cat-urban)",
    costUsdM: 30,
    railLineIds: [],
    locationMatchers: ["Bisiklet"],
  },
  {
    slug: "afet-hazirligi",
    i18nKey: "disasterPrep",
    category: "urban",
    color: "var(--cat-urban)",
    costUsdM: null,
    railLineIds: [],
    locationMatchers: ["Afet"],
  },
];

/** Lookup a project by slug. */
export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug);
}

/** All slugs — for `generateStaticParams`. */
export function allProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

/** Resolve the map markers attached to a project via its matchers. */
export function locationsForProject(meta: ProjectMeta): ProjectLocation[] {
  if (meta.locationMatchers.length === 0) return [];
  return projectLocations.filter((loc) =>
    meta.locationMatchers.some(
      (m) =>
        loc.name.toLocaleLowerCase("tr").includes(m.toLocaleLowerCase("tr")) ||
        loc.nameEn.toLowerCase().includes(m.toLowerCase())
    )
  );
}

/** Resolve the rail lines attached to a project. */
export function railLinesForProject(meta: ProjectMeta) {
  return railLines.filter((l) => meta.railLineIds.includes(l.id));
}

/** Sum of fixed numeric cost estimates (USD millions) across all projects. */
export function totalNumericCostUsdM(): number {
  return projects.reduce((sum, p) => sum + (p.costUsdM ?? 0), 0);
}

/** Numeric cost totals grouped by category (USD millions). */
export function costByCategory(): Record<ProjectCategory, number> {
  const acc: Record<ProjectCategory, number> = {
    transport: 0,
    tourism: 0,
    digital: 0,
    urban: 0,
  };
  for (const p of projects) acc[p.category] += p.costUsdM ?? 0;
  return acc;
}
