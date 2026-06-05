# ROADMAP — Geleceğin Adana'sı

## Vision

**Geleceğin Adana'sı** ("Adana's Future") is an independent, non-political,
data-driven civic platform that presents realistic infrastructure, transport,
tourism, agriculture, and digital-transformation proposals for Adana, Turkey.
It is explicitly **not** a political campaign: every proposal is framed as an
engineering/planning recommendation with estimated costs, feasibility caveats,
and a clear municipal-vs-central-government authority split. The goal is to give
citizens, journalists, and decision-makers a credible, transparent, open-source
reference for what a coherent 10-year plan for the Çukurova region could look
like.

Guiding principles (mirrored in the site's "Değerler" section): **independence,
realism, transparency, participation.**

## Current state (verified at HEAD)

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4 +
Leaflet/react-leaflet over OpenStreetMap; custom React-context TR/EN i18n.
Deployed as a standalone Docker image behind Traefik on Hetzner at
`geleceginadanasi.com.tr` (compose service `gelecegin-adanasi`, host `3007` →
container `3000`).

**What exists and works:**
- Four routes: `/` (landing), `/projeler`, `/harita` (interactive map),
  `/hakkinda` — plus per-route metadata layouts for projeler/harita/hakkinda.
- A rich, fully bilingual content model in `src/data/stations.ts`:
  **6 rail lines** (metro, ring tram, two commuter lines, a tourism/coast line,
  and a coastal branch) with ~49 line-stations, plus **21 project-location**
  markers across hub/transport/tourism/agriculture/digital/urban categories —
  all with real coordinates and TR+EN names/descriptions.
- **14 projects** with TR+EN title/description/type/cost/authority, a 4-phase
  10-year timeline, and a category-filtered Leaflet map.
- i18n in `src/lib/i18n.ts` is **fully parallel TR/EN** for every surface
  (nav, hero, sections, phases, all 14 projects, about, footer, common).
- SEO baseline: `robots.ts`, `sitemap.ts`, rich OpenGraph/Twitter metadata,
  canonical tags, `metadataBase`.
- The Opus civic redesign (PR #2) is merged to `origin/main` (`627d5df`):
  modern landing with on-scroll reveal, CSS-variable design tokens, responsive
  header/footer, accessible mobile menu.

**Known gaps / debt (see TODO.md for the actionable list):**
- **Security:** Dependabot PR #3 (Next 16.2.3 → 16.2.6, MERGEABLE/CLEAN) is
  unmerged; `package.json` still pins `next 16.2.2`. The **live container is
  `Up 6 weeks`** — it predates the redesign merge and the security bump, so
  production is serving stale, un-patched code and needs a rebuild.
- **Release state:** local checkout is on the (already-merged) `feat/opus-redesign`
  branch; local `main` is 3 commits behind `origin/main`.
- **Missing asset:** `public/og-image.png` is referenced in metadata but does
  not exist (social previews 404 the image).
- **Build health:** `npm run lint` fails on one React-19 hooks rule in
  `rail-map.tsx`; there is no CI to catch it. Docker `next build` does not lint,
  so the image still builds.
- **Content drift:** prose/About hardcode "5 lines / 30+ stations" (data says
  6 lines), and README lists 15 projects vs the app's 14.
- **i18n reach:** the TR/EN toggle is client-only with no persistence and no
  URL/hreflang representation, so the EN translation resets on reload and is
  invisible to search engines; `<html lang>` stays `tr`.
- **External dependency:** the map injects Leaflet CSS from the unpkg CDN at
  runtime (a third-party request and single point of failure).

## Next up (near-term, ordered)

1. **Security & release (TODO P0):** merge PR #3, bump `package.json` next pins,
   sync local to `origin/main`, **rebuild the live container**, and ship the
   1200×630 `og-image.png`.
2. **Correctness & build health (TODO P1):** fix the stale line/station/project
   counts, fix the lint error, add a lint+build CI workflow, self-host Leaflet
   CSS, add `.dockerignore`.
3. **i18n/SEO/a11y hardening (TODO P2):** persist locale, sync `<html lang>`,
   give EN a crawlable URL + hreflang + sitemap entry, complete per-route
   metadata, add JSON-LD, and pass a map-accessibility check.

---

## Phased roadmap

### Phase 1 — Stabilize & secure (now)
Patch and redeploy (Next 16.2.6), reconcile branch/release state, ship the OG
image, green the lint, add CI, remove the CDN dependency. Outcome: production is
patched, reproducible, and gated by automated checks. *(TODO P0 + most of P1.)*

### Phase 2 — Content depth & credibility
Per-project detail routes (`/projeler/[slug]`) carrying feasibility notes,
authority breakdown, phasing, and the project's own map markers; wire the unused
"Detaylı İncele" CTA; add licensed imagery via `next/image`; tighten the
data so counts are always derived, never hardcoded. Outcome: every proposal has
a crawlable, shareable, evidence-backed page.

### Phase 3 — Engagement & participation
Lower the barrier to citizen input beyond "open a GitHub PR": GitHub Issue
templates and/or a no-backend feedback form, and surface community input in the
"Katılımcılık" value. Optionally a changelog / "what changed" view so the plan
reads as a living document. Outcome: the platform becomes a two-way civic tool,
not just a brochure.

### Phase 4 — Data & visualization
Introduce structured numeric fields (cost, length, ridership estimates) into the
data model and drive real charts (budget-by-category, phasing Gantt, map
heat/flow overlays) instead of the hand-maintained `~$3B` constant. Outcome: the
"data-driven" claim is visibly true and self-updating.

### Phase 5 — Reach, performance & SEO
Full bilingual SEO (server-rendered EN routes + hreflang + sitemap), JSON-LD
structured data, Lighthouse-driven performance tuning (LCP/CLS, image
optimization, font strategy), and analytics-informed iteration. Outcome:
discoverable in both languages, fast, and measurable.

---

## Out of scope / explicit non-goals
- No political affiliation, endorsement, or campaigning — proposals only.
- Cost and timeline figures are **estimates**, not feasibility-study outputs
  (the About page disclaimer must remain).
- Keep the deployment model simple (single Docker service behind Traefik); no
  heavyweight backend unless a feature genuinely requires it.
