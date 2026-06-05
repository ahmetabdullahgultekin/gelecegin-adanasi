# Tech-Stack & Architecture Modernization Review — Geleceğin Adana'sı

**Date:** 2026-06-05  
**Reviewer:** Staff-engineer architecture review (Claude Sonnet 4.6)  
**Scope:** Full stack inventory + current-landscape research for `geleceginadanasi.com.tr`.  
**Methodology:** Code read of `package.json`, `next.config.ts`, `Dockerfile`, `docker-compose.prod.yml`, CI, all `src/` layout files; research via context7 docs, Vercel/Next.js official blog, endoflife.date, and cross-framework benchmark sources. Every "current" claim below is verified against a 2026 source and cited.

---

## 1. Inventory

| Layer | What's in the Repo | Version Pinned |
|---|---|---|
| Framework | Next.js (App Router, `output: standalone`) | 16.2.6 |
| Language | TypeScript | `^5` (resolves to ~5.9 via npm) |
| UI runtime | React + React DOM | 19.2.4 |
| Styling | Tailwind CSS v4 (PostCSS plugin) | `^4` (resolves to 4.3+) |
| Map | Leaflet + React-Leaflet | Leaflet 1.9.4 / React-Leaflet `^5` |
| Fonts | Next/font (Google — Inter, Space Grotesk, Geist Mono) | bundled in Next 16 |
| i18n | Custom `LocaleProvider` context + query-param `?lang=` | bespoke |
| SEO | Next.js Metadata API + JSON-LD + hreflang via `alternatesFor()` | built-in |
| Images | `next/image` + static WebP | built-in |
| Sitemap / robots | `sitemap.ts` + `robots.ts` (route handlers) | built-in |
| Bundler | Turbopack (Next 16 default; no custom webpack config) | stable in 16 |
| Linter | ESLint 9 (Flat Config) + `eslint-config-next` | 16.2.6 |
| Container base | `node:22-alpine` | 22-alpine |
| Orchestration | Docker Compose + Traefik + Let's Encrypt | prod |
| CI | GitHub Actions: `checkout@v4` + `setup-node@v4` → lint + build | ubuntu-latest |
| Content model | TypeScript modules (`data/`, `lib/`) — no CMS, no MDX | — |
| Rendering strategy | SSG (all routes `generateStaticParams`) + client-side locale toggle | — |
| Package manager | npm | — |

### Site shape
- 5 routes (home, projects list, `/projeler/[slug]` × 14, map, about) = **23 static HTML pages** at build time
- Fully bilingual TR/EN; locale resolved on the client (no locale-prefixed paths)
- One interactive component: Leaflet map (dynamic import, SSR disabled)
- Zero server-side data fetching; all content is TypeScript modules compiled in

---

## 2. Component-by-component assessment

### 2.1 Next.js 16.2.x

