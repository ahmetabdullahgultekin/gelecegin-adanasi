"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import ProjectCard from "@/components/projects/project-card";
import Timeline from "@/components/projects/timeline";
import { railLines } from "@/data/stations";
import { useEffect, useRef } from "react";

const transportIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const tourismIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
  </svg>
);
const digitalIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const urbanIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const projectSections = [
  {
    sectionKey: "transport" as const,
    color: "var(--cat-transport)",
    icon: transportIcon,
    projects: ["m1Extension", "ringTram", "cukurovaRay", "blueLineExpress", "smartTerminal"],
  },
  {
    sectionKey: "tourism" as const,
    color: "var(--cat-tourism)",
    icon: tourismIcon,
    projects: ["tourism", "agropark"],
  },
  {
    sectionKey: "digital" as const,
    color: "var(--cat-digital)",
    icon: digitalIcon,
    projects: ["abbAI", "adakart", "technopark"],
  },
  {
    sectionKey: "urban" as const,
    color: "var(--cat-urban)",
    icon: urbanIcon,
    projects: ["waterInfra", "greenSpaces", "bikeNetwork", "disasterPrep"],
  },
];

/** On-scroll reveal: attach IntersectionObserver to every `.reveal` element
 *  once on mount, add the `in` class when it enters the viewport, then
 *  unobserve so the transition only plays once. No return value — side
 *  effect only. */
function useReveal(): void {
  const observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.current?.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.current?.observe(el));
    return () => observer.current?.disconnect();
  }, []);
}

