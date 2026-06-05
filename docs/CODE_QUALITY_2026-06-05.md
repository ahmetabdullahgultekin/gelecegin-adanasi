# Code Quality Review — Geleceğin Adana'sı

**Date:** 2026-06-05
**Reviewer:** Senior code-quality review (Claude Opus 4.8)
**Scope:** `dev/2026-06-05` HEAD (2 commits ahead of `main`; the SEO + detail-page
feature set), reviewed as the current state of the project. Stack: Next.js 16
(App Router) · React 19 · TypeScript 5 · Tailwind 4 · Leaflet/React-Leaflet.
**Verification:** `npm run lint` ✓ clean · `npm run build` ✓ (23 static routes,
14 SSG detail pages) — both green before and after the fixes in this branch.

---

## Scorecard (1–5, higher is better)

| Dimension | Score | Notes |
|---|:---:|---|
| Component structure / SRP | 4 | Clear page/component/data/lib separation. A few page components mix layout + section data inline, and icon/color tables are duplicated across pages. |
| DRY / dead code | 3 | Genuine duplication: 4 inline SVG icon consts + category color/label maps repeated across `page.tsx`, `projeler/page.tsx`, `harita/page.tsx`, `rail-map.tsx`. Dead `icon` field in the projeler section table (fixed here). |
| Error handling | 4 | `localStorage`/URL access is try/caught; `notFound()` on bad slug; `ProjectCard`/`ProjectDetail` return `null` on missing data. No data-fetch surface (fully static), so little to get wrong. |
| TS type safety | 5 | No `any`, no `@ts-ignore`, no unchecked casts in `src/`. Strong domain interfaces (`ProjectMeta`, `RailLine`, `ProjectDetailContent`). `keyof typeof` lookups are guarded. |
| Data / i18n separation | 3 | Structured data (`data/`) is cleanly separated and the `projects` ↔ `projectDetailContent` ↔ `railLines` keys are in sync (verified: 14/14). **But** large amounts of UI copy live as inline `locale === "tr" ? … : …` ternaries in pages instead of `i18n.ts` — contradicts the repo rule "always use t()". |
| Accessibility & SEO (in code) | 4 | Excellent SEO: hreflang alternates, per-route metadata, `Organization`/`WebSite`/`CreativeWork` JSON-LD, sitemap/robots, derived (never hardcoded) counts. a11y is solid (`aria-pressed`, `aria-label`, focus-visible rings, reduced-motion). Gaps: the budget bars use `role="img"` but the figure has no table fallback the doc-comment claims; map markers are pointer-only. |
| Naming / readability | 5 | Consistent kebab-case files / PascalCase components, descriptive names, genuinely useful doc-comments explaining *why* (e.g. the locale-resolution precedence, the SSR-deterministic initializer). |
| Test quality | 1 | **No tests at all.** No unit, component, or e2e tests; CI runs lint + build only. The data-integrity invariants the CLAUDE.md calls out ("keep these in sync") are unprotected. |
| Security | 5 | No secrets in the repo; `.env*` gitignored. `dangerouslySetInnerHTML` is used only for `JSON.stringify`'d static, non-user JSON-LD. External links use `rel="noopener noreferrer"`. GitHub issue URLs `encodeURIComponent` their inputs. |
| Consistency with CLAUDE.md | 4 | Follows structure, derived-counts rule, stable slugs, hreflang model. Main divergence is the "no hardcoded UI strings / always use t()" rule (see P1 below) and the missing test discipline the broader memory emphasises. |

**Overall grade: B+ (4.0/5).** A clean, well-typed, SEO-strong static site with
genuinely good documentation. Held back from A- by (a) zero automated tests and
(b) a large amount of UI copy hardcoded inline rather than in the i18n module.

---

## Prioritized findings

### P0 — none
No correctness, security, or build-breaking defects found.

### P1 — should fix soon

**P1-1 · No automated tests · whole repo**
CI (`.github/workflows/ci.yml`) runs only `npm run lint` + `npm run build`. There
is no test runner configured and no test files. The CLAUDE.md explicitly warns
that the `i18n.ts` `projects` key, `data/projects.ts` `i18nKey`/`slug`, and
`project-detail-content.ts` key "MUST stay in sync" — yet nothing enforces it. A
typo'd or removed key silently renders `null` (see `ProjectCard`/`ProjectDetail`
early-returns) with no failing signal.
*Fix:* add Vitest with a tiny data-integrity suite asserting (1) every
`projects[].i18nKey` exists in both `translations.tr.projects` and `.en.projects`,
(2) every key has a `projectDetailContent` entry, (3) every `railLineId`/
`locationMatcher` resolves, (4) slugs are unique + URL-safe. Wire `npm test` into
CI. Roughly 60 lines; protects the exact invariant the docs call out.

