import { describe, expect, it } from "vitest";

import {
  projects,
  allProjectSlugs,
  getProjectBySlug,
  locationsForProject,
  railLinesForProject,
  costByCategory,
  totalNumericCostUsdM,
  type ProjectCategory,
} from "@/data/projects";
import { railLines, projectLocations } from "@/data/stations";
import { projectDetailContent } from "@/lib/project-detail-content";
import { translations, type Locale } from "@/lib/i18n";

/**
 * Data-integrity & i18n-parity suite.
 *
 * CLAUDE.md states the project's load-bearing invariant: the i18n `projects`
 * key, `data/projects.ts` `i18nKey`/`slug`, and `project-detail-content.ts`
 * key "MUST stay in sync". A typo'd or removed key renders `null` silently
 * (see the early-returns in `ProjectCard` / `ProjectDetail`) with no failing
 * signal — exactly the bug class the tech-stack and code-quality reviews
 * (2026-06-05) flagged as the project's biggest unguarded risk.
 *
 * These tests are the automated gate for that invariant. They read the same
 * typed modules the app does, so they fail the build the moment the data
 * drifts. Pure data assertions, no DOM / React rendering required.
 */

const LOCALES: Locale[] = ["tr", "en"];
const CATEGORIES: ProjectCategory[] = ["transport", "tourism", "digital", "urban"];

/** Catalog of structured project i18n keys, derived once. */
const structuredKeys = projects.map((p) => p.i18nKey);
/** Catalog of message-catalog project keys (source of truth for card copy). */
const messageProjectKeys = Object.keys(translations.tr.projects);

describe("projects ⇄ i18n ⇄ detail-content key sync", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every structured project i18nKey exists in BOTH locale catalogs", () => {
    for (const key of structuredKeys) {
      for (const locale of LOCALES) {
        const catalog = translations[locale].projects as Record<string, unknown>;
        expect(
          catalog[key],
          `messages/${locale}.json → projects.${key} is missing`
        ).toBeDefined();
      }
    }
  });

  it("every message-catalog project key has a structured project entry", () => {
    for (const key of messageProjectKeys) {
      expect(
        structuredKeys,
        `projects.ts has no i18nKey "${key}" present in the message catalog`
      ).toContain(key);
    }
  });

  it("every structured project i18nKey has a detail-content entry", () => {
    for (const key of structuredKeys) {
      expect(
        projectDetailContent[key],
        `project-detail-content.ts is missing an entry for "${key}"`
      ).toBeDefined();
    }
  });

  it("every detail-content key maps back to a structured project", () => {
    for (const key of Object.keys(projectDetailContent)) {
      expect(
        structuredKeys,
        `project-detail-content.ts key "${key}" has no structured project`
      ).toContain(key);
    }
  });

  it("the three sources have identical key counts (no orphans)", () => {
    const sorted = (xs: string[]) => [...xs].sort();
    expect(sorted(structuredKeys)).toEqual(sorted(messageProjectKeys));
    expect(sorted(structuredKeys)).toEqual(sorted(Object.keys(projectDetailContent)));
  });
});

