"use client";

import { useLocale } from "@/lib/locale-context";

/**
 * Project card — pulls every displayed field (title / description / type /
 * cost / authority) from the `t.projects[titleKey]` i18n entry, so callers
 * only need to provide the i18n key and the category accent colour.
 */
interface ProjectCardProps {
  titleKey: string;
  color: string;
}

export default function ProjectCard({
  titleKey,
  color,
}: ProjectCardProps) {
  const { t, locale } = useLocale();

  const project =
    t.projects[titleKey as keyof typeof t.projects];
  if (!project) return null;

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl border border-[color:var(--border)] hover:border-[color:var(--civic-300)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(13,30,55,0.22)] overflow-hidden">
      {/* Category accent stripe — colored, subtle */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: color }}
      />

      <div className="p-5 md:p-6 flex flex-col h-full">
        {/* Type chip */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span
            className="civic-chip"
            style={{
              color,
              backgroundColor: "white",
              borderColor: `color-mix(in srgb, ${color} 22%, transparent)`,
            }}
          >
            {project.type}
          </span>
          <span className="text-xs font-tabular font-semibold text-[color:var(--ink-muted)]">
            {project.cost}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg md:text-xl font-bold text-[color:var(--ink)] tracking-tight leading-snug group-hover:text-[color:var(--civic-700)] transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-[color:var(--ink-muted)] text-sm leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Authority footer */}
        <div className="mt-4 pt-3 border-t border-[color:var(--border-soft)] flex items-center gap-2 text-xs">
          <svg
            className="w-3.5 h-3.5 text-[color:var(--ink-subtle)] shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m-1 4h1m-1 4h1m4-8h1m-1 4h1m-1 4h1" />
          </svg>
          <span className="text-[color:var(--ink-muted)] font-medium">
            {locale === "tr" ? "Yetki:" : "Authority:"}
          </span>
          <span className="text-[color:var(--ink-soft)]">{project.authority}</span>
        </div>
      </div>
    </article>
  );
}