**P1-2 · UI copy hardcoded inline instead of `t()` · multiple pages**
Many user-facing strings live as inline ternaries, e.g. the hero eyebrow and
stats labels (`src/app/page.tsx:125-127, 166, 174, 182, 189`), the entire CTA
section copy (`page.tsx:389-436`), the projeler hero subtitle
(`src/app/projeler/page.tsx:82-85`), the map page intro (`src/app/harita/page.tsx:31-39`),
the about disclaimer (`src/app/hakkinda/page.tsx`), and footer chips
(`src/components/layout/footer.tsx:38-49, 132-135`). This contradicts the project
rule "All user-facing content … English translation available via locale toggle"
being centralised in `i18n.ts`, makes copy edits error-prone, and risks TR/EN
drift.
*Fix (roadmap):* migrate these into `translations` under new namespaces
(`home.cta`, `home.values`, `projeler.intro`, `harita.intro`, `about.disclaimer`,
`footer.badges`). Mechanical but touches several files — tracked in ROADMAP, not
done in this PR to keep the change small/safe.

### P2 — quality / maintainability

**P2-1 · Duplicated icon + category tables · `page.tsx`, `projeler/page.tsx`, `harita/page.tsx`, `rail-map.tsx`**
The 4 inline transport/tourism/digital/urban SVG icons are copy-pasted between
`page.tsx` and `projeler/page.tsx`; the `categoryColors` + `categoryLabels`
records are duplicated between `harita/page.tsx` and `rail-map.tsx`.
*Fix:* extract a shared `lib/categories.ts` (icon map + color/label records) and
`components/icons/`. Partially addressed here (dead `icon` field removed from
`projeler/page.tsx`); full extraction is a roadmap item.

**P2-2 · Inconsistent category accent colours across the two project listings · `projeler/page.tsx` (fixed)**
`projeler/page.tsx` passed ad-hoc hex (`#2a9d8f`, `#7209b7`, `#06d6a0`) to
`ProjectCard` that did **not** match the canonical `--cat-*` palette the homepage
uses (`#0f766e`, `#6d28d9`, `#059669`), so the same project rendered a different
accent colour on `/` vs `/projeler`. **Fixed in this branch** by switching the
projeler sections to the `var(--cat-*)` tokens.

**P2-3 · Fragile locale detection by string comparison · `hakkinda/page.tsx` (fixed)**
The disclaimer block chose its language via `t.about.title === "Hakkında"` — a
brittle proxy for "is the locale TR" that breaks the moment that copy is edited.
**Fixed in this branch** to read `locale` from `useLocale()` directly.

**P2-4 · BudgetChart a11y claim vs. reality · `components/projects/budget-chart.tsx:23-28`**
The doc-comment says the chart is "Accessible via an equivalent data table for
screen readers," but the component renders only `<div role="img">` bars with an
`aria-label` per bar — there is no `<table>`. The per-bar labels are reasonable,
but the comment overstates. *Fix:* either add a visually-hidden `<table>` or
soften the comment. (Left as a roadmap note — not a code change here.)

### P3 — nits

- **`page.tsx:261`** — line badge derives a label via
  `line.id.replace(/[^0-9a-z]/gi,"").slice(0,3).toUpperCase()`, which yields
  `MAV`/`YUM` etc. — fine, but a deliberate short-code field on `RailLine` would
  be clearer and locale-safe.
- **`harita/page.tsx` loading copy** is Turkish-only (`"Harita yükleniyor..."`)
  in both the dynamic-import fallback and `rail-map.tsx` — not locale-aware.
- **`sitemap.ts` `lastModified: new Date()`** stamps *every* URL with the build
  time, so all pages always look "just changed" to crawlers; per-content dates
  would be more honest.
- **`docs/gemini-chat-ilham.pdf`** (143 KB) is committed though CLAUDE.md
  describes `docs/` as "gitignored". Harmless, but the doc/gitignore disagree.

---

## Honest strengths

- **Type safety is genuinely strong** — zero `any`/`@ts-ignore` across `src/`,
  with expressive domain models and guarded `keyof typeof` lookups.
- **SEO is a highlight**: site-wide JSON-LD entities, per-route + per-project
  metadata, hreflang alternates wired consistently through one helper
  (`alternatesFor`), a derived bilingual sitemap, and the discipline of deriving
  every stat/count from the data (no "5 lines / 30+ stations" literals).
- **Documentation quality is excellent** — doc-comments explain non-obvious
  decisions (SSR-deterministic locale initializer, why JSON-LD inlining is safe,
  cost-aggregation semantics), and the CLAUDE.md is an accurate map of the repo.
- **Data modelling** cleanly separates machine-readable metadata (`data/`) from
  prose copy (`i18n.ts` / `project-detail-content.ts`), and the cross-references
  are in sync.
- **Accessibility basics are present and intentional** — `aria-pressed` toggles,
  focus-visible rings, reduced-motion handling, semantic `<dl>`/`<ol>`/`<nav>`.

---

## Biggest roadmap refactor

**Centralise all UI copy into `i18n.ts` and extract the shared category/icon
tables.** Today the homepage, projeler, harita, about, and footer carry dozens of
inline `locale === "tr" ? … : …` strings, and the same icon/color/label maps are
duplicated across four files. A single refactor that (1) moves every inline
string into `translations` under clear namespaces and (2) lifts the category
icon + color + label data into one `lib/categories.ts` would eliminate the largest
source of TR/EN drift risk, make copy review possible in one place, and shrink the
page components to pure layout — directly satisfying the repo's own i18n rule.
Pair it with the P1-1 data-integrity test suite so the centralised keys are
guarded by CI.
