# Gelecegin Adanasi - Project Guide

## Project Overview
Independent, non-political urban planning and vision platform for Adana, Turkey.
Goal: Present data-driven, realistic infrastructure proposals for public benefit.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Map**: Leaflet.js + React-Leaflet (OpenStreetMap)
- **i18n**: `next-intl` with `[locale]` path routing (`localePrefix: "as-needed"`)
  — TR (default) at `/`, EN at `/en/...`; server-rendered per locale with full
  Turkish character support
- **Deployment**: Docker (standalone output) + Traefik reverse proxy on Hetzner CX43
- **Package Manager**: npm
- **Port**: 3007 (mapped to internal 3000)

## Project Structure
```
src/
  i18n/                      # next-intl config (single source for locale routing)
    routing.ts               # locales ['tr','en'], defaultLocale 'tr', as-needed
    request.ts               # getRequestConfig: loads messages/<locale>.json
    navigation.ts            # locale-aware Link / usePathname / getPathname
  proxy.ts                   # next-intl proxy (was middleware.ts): locale negotiation
  app/                       # Next.js App Router pages
    layout.tsx               # Root layout: minimal passthrough (imports globals.css)
    [locale]/layout.tsx      # Document shell: <html lang={locale}>, fonts, JSON-LD,
                             #   generateMetadata (localized), NextIntlClientProvider,
                             #   generateStaticParams (tr + en), setRequestLocale
    [locale]/page.tsx        # Landing / hero page (+ budget chart, CTA)
    client-layout.tsx        # Client chrome (Header/Footer); provider lives in [locale]
    sitemap.ts               # Bilingual sitemap (NOT locale-prefixed; getPathname)
    robots.ts                # robots.txt (NOT locale-prefixed)
    [locale]/projeler/page.tsx        # All projects listing (illustrated hero)
    [locale]/projeler/[slug]/page.tsx # Per-project detail (SSG × 2 locales)
    [locale]/harita/page.tsx          # Interactive map with Leaflet
    [locale]/hakkinda/page.tsx        # About page (stats derived from data)
    [locale]/{route}/layout.tsx       # Per-route generateMetadata + alternatesFor()
  components/
    layout/                  # Header (lang toggle = Link to other locale), Footer
    map/                     # RailMap (dynamic import, SSR disabled)
    projects/                # ProjectCard, Timeline, BudgetChart, ProjectDetail
    seo/                     # JsonLd (Organization + WebSite)
  data/
    stations.ts              # Rail lines, stations, project-location markers (+*En)
    projects.ts              # Structured project meta: slug, costUsdM, category,
                             #   rail-line + map-marker links, cost aggregations
  lib/
    i18n.ts                  # Re-exports messages/{tr,en}.json as typed maps for
                             #   server code (metadata/JSON-LD); + Locale type
    project-detail-content.ts# Long-form bilingual detail copy (feasibility, etc.)
    site.ts                  # SITE_URL, LOCALES, async alternatesFor() (hreflang)
  __tests__/                 # Vitest suites (node env, no DOM)
    data-integrity.test.ts   # projects ⇄ i18n ⇄ detail-content key sync, unique
                             #   URL-safe slugs, railLine/location cross-refs,
                             #   cost aggregations, coord bounding box
    i18n-parity.test.ts      # recursive TR/EN catalog key-shape parity, array
                             #   lengths, ICU placeholders, no empty leaf strings
messages/
  tr.json / en.json          # next-intl catalogs (source of truth, same keys);
                             #   `ui.*` namespace holds former inline UI strings
public/
  og-image.png               # 1200×630 social card
  images/projects-hero.webp  # Illustrated projects hero (next/image static import)
scripts/                     # SVG sources for the OG image + hero (rasterized via sharp/rsvg)
docs/                        # Local docs (gitignored) — includes original brainstorm chat
vitest.config.ts             # Vitest config (node env, vite-tsconfig-paths for @/*)
.github/workflows/ci.yml     # npm ci → lint → test → build on PRs and push to main
```

## Conventions
- All user-facing content in **Turkish** (with proper characters: ş, ç, ğ, ı, ö, ü, İ)
- English translation available via locale toggle (links to the `/en` URL)
- Code (variables, comments, commits) in **English**
- Component names: PascalCase
- File names: kebab-case for pages, PascalCase for components
- Use `"use client"` only when necessary (interactivity, hooks)
- Commit messages: conventional commits in English

## Key Data
> Source of truth: `src/data/stations.ts` (rail lines/stations) and
> `src/lib/i18n.ts` (`projects` = 14 keys). Counts below are derived — keep them
> in sync if the data changes.

### Rail System Lines (6 lines, 49 stations)
1. **Hat 1 (M1 Extension)**: M1 Uzatması (Underground Metro, 10 stations)
2. **Hat 2 (Ring Tram)**: Şehir İçi Ring (Light Rail / Tram, 11 stations)
3. **Hat 3a (CukurovaRay E-W)**: ÇukurovaRay Doğu-Batı (Commuter Train, 9 stations)
4. **Hat 3b (CukurovaRay North)**: ÇukurovaRay Kuzey (Commuter Train, 8 stations)
5. **Hat 4 (Mavi Hat)**: Mavi Hat / Sahil (Tourism Express, 8 stations)
6. **Hat 5 (Yumurtalik Branch)**: Yumurtalık Çatalı (Coastal Line, 3 stations)

