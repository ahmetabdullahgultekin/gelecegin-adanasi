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
  app/                    # Next.js App Router pages
    page.tsx              # Landing / hero page
    client-layout.tsx     # Client-side layout (LocaleProvider + Header/Footer)
    projeler/page.tsx     # All projects listing
    harita/page.tsx       # Interactive map with Leaflet
    hakkinda/page.tsx     # About page
  components/
    layout/               # Header, Footer
    map/                  # RailMap (dynamic import, SSR disabled)
    projects/             # ProjectCard, Timeline
  data/
    stations.ts           # Rail lines, stations with coordinates
  lib/
    i18n.ts               # All translations (TR + EN)
    locale-context.tsx     # React context for locale switching
public/                   # Static assets
docs/                     # Local docs (gitignored) — includes original brainstorm chat
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
### Rail System Lines (5 lines, 30+ stations)
1. **Hat 1 (M1 Extension)**: Akincilar → ABTU (Metro, 7 stations)
2. **Hat 2 (Ring Tram)**: Merkez Gar circular route (Tram, 9 stations)
3. **Hat 3a (CukurovaRay E-W)**: Tarsus → Ceyhan (Commuter, 7 stations)
4. **Hat 3b (CukurovaRay North)**: Merkez Gar → Kozan (Commuter, 4 stations)
5. **Hat 4 (Mavi Hat)**: Merkez Gar → Karatas/Yumurtalik (Tourism, 5 stations)

### Major Projects (14 total)
- Transport: M1 Extension, Ring Tram, CukurovaRay, Blue Line, Smart Terminal
- Tourism: Karatas & Yumurtalik, Agroparks
- Digital: ABB AI, Adakart, Technopark
- Urban: Water/Drainage, Green Spaces, Bike Network, Disaster Prep

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
