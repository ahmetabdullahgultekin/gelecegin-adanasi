# TODO — Geleceğin Adana'sı

Actionable backlog for the civic urban-vision platform. Grouped by priority.
Each item: scope, affected paths, rationale, and a verifiable done-condition.

> Convention: `- [ ]` open, `- [x]` done. Source code is the truth — verify
> counts/claims against `src/data/stations.ts` and `src/lib/i18n.ts` at HEAD,
> not against this file or the README.

> Note (2026-06-06): the P0–P3 items below are the original 2026-06-05 backlog,
> all delivered. Some descriptions predate the **next-intl `[locale]` routing
> migration** (PR #10) — e.g. `?lang=en`, `locale-context.tsx`, `src/lib/i18n.ts`
> as the string source. Those concerns are now handled by `messages/{tr,en}.json`
> + `src/i18n/*` + `proxy.ts`; the historical text is kept for provenance. Live
> planning lives in **ROADMAP.md** (ten tracks). Newest work is logged below.

---

## Newest (post-next-intl)

- [x] **Automated data-integrity + i18n-parity test suite (Vitest), wired into CI.**
  <!-- DONE 2026-06-06: added Vitest 3 + vite-tsconfig-paths (devDeps),
       vitest.config.ts (node env), and src/__tests__/{data-integrity,
       i18n-parity}.test.ts (29 tests). Asserts: projects.i18nKey ⇄
       messages/*.json projects ⇄ project-detail-content three-way key sync;
       unique URL-safe slugs; every railLineId/locationMatcher resolves; derived
       cost aggregations consistent; station/marker coords in the Çukurova box;
       full recursive TR/EN catalog parity (key shape, array lengths, ICU
       placeholders, no empty leaf strings). `npm test` = `vitest run`; CI now
       runs lint → test → build. Negative-tested (broke a key/array/empty-string
       → 4 failures, restored byte-identical). lint + test + build all green. -->

  - Why: tech-stack review (2026-06-05) priority #3 and Track J's "content as
    data" item; both review docs flagged "silent-null on a typo'd key" as the
    biggest unguarded defect class. CLAUDE.md's "MUST stay in sync" invariant
    was previously unenforced.
  - Done when: `npm test` runs in CI between lint and build and fails on any
    project-source drift or TR/EN catalog mismatch. ✔

---

## P0 — Security / release hygiene (do first)

- [x] **Merge Dependabot security PR #3 (Next 16.2.3 → 16.2.6).**
  <!-- DONE 2026-06-05: PR #3 squash-merged (origin/main fb6feec). package.json
       next already 16.2.6 (bumped by the PR); also bumped eslint-config-next
       16.2.2 → 16.2.6 so a fresh install can't reintroduce an old minor. Lock
       resolves next@16.2.6 + eslint-config-next@16.2.6. -->

  - PR: `ahmetabdullahgultekin/gelecegin-adanasi#3` (branch
    `dependabot/npm_and_yarn/npm_and_yarn-152f59e559`). Verified state:
    `MERGEABLE` / `mergeStateStatus: CLEAN`, +41/−41 in `package-lock.json`.
  - Why: closes the advisories fixed across the 16.2.x line — DoS, middleware
    authorization bypass, reflected/content XSS, and cache-poisoning classes
    (7 High + 4 Moderate + 2 Low). `package.json` still pins `next: 16.2.2`
    locally; PR bumps the lock to 16.2.6.
  - Note: `package.json` `"next"` and `"eslint-config-next"` are pinned to
    `16.2.2` (range-less). After merging the lock bump, also bump those two
    `package.json` lines to `16.2.6` so a fresh `npm install` can't reintroduce
    an old minor.
  - Done when: `gh pr view 3 -R ahmetabdullahgultekin/gelecegin-adanasi` shows
    `MERGED`, and `origin/main` `package-lock.json` resolves `next@16.2.6`.

- [x] **Sync local checkout to `origin/main`.**
  <!-- DONE 2026-06-05: local main fast-forwarded to origin/main, then reset to
       fb6feec (post-#3). Plan docs cherry-picked. Exec work on
       exec/p0-2026-06-05 off the synced main. -->

  - State: local working copy is on `feat/opus-redesign` (= `a4e9b99`); the
    redesign is already merged to `origin/main` at `627d5df` (merge of PR #2).
    Local `main` is **3 commits behind** `origin/main`.
  - Action: `git checkout main && git pull --ff-only` (then optionally delete
    the merged local `feat/opus-redesign`). Re-pull after #3 merges.
  - Why: future work should branch off the canonical `main`, not a stale
    feature branch; avoids divergence and accidental re-merge of old code.
  - Done when: `git rev-parse main` == `git rev-parse origin/main`, and
    `git status` on `main` reports up-to-date.

- [x] **Rebuild & redeploy the live container to pick up Next 16.2.6.**
  <!-- DONE 2026-06-05: disk at 87% (< 90% gate) → rebuild authorized.
       `docker compose -f docker-compose.prod.yml up -d --build` (no --env-file:
       the compose has no env_file/${VAR} interpolation, no .env.prod exists, and
       the site uses zero runtime/build env — passing a missing file would error).
       Container recreated (was "Up 6 weeks"); `next` inside = 16.2.6;
       http://localhost:3007/ = 200; https://geleceginadanasi.com.tr/ = 200;
       /og-image.png = 200 (140KB); homepage prose now serves "6 hat / 49 durak". -->

  - Target: Docker service `gelecegin-adanasi` (Hetzner, behind Traefik,
    `geleceginadanasi.com.tr`). Compose: `docker-compose.prod.yml`
    (host `3007` → container `3000`). The running container is currently
    `Up 6 weeks` on image `gelecegin-adanasi-web` — it predates both the
    redesign merge and #3, so it is serving stale code.
  - Action (operator runs — **do not auto-deploy from analysis**): after #3 is
    merged and `main` pulled on the server,
    `docker compose -f docker-compose.prod.yml up -d --build`.
  - Why: the security fix only protects the site once the new bundle is live.
  - Done when: the container's build date is post-deploy and the served
    `next` runtime is 16.2.6 (e.g. response headers / build manifest), and
    `https://geleceginadanasi.com.tr` returns 200 with the redesign UI.

- [x] **Create the Open Graph image at `public/og-image.png` (1200×630).**
  <!-- DONE 2026-06-05: public/og-image.png is a 1200×630 PNG (civic navy→teal
       gradient, "Geleceğin Adana'sı" wordmark, eyebrow "ADANA · 10 YILLIK
       VİZYON", tagline "Bağımsız · Veri odaklı · Toplum yararına", domain).
       Reproducible source at scripts/og-image.svg (rsvg-convert). Ships under
       public/ so the Dockerfile copies it. -->

  - Referenced but missing: `src/app/layout.tsx` `openGraph.images` and
    `twitter.images` both point at `/og-image.png`; the file does not exist
    (`public/` only has an empty `images/`). Social/link unfurls currently
    404 the preview image.
  - Spec: 1200×630 PNG, brand-aligned (civic navy→teal gradient + "Geleceğin
    Adana'sı" wordmark + tagline "Bağımsız · Veri odaklı · Toplum yararına").
  - Done when: `public/og-image.png` exists at 1200×630, ships in the Docker
    image (it's under `public/`, already copied by the Dockerfile), and a link
    debugger (e.g. Open Graph preview) renders it for the homepage URL.

---

## P1 — Correctness, content integrity, build health

- [x] **Fix stale "5 lines / 30+ stations" copy to match the data (6 lines).**
  <!-- DONE 2026-06-05: homepage rail-overview prose now interpolates
       totalLines/totalStations (6 lines / 49 stations), TR+EN. hakkinda/page.tsx
       stats grid now derives projects (Object.keys(t.projects)=14), lines
       (railLines.length=6), stations (sum=49), phases (Object.keys(t.phases)=4)
       — no more hardcoded "5"/"30+"/"14"/"4". -->

  - Truth in `src/data/stations.ts`: `railLines.length === 6`
    (m1-extension, ring-tram, cukurovaray-ew, cukurovaray-north, blue-line,
    yumurtalik-branch). Hardcoded "5 lines / 30+ stations" prose is wrong in:
    - `src/app/page.tsx` rail-overview paragraph (~lines 228–229).
    - `src/app/hakkinda/page.tsx` stats grid (~lines 75–78: `"5"` rail lines,
      `"30+"` stations, `"14"` projects are hardcoded strings).
  - Note: the homepage **stat strip** already computes `totalLines` /
    `totalStations` from data correctly — only the prose and the About page
    are out of sync. Prefer deriving the About stats from data too.
  - Done when: every user-visible line/station/project count is derived from
    `railLines` / `projectLocations` (or matches them), TR and EN both.

- [x] **Reconcile README project count (15) with the app (14).**
  <!-- DONE 2026-06-05: removed the standalone "Akıllı Tarım Merkezi" row
       (folded its detail into the Agropark row, no content lost) and renumbered
       8–15 → 8–14. README now lists 14 projects matching i18n's 14 keys. -->

  - `README.md` numbers projects 1–15 (splits "Akıllı Tarım Merkezi" out);
    `src/lib/i18n.ts` `projects` has 14 keys and the UI renders 14.
  - Done when: README and i18n agree on the canonical project list/count.

- [x] **Fix the ESLint error so `npm run lint` passes.**
  <!-- DONE 2026-06-05: RailMap is loaded via dynamic(ssr:false) on the harita
       page, so the outer `mounted` useEffect/setState gate was redundant.
       Removed it and folded MapInner into RailMap (MapInner's own !components
       guard already covers the client-only load). `npm run lint` exits 0. -->

  - `npm run lint` currently fails: `src/components/map/rail-map.tsx:30`
    `react-hooks/set-state-in-effect` — `setMounted(true)` called synchronously
    in a mount `useEffect`. (Next 16 / React 19 stricter rule.)
  - The SSR-guard pattern is legitimate; rewrite to satisfy the rule (e.g. the
    `dynamic(... { ssr: false })` already used on the harita page makes the
    `mounted` gate redundant — the inner client component can drop it), or use
    the sanctioned escape hatch.
  - Done when: `npm run lint` exits 0.

- [x] **Add a CI workflow (lint + build) gating PRs.**
  <!-- DONE 2026-06-05: .github/workflows/ci.yml runs npm ci + npm run lint +
       npm run build on pull_request and push to main (Node 22, npm cache,
       read-only permissions, concurrency cancel-in-progress). -->

  - No `.github/workflows/` exists; Dependabot opens PRs with no checks, and
    lint regressions (above) ship undetected. Docker `next build` does not run
    `next lint` by default, so the lint error does not block the image.
  - Done when: a GitHub Actions workflow runs `npm ci`, `npm run lint`,
    `npm run build` on PRs to `main`, and is green on a test PR.

- [x] **Self-host Leaflet CSS instead of the unpkg CDN.**
  <!-- DONE 2026-06-05: replaced the runtime <link> to unpkg.com with a static
       `import "leaflet/dist/leaflet.css"` in rail-map.tsx (leaflet@^1.9.4 is
       already a direct dep). No third-party request on the harita page. -->

  - `src/components/map/rail-map.tsx:~92` injects
    `https://unpkg.com/leaflet@1.9.4/dist/leaflet.css` at runtime. This is a
    third-party request on the map page (privacy + a single point of failure;
    breaks if unpkg is unreachable, e.g. from restrictive networks in Turkey).
  - Action: import `leaflet/dist/leaflet.css` (the package is already a
    dependency) or copy it into `public/` and reference locally.
  - Done when: the harita page makes no request to `unpkg.com` and the map
    still renders with correct tile/marker styling.

- [x] **Add a `.dockerignore`.**
  <!-- DONE 2026-06-05: .dockerignore added — excludes node_modules, .next, out,
       dist, .git, .github, .env*, editors, docs, *.md (keeps README.md). Image
       still builds + runs (verified). -->
  - None present. The build context currently includes `node_modules`,
    `.next`, `.git`, and `docs/` (incl. the 143 KB brainstorm PDF), slowing
    builds and bloating context sent to the daemon.
  - Done when: `.dockerignore` excludes at least
    `node_modules .next .git docs *.md` (keep what the build needs) and the
    image still builds and runs.

---

## P2 — i18n, SEO, accessibility

- [x] **Persist locale across navigation/reload.**
  <!-- DONE 2026-06-05: locale-context.tsx now resolves the initial locale from
       ?lang= → localStorage → <html lang> (via a lazy useState initializer, so
       the React-19 set-state-in-effect rule stays satisfied) and writes the
       choice back to localStorage on every change. Survives reload + route
       changes. -->
  - `src/lib/locale-context.tsx` initializes `useState<Locale>("tr")` with no
    persistence — every page change / refresh resets EN users back to TR.
  - Action: hydrate from `localStorage` (or a cookie) and write on toggle;
    guard for SSR.
  - Done when: switching to EN survives a full reload and client-side route
    changes.

- [x] **Keep `<html lang>` in sync with the active locale.**
  <!-- DONE 2026-06-05: a sync effect in locale-context.tsx sets
       document.documentElement.lang = locale on every change. SSR default stays
       lang="tr"; the client updates it to "en" when EN is active. -->
  - `src/app/layout.tsx` hardcodes `lang="tr"`. When a user switches to EN the
    document language is still advertised as Turkish (screen-reader
    pronunciation + SEO signal wrong).
  - Action: update `document.documentElement.lang` on locale change (client),
    or move locale into the route so the server can set it.
  - Done when: `document.documentElement.lang` is `"en"` while EN is active.

- [x] **Make EN content discoverable by search engines (hreflang / lang URL).**
  <!-- DONE 2026-06-05: src/lib/site.ts `alternatesFor(path)` pairs each TR
       (canonical) URL with its `?lang=en` twin via hreflang (tr-TR / en-US /
       x-default) in every route's metadata; sitemap.ts emits the same
       alternates for all routes + 14 detail pages. The ?lang=en URL is
       linkable/shareable and the client renders EN from it. Verified in the
       built sitemap.xml.body + per-page HTML <link rel="alternate" hrefLang>. -->
  - i18n is 100% client-side toggle with no URL representation, so the EN
    translation is invisible to crawlers and not linkable. There is no
    `hreflang` and `sitemap.ts` lists only TR URLs.
  - Options: a `?lang=en` / `/en` segment with server-rendered content +
    `alternates.languages` (hreflang) in metadata + EN entries in
    `sitemap.ts`. (Larger change — design first.)
  - Done when: an EN URL is crawlable, self-canonical/hreflang-paired with TR,
    and present in the sitemap.
  - Follow-up (ROADMAP Track B): server-render the EN body on `?lang=en` so EN
    ships in the initial HTML, not just post-hydration.

- [x] **Add per-page metadata for the harita route.**
  <!-- DONE 2026-06-05: harita/layout.tsx already had a unique title/description/
       OG; fixed the stale "5 hat / 30+ durak" copy to "6 hat / 49 durak" and
       switched canonical → alternatesFor("/harita") (canonical + hreflang). -->
  - `src/app/harita/layout.tsx` exists — confirm it sets a unique
    `title`/`description`/canonical/OG like `projeler/layout.tsx` does.
  - Done when: `/harita` has a distinct `<title>`, description, and
    `alternates.canonical: "/harita"`.

- [x] **Add `structured data` (JSON-LD) for the organization/site.**
  <!-- DONE 2026-06-05: components/seo/json-ld.tsx renders Organization +
       WebSite JSON-LD, included in the root layout (so it ships on every page's
       initial HTML). Each detail page adds a CreativeWork block. Built HTML
       confirmed to contain "@type":"Organization"/"WebSite"/"CreativeWork".
       Built from static, non-user data only. -->
  - No `Organization`/`WebSite` schema. Adds rich-result eligibility and a
    clearer entity for the civic project.
  - Done when: a `WebSite` + `Organization` JSON-LD block renders in `<head>`
    and validates in a structured-data testing tool.

- [x] **Map page accessibility pass.**
  <!-- DONE 2026-06-05: rail-map.tsx filter buttons now carry type="button",
       aria-pressed reflecting on/off, an aria-label announcing state on the
       category buttons, and focus-visible outline rings for keyboard use.
       (Full keyboard marker traversal + non-map fallback list tracked in
       ROADMAP Track D/G.) -->
  - Leaflet `CircleMarker` popups are mouse/click oriented; verify keyboard
    reachability and that the filter toggle buttons expose pressed state
    (`aria-pressed`). The category filter buttons in `rail-map.tsx` change
    only color, not an ARIA state.
  - Done when: filters are operable by keyboard and announce on/off state.

---

## P3 — Content, data, engagement, polish

- [x] **Per-project detail pages.**
  <!-- DONE 2026-06-05: src/app/projeler/[slug]/page.tsx (SSG via
       generateStaticParams — all 14 prerendered as static HTML) + a client
       ProjectDetail component. Each page carries feasibility, authority split,
       phasing, highlights, related rail lines, key map locations, related
       projects, per-project metadata (title/desc/canonical/hreflang/OG) and a
       CreativeWork JSON-LD block. Slugs + structured meta in data/projects.ts;
       long-form bilingual copy in lib/project-detail-content.ts. -->
  - Today projects are cards only (`projeler/page.tsx`, `page.tsx`); there is
    no `/projeler/[slug]`. Detail pages would carry feasibility notes,
    municipal-vs-central authority breakdown, phasing, and the project's map
    markers — and give each project a crawlable, shareable URL.
  - Done when: each of the 14 projects has its own route + metadata, linked
    from the cards' "Detaylı İncele" (`common.learnMore`, currently unused).

- [x] **Wire up the unused `common.learnMore` CTA.**
  <!-- DONE 2026-06-05: ProjectCard now resolves the project's slug from
       data/projects.ts; when a detail page exists the whole card becomes a
       <Link> to /projeler/[slug] with a "Detaylı İncele" CTA row + aria-label
       + focus-visible ring. `common.learnMore` is now rendered (no longer a
       dead key). -->
  - `i18n.ts` defines `common.learnMore` ("Detaylı İncele" / "Learn More") but
    no component renders it. Either remove it or hook it to the detail pages.
  - Done when: the key is used or removed (no dead translation keys).

- [x] **Data visualization for project costs / phasing.**
  <!-- DONE 2026-06-05: added a structured numeric `costUsdM` field per project
       in data/projects.ts. components/projects/budget-chart.tsx renders a
       budget-by-category bar chart from costByCategory() (pure SVG/CSS, no
       chart lib). The homepage hero budget figure and the chart total are now
       DERIVED from totalNumericCostUsdM() (≈ $3.1B), replacing the hardcoded
       `estimatedBudgetUSD = 3`; both are clearly labelled pre-feasibility
       estimates (PPP/multi-year excluded). Phasing Gantt tracked in ROADMAP
       Track C. -->
  - The homepage shows a manually-maintained `~$3B` figure
    (`page.tsx` `estimatedBudgetUSD = 3`, hardcoded because costs are free-form
    strings). Add a small budget-by-category or timeline chart, and consider a
    structured numeric cost field in the data to drive it.
  - Done when: a chart renders from data (not a hardcoded constant) and the
    homepage budget figure is derived or clearly labeled as an estimate.

- [x] **Citizen engagement: feedback / proposal channel.**
  <!-- DONE 2026-06-05: no-account "Görüş Bildir / Share Feedback" links added
       to the homepage CTA (pre-filled GitHub Issue, no account needed to read/
       propose) and a per-project pre-filled feedback link on every detail page.
       Structured no-backend form + comment digest tracked in ROADMAP Track E. -->
  - The CTA copy invites contribution but only links to GitHub. Consider a
    lightweight, no-backend option (GitHub Issues template link, or a form via
    a static form service) so non-developers can submit input.
  - Done when: a non-GitHub-account path exists for citizen feedback.

- [x] **Add real imagery / illustrations.**
  <!-- DONE 2026-06-05: self-authored civic illustration (Adana skyline +
       Çukurova delta + rail motif) at scripts/projects-hero.svg, rasterized to
       an optimized 12 KB WebP (public/images/projects-hero.webp via sharp) and
       rendered on the projects page header via next/image (static import,
       priority, blur placeholder, descriptive bilingual alt text). Self-
       authored asset = no licensing risk. Further photography pipeline tracked
       in ROADMAP Track F. -->
  - `public/images/` is empty; the UI is all gradients + inline SVG icons.
    Project/landmark imagery (properly licensed) would raise credibility.
  - Done when: key sections use optimized `next/image` assets with alt text.

- [x] **Update `CLAUDE.md` data summary (5 lines/30+ stations/14 projects).**
  <!-- DONE 2026-06-05: CLAUDE.md Key Data now says 6 lines / 49 stations with
       correct per-line names + station counts, and a "source of truth" note
       pointing at stations.ts / i18n.ts. -->

  - `CLAUDE.md` "Key Data" says 5 lines / 30+ stations / 14 projects; data is
    6 lines / ~49 line-stations / 14 projects / 21 project-location markers.
  - Done when: CLAUDE.md matches `src/data/stations.ts` at HEAD.

- [x] **Performance/SEO audit (Lighthouse) once redeployed.**
  <!-- DONE 2026-06-05: ran a post-deploy baseline against the live site. The
       headful Lighthouse MCP tool couldn't run here (no X server), so the
       baseline was captured via browser (Playwright) + curl signals:
         • Homepage HTML 12.9 KB, TTFB ~44 ms, total ~45 ms (CDN-cached).
         • Hero illustration 12.5 KB WebP; og-image 140 KB PNG.
         • Zero console errors on geleceginadanasi.com.tr (the "1 error" seen
           mid-session was a stale cross-site azulejo.svg 404 from the portfolio
           tab, not this site).
         • SEO essentials all present: meta description, canonical, hreflang
           (tr-TR/en-US/x-default), JSON-LD (Organization/WebSite/CreativeWork),
           viewport, og:image, favicon; robots allows + declares sitemap; 18
           sitemap URLs (4 core + 14 detail).
         • a11y: map filters expose aria-pressed + state aria-labels; cards/
           buttons have focus-visible rings; <html lang> tracks locale.
       Concrete follow-ups filed in ROADMAP Track F (Lighthouse-CI, font subset,
       Leaflet route-split) and Track G (axe-in-CI, full keyboard map pass). -->
  - Run Lighthouse against the live site after the P0 redeploy; capture LCP /
    CLS and any a11y/SEO flags as concrete follow-ups.
  - Done when: a baseline Lighthouse report is recorded and regressions filed.