### Major Projects (14 total)
- Transport: M1 Extension, Ring Tram, CukurovaRay, Blue Line, Smart Terminal
- Tourism: Karatas & Yumurtalik, Agroparks
- Digital: ABB AI, Adakart, Technopark
- Urban: Water/Drainage, Green Spaces, Bike Network, Disaster Prep

Each project has a stable slug + structured metadata in `src/data/projects.ts`
(`costUsdM` numeric estimate, category, linked rail lines + map markers) and a
long-form bilingual detail page at `/projeler/[slug]` (content in
`src/lib/project-detail-content.ts`). Slugs MUST stay stable (they are URLs in
the sitemap). When adding/removing a project, keep these in sync: `i18n.ts`
`projects` key ↔ `data/projects.ts` `i18nKey`/`slug` ↔
`project-detail-content.ts` key.

## i18n & SEO
- **Routing** uses `next-intl` `[locale]` path routing with
  `localePrefix: "as-needed"` (`src/i18n/routing.ts`): Turkish (default/canonical)
  stays at the bare path (`/`, `/projeler/...`), English is served under `/en/...`.
  `/tr/...` 307-redirects to the bare path so TR canonicals never carry a prefix.
  Each language is **server-rendered at its own crawlable URL** (closes the old
  `?lang=en` JS-gated SEO gap).
- **Translations** live in `messages/tr.json` + `messages/en.json` (same keys;
  source of truth). In Client/Server Components use next-intl hooks:
  `useTranslations()` → `t("nav.home")`, `t.raw("about.valuesList")` for arrays,
  `useLocale()` for the active locale code. Always import `Link`/`usePathname`
  from `@/i18n/navigation`, never `next/link` / `next/navigation`. The language
  toggle is a `<Link href={pathname} locale={otherLocale}>` (preserves the page).
  Server code that needs raw strings (metadata, JSON-LD) reads `translations`
  from `src/lib/i18n.ts` (a typed re-export of the JSON catalogs).
- **hreflang**: every route's `generateMetadata` uses `await alternatesFor(href,
  locale)` from `src/lib/site.ts` (async — it calls `getPathname`), pairing the
  TR (`/...`) and EN (`/en/...`) URLs (`tr-TR` / `en-US` / `x-default`=TR) and
  setting `canonical` to the rendered locale's URL. `sitemap.ts` emits the same
  alternates for all routes + 14 detail pages (TR canonical, EN twin).
- **Localized metadata**: `<title>`/description/OG are served per-locale (EN copy
  on `/en`, TR copy on `/`).
- **Structured data**: `Organization` + `WebSite` JSON-LD render site-wide
  (`components/seo/json-ld.tsx`, included in the `[locale]` layout); each detail
  page adds a `CreativeWork` block (canonical TR names). Static, non-user data only.
- **No hardcoded UI strings**: all copy goes through the catalogs (former inline
  `locale === "tr" ? ...` UI strings now live under the `ui.*` namespace).
  `locale === "tr" ? line.name : line.nameEn` is allowed — that reads bilingual
  *data* fields from `data/stations.ts`, not UI copy.
- **Counts are derived**, never hardcoded — from `railLines` / `projects` /
  message `projects`. Don't reintroduce literal "5 lines / 30+ stations" copy.

## Testing
- **Runner:** Vitest (`node` environment — these are pure data/i18n assertions,
  no DOM/React rendering). Config: `vitest.config.ts` (uses `vite-tsconfig-paths`
  so `@/*` resolves as in the app). Run with `npm test`; CI runs it between lint
  and build.
- **What's covered** (`src/__tests__/`): the load-bearing
  `projects.i18nKey ⇄ messages/*.json projects ⇄ project-detail-content` key
  sync, unique URL-safe slugs, every `railLineId`/`locationMatcher` resolving,
  derived cost aggregations, station/marker coordinate sanity, and full
  recursive TR/EN catalog parity (key shape, array lengths, ICU placeholders,
  no empty strings).
- **When you add/rename/remove a project, rail line, or message key**, run
  `npm test` — a drift in any of the three project sources, or a TR/EN catalog
  mismatch, fails the suite (this is the gate that replaces the old
  "remember to keep these in sync" note). Add a focused assertion when you
  introduce a new cross-module invariant.

## Important Notes
- This is NOT a political campaign site
- All proposals must include realistic budget estimates and feasibility notes
- Distinguish between municipal authority vs central government authority
- Use real geographic coordinates for map markers
- Keep the tone professional, data-driven, and citizen-focused

## Commands
```bash
npm run dev                                              # Dev server (port 3000)
npm run build                                            # Production build (also type-checks)
npm run lint                                             # ESLint (flat config)
npm test                                                 # Vitest run (data-integrity + i18n parity)
npm run test:watch                                       # Vitest watch mode (local dev)
docker compose -f docker-compose.prod.yml up -d --build  # Production deploy
```

**CI order** (`.github/workflows/ci.yml`, on PRs + push to `main`):
`npm ci` → `npm run lint` → `npm test` → `npm run build`. All four must be green.

## Deploy
- Production: `https://geleceginadanasi.com.tr` (LIVE)
- Docker port: 3007 (mapped to internal 3000)
- Traefik: HTTPS with Let's Encrypt auto-cert
- GitHub: https://github.com/ahmetabdullahgultekin/gelecegin-adanasi (public)