describe("project slugs", () => {
  it("are unique", () => {
    const slugs = allProjectSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("are lowercase, URL-safe (a-z, 0-9, hyphen), no leading/trailing hyphen", () => {
    for (const slug of allProjectSlugs()) {
      expect(slug, `slug "${slug}" is not URL-safe`).toMatch(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/
      );
    }
  });

  it("resolve via getProjectBySlug", () => {
    for (const slug of allProjectSlugs()) {
      expect(getProjectBySlug(slug)?.slug).toBe(slug);
    }
  });

  it("getProjectBySlug returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("project cross-references resolve", () => {
  const railLineIds = new Set(railLines.map((l) => l.id));

  it("every referenced railLineId exists in railLines", () => {
    for (const p of projects) {
      for (const id of p.railLineIds) {
        expect(railLineIds.has(id), `project "${p.slug}" → unknown railLineId "${id}"`).toBe(
          true
        );
        // railLinesForProject must surface it too.
        expect(railLinesForProject(p).map((l) => l.id)).toContain(id);
      }
    }
  });

  it("every project with locationMatchers resolves at least one map marker", () => {
    for (const p of projects) {
      if (p.locationMatchers.length === 0) continue;
      expect(
        locationsForProject(p).length,
        `project "${p.slug}" has matchers ${JSON.stringify(
          p.locationMatchers
        )} but resolves no map location`
      ).toBeGreaterThan(0);
    }
  });

  it("projects with no matchers resolve no locations", () => {
    for (const p of projects) {
      if (p.locationMatchers.length === 0) {
        expect(locationsForProject(p)).toHaveLength(0);
      }
    }
  });
});

describe("project metadata shape", () => {
  it("category is one of the four known categories", () => {
    for (const p of projects) {
      expect(CATEGORIES).toContain(p.category);
    }
  });

  it("costUsdM is a positive number or null", () => {
    for (const p of projects) {
      if (p.costUsdM === null) continue;
      expect(p.costUsdM, `project "${p.slug}" cost`).toBeGreaterThan(0);
      expect(Number.isFinite(p.costUsdM)).toBe(true);
    }
  });

  it("color references a category CSS token", () => {
    for (const p of projects) {
      expect(p.color).toBe(`var(--cat-${p.category})`);
    }
  });
});

describe("derived cost aggregations stay consistent", () => {
  it("costByCategory sums to totalNumericCostUsdM", () => {
    const byCat = costByCategory();
    const sumOfCats = Object.values(byCat).reduce((a, b) => a + b, 0);
    expect(sumOfCats).toBe(totalNumericCostUsdM());
  });

  it("costByCategory covers exactly the four categories", () => {
    expect(Object.keys(costByCategory()).sort()).toEqual([...CATEGORIES].sort());
  });

  it("totalNumericCostUsdM equals the sum of non-null project costs", () => {
    const expected = projects.reduce((s, p) => s + (p.costUsdM ?? 0), 0);
    expect(totalNumericCostUsdM()).toBe(expected);
  });
});

describe("rail-line & station data integrity", () => {
  it("rail line ids are unique", () => {
    const ids = railLines.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every rail line has at least one station and bilingual names", () => {
    for (const line of railLines) {
      expect(line.stations.length, `line "${line.id}" has no stations`).toBeGreaterThan(0);
      expect(line.name.trim().length).toBeGreaterThan(0);
      expect(line.nameEn.trim().length).toBeGreaterThan(0);
      expect(line.type.trim().length).toBeGreaterThan(0);
      expect(line.typeEn.trim().length).toBeGreaterThan(0);
    }
  });

  it("every station & location has finite, in-region coordinates", () => {
    // Çukurova / Adana bounding box (generous): lat 36–38, lng 34.5–36.5.
    const inRegion = (lat: number, lng: number) =>
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat > 36 &&
      lat < 38 &&
      lng > 34.5 &&
      lng < 36.5;

    for (const line of railLines) {
      for (const s of line.stations) {
        expect(inRegion(s.lat, s.lng), `station "${s.name}" out of region`).toBe(true);
        expect(s.nameEn.trim().length).toBeGreaterThan(0);
      }
    }
    for (const loc of projectLocations) {
      expect(inRegion(loc.lat, loc.lng), `location "${loc.name}" out of region`).toBe(true);
      expect(loc.nameEn.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("project-detail-content shape", () => {
  it("each entry has bilingual feasibility, highlights, authoritySplit and valid phases", () => {
    for (const [key, content] of Object.entries(projectDetailContent)) {
      for (const locale of LOCALES) {
        expect(
          content.feasibility[locale]?.trim().length,
          `${key}.feasibility.${locale} empty`
        ).toBeGreaterThan(0);
        expect(
          content.highlights[locale]?.length,
          `${key}.highlights.${locale} empty`
        ).toBeGreaterThan(0);
        expect(
          content.authoritySplit[locale]?.length,
          `${key}.authoritySplit.${locale} empty`
        ).toBeGreaterThan(0);
      }
      expect(content.phases.length, `${key}.phases empty`).toBeGreaterThan(0);
      for (const phase of content.phases) {
        expect(phase, `${key} phase ${phase} out of 1–4`).toBeGreaterThanOrEqual(1);
        expect(phase).toBeLessThanOrEqual(4);
      }
    }
  });
});
