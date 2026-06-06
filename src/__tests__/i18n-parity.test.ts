import { describe, expect, it } from "vitest";

import { translations } from "@/lib/i18n";
import { routing } from "@/i18n/routing";

/**
 * i18n message-catalog parity suite.
 *
 * The TR and EN catalogs (`messages/tr.json` / `messages/en.json`) are the
 * single source of truth for all UI copy and MUST carry the same key shape —
 * otherwise `useTranslations()` throws (missing key) or a string silently falls
 * back, producing TR/EN drift. next-intl does not validate this at build time,
 * so these tests are the guard:
 *
 *  - every leaf key in TR exists in EN and vice-versa (recursive),
 *  - array-valued keys (e.g. `about.valuesList`, phase `items`) have matching
 *    lengths across locales,
 *  - ICU placeholders ({lines}, {budget}, …) match across locales,
 *  - no leaf string is accidentally empty.
 */

const tr = translations.tr as unknown as Json;
const en = translations.en as unknown as Json;

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

/** Collect every leaf path in an object/array tree, dot/index-joined. */
function leafPaths(value: Json, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => leafPaths(v, prefix ? `${prefix}.${i}` : `${i}`));
  }
  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) =>
      leafPaths(v, prefix ? `${prefix}.${k}` : k)
    );
  }
  return [prefix];
}

/** Collect the *shape* (object key paths, not array indices) of a tree. */
function keyShape(value: Json, prefix = ""): string[] {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return Object.entries(value).flatMap(([k, v]) => {
      const path = prefix ? `${prefix}.${k}` : k;
      return [path, ...keyShape(v, path)];
    });
  }
  if (Array.isArray(value)) {
    // Recurse into object elements (to catch nested objects in arrays) but do
    // not treat array indices as part of the structural shape.
    return value.flatMap((v) => keyShape(v, prefix));
  }
  return [];
}

/** Read a value at a dotted path (numeric segments index arrays). */
function at(value: Json, path: string): Json | undefined {
  return path.split(".").reduce<Json | undefined>((acc, seg) => {
    if (acc === null || acc === undefined) return undefined;
    if (Array.isArray(acc)) return acc[Number(seg)];
    if (typeof acc === "object") return acc[seg];
    return undefined;
  }, value);
}

/** Sorted set of ICU-style `{placeholder}` names in a string. */
function placeholders(s: string): string[] {
  return [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
}

describe("locale catalogs are configured", () => {
  it("exposes exactly the routing locales", () => {
    expect(Object.keys(translations).sort()).toEqual([...routing.locales].sort());
  });
});

describe("TR ⇄ EN structural parity", () => {
  it("have identical object key shapes", () => {
    const trShape = new Set(keyShape(tr));
    const enShape = new Set(keyShape(en));

    const onlyTr = [...trShape].filter((k) => !enShape.has(k));
    const onlyEn = [...enShape].filter((k) => !trShape.has(k));

    expect(onlyTr, `keys present in tr.json but missing in en.json`).toEqual([]);
    expect(onlyEn, `keys present in en.json but missing in tr.json`).toEqual([]);
  });

  it("array-valued keys have matching lengths across locales", () => {
    // Walk the TR shape; wherever a node is an array, compare its length to EN.
    const walk = (node: Json, path: string) => {
      if (Array.isArray(node)) {
        const counterpart = at(en, path);
        expect(
          Array.isArray(counterpart) ? counterpart.length : -1,
          `array length mismatch at "${path}"`
        ).toBe(node.length);
        node.forEach((child, i) => walk(child, `${path}.${i}`));
        return;
      }
      if (node !== null && typeof node === "object") {
        for (const [k, v] of Object.entries(node)) {
          walk(v, path ? `${path}.${k}` : k);
        }
      }
    };
    walk(tr, "");
  });

  it("ICU placeholders are identical across locales for every string", () => {
    for (const path of leafPaths(tr)) {
      const trVal = at(tr, path);
      const enVal = at(en, path);
      if (typeof trVal !== "string" || typeof enVal !== "string") continue;
      expect(placeholders(enVal), `placeholder mismatch at "${path}"`).toEqual(
        placeholders(trVal)
      );
    }
  });
});

describe("no empty leaf strings", () => {
  for (const [name, catalog] of Object.entries({ tr, en })) {
    it(`${name}.json has no empty string values`, () => {
      for (const path of leafPaths(catalog)) {
        const val = at(catalog, path);
        if (typeof val !== "string") continue;
        expect(val.trim().length, `empty string at ${name}.json → ${path}`).toBeGreaterThan(
          0
        );
      }
    });
  }
});
