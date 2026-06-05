# ROADMAP — Geleceğin Adana'sı

A long-horizon, production-grade plan for an independent, non-political,
data-driven civic platform for Adana. This document is **ambitious but
realistic**: every milestone below is buildable on the current stack (Next.js
App Router + a single Docker service behind Traefik) without a heavyweight
backend, and is sequenced so the site stays shippable at every step.

> History note: this roadmap was rewritten on 2026-06-05 from the original
> 5-phase plan (Stabilize → Content → Engagement → Data → Reach). That earlier
> plan's Phases 1–2 are now substantially **delivered** (see *Done* below); the
> sections that follow expand the remaining vision into a deeper, ten-track
> programme. The original phase headings are preserved in the *Appendix* at the
> bottom for provenance.

---

## Vision

**Geleceğin Adana'sı** ("Adana's Future") presents realistic infrastructure,
transport, tourism, agriculture, and digital-transformation proposals for the
Çukurova region. It is explicitly **not** a political campaign: every proposal
is framed as an engineering/planning recommendation with estimated costs,
feasibility caveats, and a clear municipal-vs-central-government authority
split. The goal is to give citizens, journalists, and decision-makers a
credible, transparent, open-source reference for what a coherent 10-year plan
could look like.

Guiding principles (mirrored in the site's "Değerler" section):
**independence, realism, transparency, participation.**

The north star: the most **credible, bilingual, data-backed, and genuinely
participatory** civic-vision site in Turkey — one that a journalist can cite, a
planner can critique, and a citizen can contribute to, in either language.

---

## Current state (verified at HEAD, 2026-06-05)

**Stack:** Next.js 16 (App Router, Turbopack) + React 19 + TypeScript +
Tailwind CSS 4 + Leaflet/react-leaflet over OpenStreetMap; custom React-context
TR/EN i18n with URL (`?lang`) + localStorage persistence. Deployed as a
standalone Docker image behind Traefik on Hetzner at `geleceginadanasi.com.tr`
(compose service `gelecegin-adanasi`, host `3007` → container `3000`).

**Content model** (`src/data/stations.ts` + `src/data/projects.ts` +
`src/lib/i18n.ts`): **6 rail lines / 49 line-stations**, **21 project-location**
markers, **14 projects** — each now with a stable slug, structured numeric cost
(`costUsdM`), category, attached rail lines and map markers, plus a long-form
bilingual detail page (`/projeler/[slug]`) carrying feasibility notes, an
authority breakdown, phasing, highlights, related lines/locations, and a
no-account feedback link.

**SEO/i18n:** per-route metadata, canonical + **hreflang** (`tr-TR`/`en-US`/
`x-default`) on every route and all 14 detail pages, a bilingual sitemap with
`?lang=en` alternates, `Organization` + `WebSite` JSON-LD site-wide and a
`CreativeWork` block per project, `<html lang>` synced to the active locale, and
an OG image.

**Build health:** `npm run lint` + `npm run build` green; CI runs both on PRs;
`.dockerignore` trims the build context; Leaflet CSS is self-hosted (no CDN).

---

## The ten tracks

Each track is independently valuable and can be advanced in parallel. Within a
track, items are ordered. A track is "done enough" when its **Outcome** holds.

### Track A — Content depth & editorial credibility
*Make every claim sourceable.*
- [x] Per-project detail routes (`/projeler/[slug]`) with feasibility, authority
  split, phasing, highlights, related lines/locations.
- [ ] **Source citations**: attach 1–3 references (news, ministry plans, TÜİK /
  TCDD data) to each project; render a "Kaynaklar / Sources" block.
- [ ] **Methodology page** (`/yontem`): how cost bands, authority splits, and
  feasibility ratings are assigned; what "estimate" means here.
- [ ] **Glossary / authority map**: a plain-language explainer of which body
  (Belediye / Bakanlık / TCDD / ASKİ / AFAD / YÖK) does what, linked from every
  authority chip.
- [ ] **Changelog / "what changed"** view so the plan reads as a living document.
- **Outcome:** every number and authority claim is traceable to a source or an
  explicit, documented assumption.

### Track B — Bilingual SEO excellence
*EN must be a first-class citizen, not a toggle.*
- [x] hreflang pairing + bilingual sitemap + JSON-LD + `<html lang>` sync +
  locale persistence (URL + storage).
- [ ] **Server-rendered EN** on `?lang=en` (read `searchParams.lang` in the
  server layer so the EN body ships in the initial HTML, not just post-hydration)
  — upgrades EN from "JS-rendered crawlable" to "static crawlable".
- [ ] **Localized metadata**: EN `<title>`/description served when `lang=en`.
- [ ] **BreadcrumbList + per-page WebPage JSON-LD**; `FAQPage` on About.
- [ ] **OG image per project** (generated at build via the existing SVG→WebP
  pipeline) so each detail page unfurls with its own card.
- [ ] Submit sitemap to Google/Bing Search Console; track coverage of EN URLs.
- **Outcome:** both languages are independently indexed, rich-result-eligible,
  and share cleanly via social cards.

### Track C — Data & visualization
*Prove the "data-driven" claim.*
- [x] Structured `costUsdM` per project; budget-by-category bar chart derived
  from data (no hardcoded constant); homepage budget figure derived.
- [ ] **Structured fields v2**: line length (km), station count, ridership
  estimate, jobs, CO₂ delta — typed, optional, with provenance.
- [ ] **Phasing Gantt** across the 4-phase, 10-year timeline.
- [ ] **Cost-vs-impact scatter** (capital cost × estimated daily ridership /
  beneficiaries), filterable by category and authority.
- [ ] **Map data overlays**: line-length labels, station catchment circles,
  optional population/flood-risk heat layer (open data).
- **Outcome:** charts and the map all read from one typed dataset; changing the
  data changes every figure on the site.

### Track D — Interactive maps
*The map is the product; make it best-in-class.*
- [x] Self-hosted Leaflet CSS; category filters with `aria-pressed`.
- [ ] **Deep-linkable map state** (`/harita?lines=m1,ring&cat=tourism&zoom=…`)
  so a filtered view is shareable and crawlable.
- [ ] **Line detail drawer**: click a line → station list, type, length, the
  projects it realises (cross-link to detail pages).
- [ ] **Keyboard-navigable markers** + a non-map fallback list for screen
  readers and no-JS clients.
- [ ] **Vector basemap option** + Turkish labels; offline-friendly tiles.
- **Outcome:** the map is shareable, accessible, and bidirectionally linked with
  the project content.

### Track E — Civic engagement & participation
*From brochure to two-way tool.*
- [x] No-account "Görüş Bildir" feedback links (pre-filled GitHub Issues) on the
  homepage CTA and every project page.
- [ ] **Structured feedback form** (no-backend form service, e.g. Formspree /
  Tally) so non-GitHub users can submit per-project input.
- [ ] **Lightweight "support / petition" signal** per project (privacy-first,
  no PII — e.g. anonymized count via a serverless counter) clearly labelled as
  a non-binding interest indicator, not a vote.
- [ ] **Public comment digest**: periodically summarize received feedback into a
  visible "Citizen input" section under the Participation value.
- [ ] **Issue templates** (bug / data-correction / proposal) in the repo.
- **Outcome:** citizens can contribute meaningfully without a developer account,
  and their input is visibly reflected.

### Track F — Performance & Core Web Vitals
*Fast on a mid-range phone over Turkish mobile networks.*
- [x] Optimized WebP hero (12 KB) via `next/image`; lazy map (`ssr:false`,
  dynamic import); self-hosted CSS.
- [ ] **Lighthouse baseline** captured post-deploy; LCP/CLS/TBT tracked.
- [ ] Font strategy audit (subset, `display:swap` already set; consider
  `next/font` preload + fewer weights).
- [ ] Route-level code-split for Leaflet so non-map routes don't pay for it.
- [ ] Image pipeline for any future photography (AVIF/WebP, responsive `sizes`).
- **Outcome:** ≥ 95 Performance, green CWV on mobile, no layout shift.

### Track G — Accessibility (WCAG 2.2 AA)
- [x] `aria-pressed` map filters; focus-visible rings on cards/buttons; reduced-
  motion handling; semantic breadcrumb on detail pages.
- [ ] Full keyboard pass across map markers and filters; visible skip-link.
- [ ] Colour-contrast audit of category palette on white and on dark bands.
- [ ] Screen-reader pass with the `<html lang>` switch verified in NVDA/VoiceOver.
- [ ] Automated a11y checks (axe) wired into CI.
- **Outcome:** WCAG 2.2 AA across all routes, enforced in CI.

### Track H — Analytics & measurement
*Iterate on evidence, privacy-first.*
- [ ] **Privacy-respecting analytics** (Plausible/Umami self-host or
  cookieless) — no PII, KVKK/GDPR-clean, documented in a privacy note.
- [ ] Track: language split, top projects, map-filter usage, feedback CTR.
- [ ] A "most-viewed proposals" surface driven by aggregate, anonymized data.
- **Outcome:** product decisions are informed by anonymized usage, with a
  published privacy policy.

### Track I — Trust, governance & compliance
- [ ] **Privacy policy + KVKK note** (`/gizlilik`) covering analytics and any
  form service.
- [ ] **"How this is funded / who maintains this"** transparency page.
- [ ] **Data licence** (content CC-BY, code MIT) stated explicitly.
- [ ] **`security.txt`** + a contact path for corrections.
- **Outcome:** the independence and transparency claims are backed by visible
  governance artefacts.

### Track J — Platform & DX hardening
- [x] CI (lint + build) gating PRs; `.dockerignore`; Dependabot.
- [ ] **Visual-regression / Lighthouse-CI** check on PRs.
- [ ] **Content as data**: keep all copy in `i18n.ts` / typed data modules;
  add a unit test asserting TR/EN key parity and slug↔i18nKey integrity.
- [ ] **Preview deploys** per PR (optional) for review.
- [ ] Error monitoring (Sentry or log-based) for the standalone server.
- **Outcome:** changes are safe, reviewable, and regressions are caught before
  prod.

---

## Sequencing (suggested)

1. **Now → near-term:** Track B server-rendered EN + localized metadata;
   Track F Lighthouse baseline; Track J TR/EN key-parity test.
2. **Next:** Track C structured-fields v2 + Gantt; Track D deep-linkable map &
   line drawer; Track E structured feedback form.
3. **Then:** Track A citations + methodology; Track G full a11y + axe-in-CI;
   Track H privacy-first analytics + Track I privacy/governance pages.
4. **Ongoing:** Track A changelog, Track J visual-regression/Lighthouse-CI.

---

## Done (delivered)

- **Stabilize & secure:** Next 16.2.6 patched + redeployed; OG image; lint green;
  CI; self-hosted Leaflet CSS; `.dockerignore`; counts derived from data.
- **Content depth:** all 14 per-project detail pages with feasibility/authority/
  phasing/highlights/related; "Detaylı İncele" CTA wired; illustrated projects
  hero via `next/image`.
- **Bilingual SEO baseline:** locale persistence (URL + storage), `<html lang>`
  sync, hreflang on every route + detail page, bilingual sitemap, JSON-LD
  (Organization/WebSite/CreativeWork), harita metadata corrected.
- **Data viz:** structured `costUsdM`, budget-by-category chart, derived budget
  figure.
- **Engagement:** no-account feedback links site-wide.
- **A11y baseline:** `aria-pressed` map filters, focus-visible states, semantic
  breadcrumbs.

---

## Out of scope / explicit non-goals
- No political affiliation, endorsement, or campaigning — proposals only.
- Cost and timeline figures are **estimates**, not feasibility-study outputs
  (the About-page disclaimer must remain).
- Keep the deployment model simple (single Docker service behind Traefik); no
  heavyweight backend unless a feature genuinely requires it. Engagement and
  analytics features must prefer no-backend / serverless, privacy-first options.

---

## Future / Professionalization

Beyond the ten tracks, a credible path to a "production civic product":

- **Editorial & partnerships:** a named editorial board / advisory note;
  collaboration with a university planning department or local NGO for review;
  a public "request a correction" SLA. Moves the project from "one engineer's
  open-source side project" to a community-reviewed reference.
- **Data partnerships:** ingest open data (TÜİK, TCDD timetables, Belediye open
  data, OSM) on a schedule; show data freshness/provenance badges.
- **Internationalization beyond TR/EN:** Arabic (large regional community) as a
  third locale; the i18n + hreflang architecture already generalizes.
- **Native-feeling distribution:** installable PWA (offline map tiles, "add to
  home screen"); shareable per-project cards; embeddable widgets (a single
  project or the map) for journalists' articles.
- **Civic-tech reusability:** factor the platform into a reusable "city-vision"
  template so other cities (Mersin, Gaziantep) can fork it with their own data —
  the typed data model + i18n + map are already city-agnostic.
- **Governance & sustainability:** a transparency/funding page, a documented
  contribution + moderation policy, automated dependency + a11y + Lighthouse
  gates, error monitoring, and a lightweight on-call/runbook so the site stays
  trustworthy and maintained over years, not weeks.
- **Measurement of impact (not vanity):** track whether proposals get cited or
  picked up (press mentions, council references) rather than raw pageviews.

---

## Appendix — original 5-phase plan (preserved for provenance)

1. **Phase 1 — Stabilize & secure:** patch/redeploy, branch/release reconcile,
   OG image, green lint, add CI, remove CDN dependency. *(Delivered.)*
2. **Phase 2 — Content depth & credibility:** per-project detail routes,
   feasibility/authority/phasing, "Detaylı İncele", imagery, derived counts.
   *(Delivered.)*
3. **Phase 3 — Engagement & participation:** lower the barrier to citizen input
   (Issue templates, no-backend feedback), surface community input, changelog.
   *(Partially delivered — feedback links live; form/digest pending → Track E.)*
4. **Phase 4 — Data & visualization:** structured numeric fields + real charts
   (budget-by-category, Gantt, map overlays). *(Started — budget chart live →
   Track C.)*
5. **Phase 5 — Reach, performance & SEO:** bilingual SEO, JSON-LD, Lighthouse
   tuning, analytics. *(Baseline delivered → Tracks B, F, H.)*
