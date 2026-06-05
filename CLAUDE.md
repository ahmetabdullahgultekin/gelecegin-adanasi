# Gelecegin Adanasi - Project Guide

## Project Overview
Independent, non-political urban planning and vision platform for Adana, Turkey.
Goal: Present data-driven, realistic infrastructure proposals for public benefit.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Map**: Leaflet.js + React-Leaflet (OpenStreetMap)
- **i18n**: Custom context-based TR/EN with full Turkish character support
- **Deployment**: Docker (standalone output) + Traefik reverse proxy on Hetzner CX43
- **Package Manager**: npm
- **Port**: 3007 (mapped to internal 3000)

## Project Structure
```
src/
  app/                       # Next.js App Router pages
    layout.tsx               # Root layout: metadata, hreflang alternates, JSON-LD
    page.tsx                 # Landing / hero page (+ budget chart, CTA)
    client-layout.tsx        # Client layout (LocaleProvider + Header/Footer)
    sitemap.ts               # Bilingual sitemap (hreflang + all detail pages)
    robots.ts                # robots.txt
    projeler/page.tsx        # All projects listing (illustrated hero)
    projeler/[slug]/page.tsx # Per-project detail (SSG, generateStaticParams)
    harita/page.tsx          # Interactive map with Leaflet
    hakkinda/page.tsx        # About page (stats derived from data)
    {route}/layout.tsx       # Per-route metadata + alternatesFor()
  components/
    layout/                  # Header, Footer
    map/                     # RailMap (dynamic import, SSR disabled)
    projects/                # ProjectCard, Timeline, BudgetChart, ProjectDetail
    seo/                     # JsonLd (Organization + WebSite)
  data/
    stations.ts              # Rail lines, stations, project-location markers
    projects.ts              # Structured project meta: slug, costUsdM, category,
                             #   rail-line + map-marker links, cost aggregations
  lib/
    i18n.ts                  # All translations (TR + EN), incl. common.* UI labels
    locale-context.tsx       # Locale context: ?lang URL + localStorage persistence,
                             #   <html lang> sync, setLocale/toggleLocale
    project-detail-content.ts# Long-form bilingual detail copy (feasibility, etc.)
    site.ts                  # SITE_URL, LOCALES, alternatesFor() (hreflang helper)
public/
  og-image.png               # 1200×630 social card
  images/projects-hero.webp  # Illustrated projects hero (next/image static import)
scripts/                     # SVG sources for the OG image + hero (rasterized via sharp/rsvg)
docs/                        # Local docs (gitignored) — includes original brainstorm chat
.github/workflows/ci.yml     # npm ci + lint + build on PRs and push to main
```

## Conventions
- All user-facing content in **Turkish** (with proper characters: ş, ç, ğ, ı, ö, ü, İ)
- English translation available via locale toggle
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
- **Locale** is resolved from `?lang=` → `localStorage` → `<html lang>` (default
  `tr`), persisted on toggle, and kept in sync with `<html lang>` + the URL via
  `src/lib/locale-context.tsx`. Use `useLocale()` for `locale`/`t`/`toggleLocale`
  /`setLocale`.
- **hreflang**: every route's metadata uses `alternatesFor(path)` from
  `src/lib/site.ts`, pairing the TR (canonical) URL with its `?lang=en` twin
  (`tr-TR` / `en-US` / `x-default`). `sitemap.ts` emits the same alternates for
  all routes + detail pages.
- **Structured data**: `Organization` + `WebSite` JSON-LD render site-wide
  (`components/seo/json-ld.tsx`, included in root layout); each detail page adds
  a `CreativeWork` block. JSON-LD is built from static, non-user data only.
- **Counts are derived**, never hardcoded — from `railLines` / `projects` /
  `t.projects`. Don't reintroduce literal "5 lines / 30+ stations" copy.

## Important Notes
- This is NOT a political campaign site
- All proposals must include realistic budget estimates and feasibility notes
- Distinguish between municipal authority vs central government authority
- Use real geographic coordinates for map markers
- Keep the tone professional, data-driven, and citizen-focused

## Commands
```bash
npm run dev                                              # Dev server (port 3000)
npm run build                                            # Production build
npm run lint                                             # ESLint
docker compose -f docker-compose.prod.yml up -d --build  # Production deploy
```

## Deploy
- Production: `https://geleceginadanasi.com.tr` (LIVE)
- Docker port: 3007 (mapped to internal 3000)
- Traefik: HTTPS with Let's Encrypt auto-cert
- GitHub: https://github.com/ahmetabdullahgultekin/gelecegin-adanasi (public)