export default function HomePage() {
  const { t, locale } = useLocale();
  useReveal();

  const totalProjects = projectSections.reduce((n, s) => n + s.projects.length, 0);
  const totalLines = railLines.length;
  const totalStations = railLines.reduce((n, l) => n + l.stations.length, 0);

  // Display-only rough planning-horizon estimate in USD billions. Not
  // computed from individual project costs (they're free-form strings like
  // "~$300 million" / "Public-private partnership" — not summable). Update
  // this figure manually when the data/i18n cost lines materially change.
  const estimatedBudgetUSD = 3; // ≈ sum of the numeric cost estimates across all 14 projects
  const budgetLabel = locale === "tr" ? "milyar USD planlama ufku" : "billion USD planning horizon";

  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        {/* Ambient gradient canvas */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1400px 600px at 15% -10%, rgba(34,72,124,0.28) 0%, transparent 55%), radial-gradient(1000px 500px at 85% 100%, rgba(15,118,110,0.22) 0%, transparent 55%), linear-gradient(180deg, #0d1e37 0%, #122a4c 55%, #193764 100%)",
          }}
        />
        {/* Topographic pattern overlay */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><path d='M0 60 Q30 30 60 60 T 120 60' stroke='%23ffffff' stroke-width='0.6' fill='none' opacity='0.5'/><path d='M0 90 Q30 60 60 90 T 120 90' stroke='%23ffffff' stroke-width='0.4' fill='none' opacity='0.3'/><path d='M0 30 Q30 0 60 30 T 120 30' stroke='%23ffffff' stroke-width='0.4' fill='none' opacity='0.3'/></svg>\")",
            backgroundSize: "240px 240px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24 relative">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs font-medium tracking-wider uppercase text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {locale === "tr"
              ? "Bağımsız · Veri odaklı · Toplum yararına"
              : "Independent · Data-driven · Public-benefit"}
          </div>

          <h1 className="font-display text-white text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.02] max-w-4xl">
            {t.hero.title}
          </h1>

          <p className="mt-6 text-blue-100 text-lg md:text-xl font-medium max-w-3xl">
            {t.hero.subtitle}
          </p>
          <p className="mt-4 text-blue-200/80 text-base md:text-lg max-w-2xl leading-relaxed">
            {t.hero.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/harita"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[color:var(--civic-800)] font-semibold rounded-full hover:bg-blue-50 transition-all hover:-translate-y-0.5"
            >
              {t.hero.exploreMap}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5-5 5M6 12h11" />
              </svg>
            </Link>
            <Link
              href="/projeler"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 bg-white/5 text-white font-semibold rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              {t.hero.viewProjects}
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 md:gap-6 pt-8 border-t border-white/15">
            <div>
              <div className="font-display font-tabular text-3xl md:text-4xl text-white font-bold">
                {totalProjects}
              </div>
              <div className="mt-1 text-xs md:text-sm text-blue-200/80 font-medium uppercase tracking-wider">
                {locale === "tr" ? "Proje" : "Projects"}
              </div>
            </div>
            <div>
              <div className="font-display font-tabular text-3xl md:text-4xl text-white font-bold">
                {totalLines}
              </div>
              <div className="mt-1 text-xs md:text-sm text-blue-200/80 font-medium uppercase tracking-wider">
                {locale === "tr" ? "Raylı Hat" : "Rail Lines"}
              </div>
            </div>
            <div>
              <div className="font-display font-tabular text-3xl md:text-4xl text-white font-bold">
                {totalStations}
              </div>
              <div className="mt-1 text-xs md:text-sm text-blue-200/80 font-medium uppercase tracking-wider">
                {locale === "tr" ? "Durak" : "Stations"}
              </div>
            </div>
            <div>
              <div className="font-display font-tabular text-3xl md:text-4xl text-white font-bold">
                ~${estimatedBudgetUSD}B
              </div>
              <div className="mt-1 text-xs md:text-sm text-blue-200/80 font-medium uppercase tracking-wider">
                {budgetLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values bar — civic independence statement ─────────── */}
      <section className="bg-[color:var(--paper-soft)] border-y border-[color:var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs md:text-sm text-[color:var(--ink-soft)] font-medium tracking-wide">
            {(locale === "tr"
              ? ["Bağımsız", "Veri odaklı", "Toplum yararına", "Açık kaynak", "Siyasetten bağımsız"]
              : ["Independent", "Data-driven", "Public-benefit", "Open source", "Non-political"]
            ).map((label, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                <svg className="w-4 h-4 text-[color:var(--delta-500)]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4 12 5 5L20 6" />
                </svg>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Rail System Overview ─────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[color:var(--paper)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="civic-chip mb-3">
                {locale === "tr" ? "Ulaşım" : "Transit"}
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[color:var(--ink)] tracking-tight">
                {t.sections.railSystem}
              </h2>
              <p className="mt-3 text-[color:var(--ink-muted)] max-w-2xl">
                {locale === "tr"
                  ? "5 hat, 30+ durak. Metro, hafif raylı, banliyö ve turizm ekspresi — entegre şehir içi ve bölgesel raylı sistem önerileri."
                  : "5 lines, 30+ stations. Metro, light rail, commuter, and tourism express — an integrated urban and regional rail proposal."}
              </p>
            </div>
            <Link
              href="/harita"
              className="shrink-0 inline-flex items-center gap-1.5 text-[color:var(--civic-700)] font-semibold hover:gap-3 transition-all group"
            >
              {locale === "tr" ? "Haritada gör" : "See on map"}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h11" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 reveal">
            {railLines.map((line) => (
              <Link
                key={line.id}
                href="/harita"
                className="group relative flex flex-col p-5 rounded-2xl bg-white border border-[color:var(--border)] hover:border-[color:var(--civic-300)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-16px_rgba(13,30,55,0.2)]"
              >
                {/* Line accent bar */}
                <div
                  className="absolute top-0 left-5 right-5 h-1 rounded-b"
                  style={{ backgroundColor: line.color }}
                />
                <div className="flex items-start gap-3 pt-1">
                  <div
                    className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center text-white text-xs font-bold font-tabular"
                    style={{ backgroundColor: line.color }}
                  >
                    {line.id.replace(/[^0-9a-z]/gi, "").slice(0, 3).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-[color:var(--ink)] leading-tight">
                      {locale === "tr" ? line.name : line.nameEn}
                    </p>
                    <p className="mt-1 text-xs text-[color:var(--ink-muted)] font-medium">
                      {locale === "tr" ? line.type : line.typeEn}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[color:var(--border-soft)] flex items-center justify-between">
                  <span className="text-xs text-[color:var(--ink-muted)]">
                    {locale === "tr" ? "Duraklar" : "Stations"}
                  </span>
                  <span className="font-tabular font-semibold text-[color:var(--ink)]">
                    {line.stations.length}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Projects by Category ─────────────────────────────── */}
      {projectSections.map((section, sectionIdx) => (
        <section
          key={section.sectionKey}
          className={`py-16 md:py-20 ${sectionIdx % 2 === 0 ? "bg-[color:var(--paper-soft)]" : "bg-[color:var(--paper)]"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="reveal mb-8 md:mb-12 flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-white mt-1"
                style={{ backgroundColor: section.color }}
              >
                {section.icon}
              </div>
              <div className="min-w-0">
                <div
                  className="civic-chip mb-2"
                  style={{
                    color: section.color,
                    backgroundColor: "white",
                    borderColor: `color-mix(in srgb, ${section.color} 25%, transparent)`,
                  }}
                >
                  {section.projects.length}{" "}
                  {locale === "tr" ? "proje" : "projects"}
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[color:var(--ink)] tracking-tight">
                  {t.sections[section.sectionKey]}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 reveal">
              {section.projects.map((projectKey) => (
                <ProjectCard
                  key={projectKey}
                  titleKey={projectKey}
                  color={section.color}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ─── Timeline ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[color:var(--paper)] bg-topo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10 md:mb-16">
            <div className="civic-chip mb-4 inline-flex">
              {locale === "tr" ? "10 yıllık ufuk" : "10-year horizon"}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[color:var(--ink)] tracking-tight">
              {t.sections.timeline}
            </h2>
            <p className="mt-4 text-[color:var(--ink-muted)] max-w-2xl mx-auto">
              {locale === "tr"
                ? "İlk 100 günden onuncu yıla — aşamalı, ölçülebilir ve uygulanabilir planlama."
                : "From the first 100 days to year ten — staged, measurable, and implementable planning."}
            </p>
          </div>
          <div className="reveal">
            <Timeline />
          </div>
        </div>
      </section>

      {/* ─── Civic statement + CTA ────────────────────────────── */}
      <section className="relative overflow-hidden bg-[color:var(--civic-900)] text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 400px at 80% 20%, rgba(15,118,110,0.2) 0%, transparent 55%), radial-gradient(700px 300px at 10% 80%, rgba(34,72,124,0.3) 0%, transparent 55%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            {locale === "tr"
              ? "Adana'nın Geleceğini Birlikte Planlayalım"
              : "Let's Plan Adana's Future Together"}
          </h2>
          <p className="mt-6 text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            {locale === "tr"
              ? "Bu platform açık kaynaklıdır. Bulgulara katkıda bulunmak, öneri yapmak veya eleştirmek için GitHub üzerinden katılın. Her vatandaşın sesi önemlidir."
              : "This platform is open source. Contribute findings, suggest improvements, or critique — join via GitHub. Every citizen's voice matters."}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/harita"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[color:var(--civic-800)] font-semibold rounded-full hover:bg-blue-50 transition-all hover:-translate-y-0.5"
            >
              {t.hero.exploreMap}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h11" />
              </svg>
            </Link>
            <a
              href="https://github.com/ahmetabdullahgultekin/gelecegin-adanasi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/30 bg-white/5 text-white font-semibold rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
          <p className="mt-8 text-xs text-white/50 font-mono">
            {locale === "tr"
              ? "Bu bir siyasi kampanya değildir. Siyasi bağ yok."
              : "This is not a political campaign. No political affiliation."}
          </p>
        </div>
      </section>
    </div>
  );
}
