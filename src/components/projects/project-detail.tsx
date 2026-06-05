"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import {
  type ProjectMeta,
  locationsForProject,
  railLinesForProject,
  projects,
} from "@/data/projects";
import { projectDetailContent } from "@/lib/project-detail-content";

const categoryLabels: Record<string, { tr: string; en: string }> = {
  transport: { tr: "Ulaşım", en: "Transport" },
  tourism: { tr: "Turizm ve Tarım", en: "Tourism & Agriculture" },
  digital: { tr: "Dijital", en: "Digital" },
  urban: { tr: "Kentsel Yaşam", en: "Urban Living" },
};

/** Client-rendered project detail. Reads the active locale and renders the
 *  rich content (overview, feasibility, highlights, authority split, phasing,
 *  related lines/locations/projects). */
export default function ProjectDetail({ meta }: { meta: ProjectMeta }) {
  const { t, locale, setLocale } = useLocale();

  const project = t.projects[meta.i18nKey as keyof typeof t.projects];
  const detail = projectDetailContent[meta.i18nKey];
  if (!project || !detail) return null;

  const locations = locationsForProject(meta);
  const lines = railLinesForProject(meta);
  const phaseList = [t.phases.phase1, t.phases.phase2, t.phases.phase3, t.phases.phase4];
  const related = projects.filter(
    (p) => p.category === meta.category && p.slug !== meta.slug
  );
  const catLabel = categoryLabels[meta.category];

  return (
    <div className="bg-[color:var(--paper)]">
      {/* Hero band */}
      <section
        className="relative isolate overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(180deg, #0d1e37 0%, #122a4c 60%, #193764 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.10]"
          style={{
            background: `radial-gradient(900px 380px at 85% 0%, ${
              meta.color.startsWith("var") ? "rgba(255,255,255,0.5)" : meta.color
            } 0%, transparent 60%)`,
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-28 md:pb-16">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-6 text-sm text-blue-200/80">
            <Link href="/" className="hover:text-white transition-colors">
              {t.nav.home}
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <Link href="/projeler" className="hover:text-white transition-colors">
              {t.nav.projects}
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-white">{project.title}</span>
          </nav>

          <div
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-medium uppercase tracking-wider"
            style={{ color: "white" }}
          >
            {locale === "tr" ? catLabel.tr : catLabel.en}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
            {project.title}
          </h1>
          <p className="mt-5 text-blue-100 text-lg max-w-2xl leading-relaxed">
            {project.description}
          </p>

          {/* Key facts */}
          <dl className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
            <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
              <dt className="text-xs uppercase tracking-wider text-blue-200/70">
                {t.common.type}
              </dt>
              <dd className="mt-1 font-semibold">{project.type}</dd>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
              <dt className="text-xs uppercase tracking-wider text-blue-200/70">
                {t.common.cost}
              </dt>
              <dd className="mt-1 font-semibold font-tabular">{project.cost}</dd>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 col-span-2 md:col-span-1">
              <dt className="text-xs uppercase tracking-wider text-blue-200/70">
                {t.common.authority}
              </dt>
              <dd className="mt-1 font-semibold">{project.authority}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/harita"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[color:var(--civic-800)] font-semibold rounded-full hover:bg-blue-50 transition-colors"
            >
              {t.common.onMap}
            </Link>
            <Link
              href="/projeler"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 bg-white/5 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              ← {t.common.allProjects}
            </Link>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-10">
          {/* Feasibility */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[color:var(--ink)] tracking-tight mb-4">
              {t.common.feasibility}
            </h2>
            <p className="text-[color:var(--ink-soft)] leading-relaxed">
              {detail.feasibility[locale]}
            </p>
          </section>

          {/* Highlights */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[color:var(--ink)] tracking-tight mb-4">
              {t.common.highlights}
            </h2>
            <ul className="space-y-3">
              {detail.highlights[locale].map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[color:var(--ink-soft)] leading-relaxed"
                >
                  <svg
                    className="w-5 h-5 mt-0.5 shrink-0 text-[color:var(--delta-500)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4 12 5 5L20 6"
                    />
                  </svg>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Authority split */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[color:var(--ink)] tracking-tight mb-4">
              {t.common.authoritySplit}
            </h2>
            <ul className="space-y-2">
              {detail.authoritySplit[locale].map((a, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[color:var(--ink-soft)] text-sm leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[color:var(--civic-500)] shrink-0" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Related rail lines */}
          {lines.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-[color:var(--ink)] tracking-tight mb-4">
                {t.common.relatedLines}
              </h2>
              <div className="space-y-3">
                {lines.map((line) => (
                  <Link
                    key={line.id}
                    href="/harita"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[color:var(--border)] hover:border-[color:var(--civic-300)] transition-colors"
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: line.color }}
                    />
                    <span className="font-medium text-[color:var(--ink)]">
                      {locale === "tr" ? line.name : line.nameEn}
                    </span>
                    <span className="ml-auto text-xs text-[color:var(--ink-muted)] font-tabular">
                      {line.stations.length} {t.common.stations}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Phasing */}
          <section className="rounded-2xl border border-[color:var(--border)] bg-white p-6">
            <h2 className="font-display text-lg font-bold text-[color:var(--ink)] tracking-tight mb-4">
              {t.common.phasing}
            </h2>
            <ul className="space-y-3">
              {detail.phases.map((phaseNum) => {
                const p = phaseList[phaseNum - 1];
                return (
                  <li key={phaseNum} className="flex items-start gap-3">
                    <span className="w-7 h-7 shrink-0 rounded-full bg-[color:var(--civic-700)] text-white text-sm font-bold flex items-center justify-center font-tabular">
                      {phaseNum}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[color:var(--ink)] leading-tight">
                        {p.title}
                      </p>
                      <p className="text-xs text-[color:var(--ink-muted)] uppercase tracking-wider mt-0.5">
                        {p.period}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Key locations */}
          {locations.length > 0 && (
            <section className="rounded-2xl border border-[color:var(--border)] bg-white p-6">
              <h2 className="font-display text-lg font-bold text-[color:var(--ink)] tracking-tight mb-4">
                {t.common.keyLocations}
              </h2>
              <ul className="space-y-2.5">
                {locations.map((loc, i) => (
                  <li
                    key={i}
                    className="text-sm text-[color:var(--ink-soft)] flex items-start gap-2"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0 text-[color:var(--ink-subtle)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{locale === "tr" ? loc.name : loc.nameEn}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/harita"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-[color:var(--civic-700)] font-semibold hover:gap-2.5 transition-all"
              >
                {t.common.onMap} →
              </Link>
            </section>
          )}

          {/* Feedback CTA */}
          <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--paper-soft)] p-6">
            <a
              href={`https://github.com/ahmetabdullahgultekin/gelecegin-adanasi/issues/new?title=${encodeURIComponent(
                `[Geri Bildirim] ${project.title}`
              )}&body=${encodeURIComponent(
                `Proje / Project: ${project.title}\nURL: https://geleceginadanasi.com.tr/projeler/${meta.slug}\n\n`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--civic-700)] hover:text-[color:var(--civic-900)] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {t.common.shareFeedback}
            </a>
          </section>

          {/* Language note for crawlers / direct visitors */}
          <button
            type="button"
            onClick={() => setLocale(locale === "tr" ? "en" : "tr")}
            className="text-xs font-mono text-[color:var(--ink-muted)] hover:text-[color:var(--civic-700)] transition-colors"
          >
            {locale === "tr" ? "Read in English →" : "Türkçe oku →"}
          </button>
        </aside>
      </div>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="border-t border-[color:var(--border)] bg-[color:var(--paper-soft)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="font-display text-xl font-bold text-[color:var(--ink)] tracking-tight mb-6">
              {t.common.relatedProjects}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {related.map((p) => {
                const rp = t.projects[p.i18nKey as keyof typeof t.projects];
                return (
                  <Link
                    key={p.slug}
                    href={`/projeler/${p.slug}`}
                    className="group p-5 rounded-2xl bg-white border border-[color:var(--border)] hover:border-[color:var(--civic-300)] transition-all hover:-translate-y-0.5"
                  >
                    <p className="font-display font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--civic-700)] transition-colors leading-snug">
                      {rp.title}
                    </p>
                    <p className="mt-2 text-xs text-[color:var(--ink-muted)] font-tabular">
                      {rp.cost}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