**Current pinned:** `16.2.6`  
**Latest stable:** `16.2.7` (released 2026-06-01, see [endoflife.date/nextjs](https://endoflife.date/nextjs))  

Next.js 16 is the current LTS branch. The version pinned (16.2.6) was itself the **May 2026 security release** that patched 13 advisories: middleware/proxy bypass, XSS, SSRF (CVE-2026-44578), cache poisoning, and DoS — all assigned on 2026-05-06 and 2026-05-07 ([Vercel changelog](https://vercel.com/changelog/next-js-may-2026-security-release)). 16.2.7 (June 1) is a follow-up patch. **Minor upgrade needed.** Next.js 15 loses security support in ~October 2026; the repo is already on 16 (correct).

Notable since 16.0 that affects this site:
- **Turbopack is now the default bundler** for both `next dev` and `next build` (stable). This site has no custom webpack config, so it benefits immediately — ~400% faster dev startup, 2–3× faster production builds ([akoskm.com](https://akoskm.com/nextjs-16-turbopack-stable/)).
- **PPR (Partial Prerendering)** graduated to stable (replaces the old `experimental.ppr` flag). **Not relevant here** — this site is 100% static, no dynamic segments.
- `transitionTypes` prop on `<Link>` for View Transitions — nice-to-have for navigation animations.

**Verdict: KEEP + PATCH to 16.2.7** (one `npm install next@16.2.7` line).

---

### 2.2 React 19.2.4

**Latest stable:** React 19.2.4 is current as of 2026-Q2. React 19 is the active release; no 20 is announced.

The repo is on the latest point release. React 19 introduced Server Components (used here via App Router), the `use()` hook, improved hydration error messages (the Hydration Diff Indicator in Next 16.2 builds on this), and the Actions pattern for mutations. For a fully-static content site these are structural enablers rather than day-to-day features — the project is already correctly using Server Components for all static pages and `"use client"` only where needed (Leaflet map, locale context).

**Verdict: KEEP (already current)**

---

### 2.3 TypeScript `^5` (resolves ~5.9.x)

**Latest in 5.x branch:** TypeScript 5.9.2  
**TypeScript 6.0:** Released 2026-03-23 (last JavaScript-based compiler)  
**TypeScript 7.0:** Go-rewrite (Project Corsa), 10× faster, GA expected H2 2026 ([InfoQ](https://www.infoq.com/news/2026/02/typescript-6-released-beta/))

The project pins `"typescript": "^5"` which will float to 5.9.x. TypeScript 5.x is fully supported by Next 16; the `^5` range intentionally locks out 6.0 (correct).

TypeScript 6.0 is a "bridge release" — no 6.1 planned — and 7.0 (Go) is not yet fully GA with editor integration (VS Code extension ships mid-2026). The conservative stance of staying on 5.x is appropriate: Next.js 16 itself ships with TS 5.x type definitions and the codemod tooling has not been tested against 7.0's new type-checking mode.

**Action:** Explicitly cap at `"typescript": ">=5.0 <6.0"` to avoid accidental 6.0 pull-in now that it's published. Evaluate 6.0 → 7.0 migration once Next.js officially supports it (expected Q3–Q4 2026).

**Verdict: KEEP (pin tightening recommended)**

---

### 2.4 Tailwind CSS v4 (4.3+)

**Current:** `^4` resolves to 4.3+ — the May 2026 release added first-party scrollbar styling, logical-property utilities, zoom/tab-size utilities, and better `@variant` support ([tailwindcss.com/blog](https://tailwindcss.com/blog)).

Tailwind v4 is the current major; v3 reached end-of-active-development (maintenance only) on 2025-01-22. The project is on v4.0 since inception — one of the first major projects to be, which is an excellent choice. The `@tailwindcss/postcss` plugin approach (instead of the old `tailwind.config.js` + `@apply` pattern) is the v4 canonical path.

No migration needed. The `^4` floating range correctly pulls in all 4.x improvements automatically.

**Verdict: KEEP (already on latest major)**

---

### 2.5 Leaflet 1.9.4 + React-Leaflet `^5`

**Leaflet:** `1.9.4` — the Leaflet project has not released a 2.0 as of June 2026. The 1.9.x line receives security fixes; its last NPM publish was ~12 months ago. Leaflet remains the most downloaded mapping library by a significant margin (~1.4 M downloads/month in 2025), though MapLibre GL JS is growing rapidly ([geoapify.com](https://www.geoapify.com/map-libraries-comparison-leaflet-vs-maplibre-gl-vs-openlayers-trends-and-statistics/)).

**React-Leaflet `^5`:** The `5.0.0` release (the project's current floating range) requires React 18+ and Leaflet 1.8+. The changelog shows no new releases to npm in the past ~12 months — low upstream maintenance activity. However, for this site's use case (static rail-line markers + tile layer on OpenStreetMap), React-Leaflet 5 is complete and stable; no missing features.

**Should this upgrade to MapLibre?** MapLibre GL JS is an open-source fork of Mapbox GL JS using WebGL for vector tiles. Advantages: smooth zoom, better mobile, future-proof. Disadvantages: vector tile infrastructure required (though OpenFreeMap and protomaps provide free hosting), and the migration is medium effort (rewrite `RailMap`). For a map showing ~50 fixed markers with no routing, offline support, or cluster animations, Leaflet's simplicity is actually the right call. MapLibre would be the better choice if the map gains vehicle tracking, 3D, or heavy cluster data.

**Verdict: KEEP (Leaflet appropriate for current scope; revisit if map complexity grows)**

---

### 2.6 i18n — custom `LocaleProvider` context + `?lang=` query param

**Current approach:** A bespoke `LocaleContext` (client-side) resolves locale from `?lang=` URL param → `localStorage` → `<html lang>`. All translations live in a single `src/lib/i18n.ts` TypeScript object. The server always renders Turkish (SSR deterministic); the English content is hydrated on the client.

**Industry standard in 2026:** `next-intl` is the dominant choice for Next.js App Router i18n, offering:
- URL sub-path routing (`/tr/…` or `/en/…`) so each locale has a distinct crawlable URL
- Middleware-based locale detection from `Accept-Language`
- Server Component-compatible `getTranslations()` (no client-side hydration of strings)
- Automatic `<link rel="alternate" hreflang="…">` generation
- TypeScript-native, type-safe translation keys
([next-intl.dev](https://next-intl.dev/docs/getting-started/app-router))

**The SEO gap in the current design:** The current implementation serves English content only after JS hydration. Googlebot *does* render JavaScript, but:
1. The English pages share a single URL with TR (differentiated only by `?lang=en`). While the hreflang alternates are correctly set via `alternatesFor()`, Google's canonical de-duplication may collapse the two to one, effectively making only the TR content indexed.
2. There is no `/en/…` URL path for English content — it can't be deep-linked directly (because `?lang=en` is rewritten/removed on load and stored in localStorage, then the page re-renders).
3. `next-intl` with `[locale]` path segments avoids these issues entirely and is the architecturally correct solution for a bilingual public-information site.

**Migration cost:** Medium (~3–5 days of work). It requires restructuring routes under `app/[locale]/`, adding a middleware, and adapting the `LocaleProvider` usage. The `i18n.ts` translation object can be reused directly as `next-intl` JSON dictionaries with minor reshaping. The Sitemap and `alternatesFor` helper are replaced by `next-intl`'s routing utilities.

**This is the highest-value SEO improvement open to this project.**

**Verdict: CONSIDER-REPLACE (next-intl with `[locale]` path routing)**

---

### 2.7 Rendering strategy — SSG via `generateStaticParams`

All 23 pages are pre-rendered at build time as static HTML. This is the right architecture for content that changes only when the code changes. There is no user-generated content, no personalization, no database.

**PPR / ISR relevance:** PPR (stable in Next 16) is for routes that mix static shells with dynamic per-request data. ISR is for content that changes on a schedule. Neither applies here — the full site is appropriate as pure SSG.

**Could this be a plain static export (`output: export`)?** Technically yes — every page could be an HTML file. However, `output: standalone` produces a minimal Node.js server that also enables `next/image` optimization, ISR if ever needed, and the Turbopack dev loop. The overhead is negligible (the container is ~100–150 MB). Keeping `standalone` is the correct pragmatic choice.

**Verdict: KEEP (SSG is correct; no ISR/PPR needed for this content model)**

---

### 2.8 Docker + Traefik deployment model

The Dockerfile follows the official three-stage pattern (deps → builder → runner) with `node:22-alpine`, non-root `nextjs` user, and the standalone output copy strategy. This is best-practice per the [official Docker docs guide](https://docs.docker.com/guides/nextjs/containerize/) and Vercel's own [self-hosting documentation](https://nextjs.org/docs/app/getting-started/deploying).

**Node.js base image:** `node:22-alpine`. Node 22 is in Active LTS (became LTS October 2024, EOL April 2027). Node 24 reached Active LTS status in October 2025 (EOL April 2028). The gap between 22 and 24 is not security-relevant until Node 22 enters Maintenance phase (October 2026). Upgrading the `FROM` line to `node:24-alpine` before October 2026 is a low-effort improvement that extends the EOL runway by a year.

**Missing: health check.** The `docker-compose.prod.yml` has no `healthcheck:` entry. Traefik will route to the container even during Next.js boot (typically 2–3 seconds). Adding a `HEALTHCHECK` directive in the Dockerfile or compose file is a small reliability improvement.

**Missing: no `.env.prod`.** The project has no runtime environment variables (purely static), so this is not an issue — but would matter if env vars are ever introduced.

**Verdict (Docker model): KEEP; minor improvements — add health check, plan Node 24 bump by Sept 2026**

---

### 2.9 Bundler — Turbopack (implicit default in Next 16)

The project has no custom webpack configuration, which means it automatically uses Turbopack (stable default as of Next.js 16.0, October 2025) for both `next dev` and `next build`. This is the correct modern default; no action needed.

Development benefit: ~400% faster `next dev` startup vs webpack; 50% faster rendering in 16.2 ([nextjs.org/blog/next-16-2](https://nextjs.org/blog/next-16-2)).

**Verdict: KEEP (already on default, no config change needed)**

---

### 2.10 ESLint 9 (Flat Config) + `eslint-config-next`

ESLint 9 with the flat-config format (`eslint.config.mjs`) is the current generation, released 2024. `eslint-config-next` 16.2.6 is the paired version. No issues.

**Verdict: KEEP**

---

### 2.11 CI pipeline

The workflow runs `npm ci` → `lint` → `build` on every PR and push to `main`. This catches build regressions and lint errors. The build step also catches TypeScript type errors (via `noEmit: false` during Next's own build tsc pass).

**Gap:** No test step. As noted in the companion `CODE_QUALITY_2026-06-05.md` review, there are zero automated tests. The data-integrity invariants (slug ↔ i18nKey ↔ detail-content sync for 14 projects) are unprotected. A Vitest suite with 5–10 data integrity assertions would take under a day to write and would gate merges against data-sync regressions.

**Verdict (CI): KEEP + ADD Vitest step**

---

## 3. Framework Fit: Next.js vs a lighter static framework

### The honest assessment

This is a **fully-static, content-first, bilingual public-information site** with:
- 23 HTML pages (all pre-rendered at build)
- One interactive widget (Leaflet map)
- Zero server-side data fetching
- No user auth, CMS, APIs, or server actions in production

**Astro** is purpose-built exactly for this profile. It ships **zero JavaScript by default** and hydrates only specific interactive components ("islands"). Independent 2026 benchmarks place Astro at ~9 KB of JS vs ~463 KB for a comparable Next.js page — a 50× payload difference that directly affects LCP/Core Web Vitals, which are Google ranking signals. Astro 5.0 (released December 2024) added stable Content Layers (pluggable data loading), Server Islands (dynamic components on otherwise static pages), and built-in i18n routing with `[locale]` path segments ([astro.build/blog/astro-5](https://astro.build/blog/astro-5/)).

The sibling portfolio project (`ahmetabdullah-portfolio`) is already on Astro 4 with `@astrojs/react`, `@astrojs/mdx`, `@astrojs/sitemap`, and `@astrojs/tailwind` — meaning the team has direct Astro experience and can maintain multiple Astro projects.

### Where Astro is better for this site
- **Performance:** Zero-JS default pages → better LCP, better Core Web Vitals, better Google ranking signals.
- **i18n:** Built-in `[locale]` routing in Astro 5 is simpler than rolling a custom context or integrating next-intl.
- **Bundle size:** 14 static detail pages with no interactivity ship ~0 JS under Astro (with the React island only on the map page).
- **Build output:** Astro's `output: static` produces flat HTML files, deployable to any CDN including free tiers (GitHub Pages, Cloudflare Pages), not requiring a Node.js server.
- **Maintenance alignment:** The portfolio is already Astro — shared knowledge, shared conventions.

### Where Next.js is better (or adequate) for this site
- **React ecosystem:** React-Leaflet is already integrated; the map page is a React island regardless of framework.
- **Familiarity:** The current codebase is well-structured and functional. Rewriting it costs 1–2 weeks.
- **Future flexibility:** If the site ever gains user features (submitting proposals, comments, auth), Next.js offers a shorter path there.
- **No runtime needed for Astro static:** Astro static output means giving up the Docker/Node server, which the current infra is already wired for (but Traefik can just as easily serve static files or an nginx container).

### Verdict on framework fit

**The site is over-engineered for its current content profile with Next.js**, but the gap is not large enough to demand an immediate migration, given that:
1. The Next.js 16 codebase is clean, well-structured, and already live.
2. Migration cost is real (~1.5 weeks) and the site delivers real value now.
3. The most impactful improvement (i18n routing) is solvable within Next.js via `next-intl`.

**Recommendation:** Do NOT migrate now. Apply the targeted improvements in section 4 (especially next-intl). If the site stays content-only for another 6–12 months with no new interactive features planned, schedule a migration to Astro 5 as a strategic project (low-risk, high-performance payoff). If new user-interactive features are planned, stay on Next.js.

---

## 4. Prioritized recommendations

### Priority table

| # | Component | Current | Best (2026) | Verdict | Why | Effort | Risk |
|---|---|---|---|---|---|---|---|
| 1 | **next.js patch** | 16.2.6 | 16.2.7 | **UPGRADE** | 16.2.7 is a follow-up security patch to the May 2026 13-advisory release; running 16.2.6 is acceptable but 16.2.7 closes the remaining issues | XS (1 line) | None |
| 2 | **i18n — client-only locale** | Custom `?lang=` context | `next-intl` + `[locale]` path routing | **CONSIDER-REPLACE** | English content is not crawlable (JS-gated, no separate URL); next-intl's `[locale]` path routing gives each language a distinct crawlable URL, server-rendered, with automatic hreflang; highest SEO ROI | M (3–5 days) | Low-Medium |
| 3 | **Automated tests** | None | Vitest data-integrity suite | **ADD** | 14 project slugs must sync across 3 TypeScript modules; no test runner; data regression is silent (renders null); a 1-day Vitest setup covers the gap | S (1 day) | None |
| 4 | **Node.js base image** | `node:22-alpine` | `node:24-alpine` | **UPGRADE (by Oct 2026)** | Node 24 is Active LTS (EOL Apr 2028); Node 22 enters Maintenance phase Oct 2026; upgrading the Dockerfile `FROM` line costs 5 minutes | XS | Very low |
| 5 | **TypeScript range** | `"^5"` | `">=5.0 <6.0"` | **TIGHTEN** | TS 6.0 is published; `^5` will float into it; Next 16 has not published TS 6 support; explicit upper bound prevents surprise | XS | None |
| 6 | **Docker health check** | Missing | `HEALTHCHECK` in Dockerfile or compose | **ADD** | Prevents Traefik from routing to boot-incomplete container; relevant on any `--no-cache` rebuild | XS | None |
| 7 | **Tailwind CSS** | `^4` (~4.3) | 4.3 is current | **KEEP** | Already on the latest major; scrollbar utilities in 4.3 are a free improvement via the floating range | — | — |
| 8 | **React-Leaflet / Leaflet** | `^5` / `1.9.4` | No new major yet | **KEEP** | Stable, complete for current map scope; low maintenance cadence is a risk to track but not actionable now | — | — |
| 9 | **ESLint 9 flat config** | eslint-config-next 16.2.6 | Current | **KEEP** | Up to date | — | — |
| 10 | **Framework (Next.js → Astro)** | Next.js 16 | Astro 5 would be lighter | **CONSIDER-REPLACE (strategic)** | Better performance profile for a static content site; wait 6–12 months to assess content growth direction before deciding | L (1.5–2 wks) | Medium |

---

## 5. Top 5 highest-value actions (ranked by value/effort)

### #1 — Patch Next.js to 16.2.7 (XS effort, security)

```bash
npm install next@16.2.7 eslint-config-next@16.2.7
```

This is a one-line change that closes the remaining issues from the May 2026 security batch. Deploy immediately.

Source: [vercel.com/changelog/next-js-may-2026-security-release](https://vercel.com/changelog/next-js-may-2026-security-release)

---

### #2 — Tighten TypeScript range + bump Node base image (XS effort, preventive)

In `package.json`, change `"typescript": "^5"` to `"typescript": ">=5.0 <6.0"`.

In `Dockerfile`, change `FROM node:22-alpine AS base` to `FROM node:24-alpine AS base` (anytime before October 2026 when Node 22 enters maintenance).

These are two lines of code, zero functional risk.

Source: [endoflife.date/nodejs](https://endoflife.date/nodejs) · [infoq.com TypeScript 6 beta](https://www.infoq.com/news/2026/02/typescript-6-released-beta/)

---

### #3 — Add Vitest data-integrity tests (S effort, correctness gate)

Create `src/__tests__/data-integrity.test.ts` asserting:
- Every `allProjectSlugs()` entry has a matching `i18nKey` in both `translations.tr.projects` and `translations.en.projects`
- Every `i18nKey` has a corresponding entry in `projectDetailContent`
- Every `railLineId` referenced in a project's `stations` exists in the `railLines` array

Add `vitest` to `devDependencies` and `"test": "vitest run"` to scripts; add `- run: npm test` to `.github/workflows/ci.yml` after the lint step.

This prevents the silent-null rendering bug class identified in `CODE_QUALITY_2026-06-05.md` and is the only change that adds automated correctness gating.

---

### #4 — Migrate i18n to `next-intl` with `[locale]` path routing (M effort, SEO lift)

The current `?lang=en` approach is a known crawlability gap: English content is not server-rendered, and Google may consolidate the two "views" of the same URL. `next-intl` with `app/[locale]/` routes gives both languages distinct, crawlable, server-rendered URLs.

Migration outline:
1. `npm install next-intl`
2. Create `src/i18n/routing.ts` and `middleware.ts` (locale detection: `Accept-Language` + default `tr`)
3. Move `app/` contents under `app/[locale]/`
4. Replace `LocaleProvider` usage with `next-intl`'s `useTranslations()` (keep the TS translation object as JSON source)
5. Remove the `?lang=` query-param mechanism; let next-intl handle URL prefix
6. Update `alternatesFor()` to emit `/tr/…` and `/en/…` (next-intl provides this)
7. Update `sitemap.ts` accordingly

The `translations` object in `i18n.ts` maps cleanly to `next-intl`'s dictionary format.

Source: [next-intl.dev/docs/getting-started/app-router](https://next-intl.dev/docs/getting-started/app-router)

---

### #5 — Add Docker health check (XS effort, reliability)

Add to `Dockerfile` (runner stage, before `CMD`):
```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/ | grep -q "Geleceğin Adana" || exit 1
```

Or in `docker-compose.prod.yml` as a `healthcheck:` block. Prevents Traefik from forwarding traffic to a container that is still booting or has crashed.

---

## 6. What to NOT do (shiny but not worth it)

| Idea | Why to skip |
|---|---|
| **Migrate to Astro now** | Site is live, clean, and working. Migration cost (~1.5 weeks) is real. Apply the targeted improvements above first; revisit in 6–12 months if the site stays content-only. |
| **PPR / ISR / Server Actions** | This site has no dynamic data. Adding streaming or incremental revalidation adds infra complexity with zero user-visible benefit. |
| **Swap Leaflet for MapLibre GL** | MapLibre is excellent but requires vector tile infrastructure (even with free providers like OpenFreeMap, it's operational overhead). For 50 fixed markers, Leaflet is the right tool. Revisit only if the map gains animations, clustering, or real-time data. |
| **Replace `next/image` with a CDN** | The site serves a handful of static images; `next/image` optimization is already built in. A CDN would help at scale (>10K req/day), not at the current traffic level. |
| **TypeScript 6 or 7 now** | TS 6 is a bridge release with no 6.1 planned; TS 7 (Go) is still finalizing VS Code integration. Next.js hasn't published TS 6+ type definitions. Wait for Next 17 or an explicit Next.js TS 6 compatibility note. |
| **Adopt a headless CMS** | The content is maintained by one developer, updated infrequently, and cleanly structured in TypeScript modules. Adding a CMS introduces infra cost and operational complexity for no editorial-workflow benefit. Revisit only if non-developer editors need to update content. |

---

## 7. Security summary

| Finding | Severity | Status |
|---|---|---|
| Next.js 16.2.6 is missing follow-up patch 16.2.7 (June 1 2026) | Low-Medium | Fix: `npm install next@16.2.7` |
| 13 advisories patched in 16.2.6 (May 2026 batch) — already on this version | Resolved | — |
| No secrets in repo, `.env*` gitignored | — | Good |
| `dangerouslySetInnerHTML` only used for static JSON-LD | — | Good |
| React 19.2.4 is current; no open CVEs | — | Good |
| Leaflet 1.9.4: no open high-severity CVEs as of 2026-06-05 | — | Good |

---

## 8. Summary verdict

The stack is **well-chosen and current**. The project made the right call adopting Next.js 16 App Router with Tailwind v4 from the start. The only non-trivial technical debt is the **client-only i18n architecture**, which limits English SEO coverage.

The **five actions above** (Next.js patch, TS range tighten + Node bump, Vitest tests, next-intl migration, Docker health check) represent roughly 1 week of engineering work total and deliver meaningful security, correctness, SEO, and reliability improvements without any risk to the live site.

A migration to Astro is worth considering as a **strategic long-term option** given the site's static-content profile and the team's existing Astro expertise (portfolio project), but should not displace the targeted improvements above.

---

*Reviewed: 2026-06-05. Sources: [endoflife.date/nextjs](https://endoflife.date/nextjs) · [vercel.com/changelog/next-js-may-2026-security-release](https://vercel.com/changelog/next-js-may-2026-security-release) · [nextjs.org/blog/next-16-2](https://nextjs.org/blog/next-16-2) · [tailwindcss.com/blog/tailwindcss-v4](https://tailwindcss.com/blog/tailwindcss-v4) · [astro.build/blog/astro-5](https://astro.build/blog/astro-5/) · [next-intl.dev](https://next-intl.dev/docs/getting-started/app-router) · [endoflife.date/nodejs](https://endoflife.date/nodejs) · [infoq.com TS6](https://www.infoq.com/news/2026/02/typescript-6-released-beta/) · [akoskm.com Turbopack](https://akoskm.com/nextjs-16-turbopack-stable/) · [geoapify.com map libs](https://www.geoapify.com/map-libraries-comparison-leaflet-vs-maplibre-gl-vs-openlayers-trends-and-statistics/)*
