"use client";

import { useLocale } from "@/lib/locale-context";

const phaseStyles = [
  { accent: "#0f766e", bg: "rgba(15,118,110,0.06)", text: "text-[color:#0f766e]" },
  { accent: "#335f97", bg: "rgba(51,95,151,0.06)", text: "text-[color:#335f97]" },
  { accent: "#d97706", bg: "rgba(217,119,6,0.06)", text: "text-[color:#d97706]" },
  { accent: "#6d28d9", bg: "rgba(109,40,217,0.06)", text: "text-[color:#6d28d9]" },
];

export default function Timeline() {
  const { t } = useLocale();

  const phases = [t.phases.phase1, t.phases.phase2, t.phases.phase3, t.phases.phase4];

  return (
    <div className="relative">
      {/* Vertical rail (desktop) */}
      <div className="hidden md:block absolute left-[27px] top-6 bottom-6 w-px bg-[color:var(--border)]" />

      <ol className="space-y-6 md:space-y-8">
        {phases.map((phase, index) => {
          const s = phaseStyles[index];
          return (
            <li
              key={index}
              className="relative grid grid-cols-1 md:grid-cols-[56px_1fr] gap-4 md:gap-6"
            >
              {/* Phase marker */}
              <div className="flex md:flex-col items-center md:items-center gap-3 md:gap-0">
                <div
                  className="relative w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-white text-lg shrink-0 z-10"
                  style={{
                    backgroundColor: s.accent,
                    boxShadow: `0 12px 28px -12px ${s.accent}80, inset 0 1px 0 rgba(255,255,255,0.18)`,
                  }}
                >
                  {index + 1}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full ring-4 ring-white/0"
                  />
                </div>
                <div className="md:hidden flex-1 min-w-0">
                  <h3 className="font-display text-lg font-bold text-[color:var(--ink)] tracking-tight">
                    {phase.title}
                  </h3>
                  <p className="text-xs font-semibold text-[color:var(--ink-muted)] uppercase tracking-wider">
                    {phase.period}
                  </p>
                </div>
              </div>

              {/* Phase card */}
              <div
                className="relative rounded-2xl p-5 md:p-6 border transition-all"
                style={{
                  borderColor: `color-mix(in srgb, ${s.accent} 18%, transparent)`,
                  background: `linear-gradient(135deg, ${s.bg}, transparent)`,
                }}
              >
                {/* Desktop header (hidden on mobile since marker carries it) */}
                <div className="hidden md:flex items-baseline justify-between gap-3 mb-3 flex-wrap">
                  <h3 className="font-display text-xl font-bold text-[color:var(--ink)] tracking-tight">
                    {phase.title}
                  </h3>
                  <span
                    className="font-tabular font-semibold text-sm"
                    style={{ color: s.accent }}
                  >
                    {phase.period}
                  </span>
                </div>

                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[color:var(--ink-soft)] text-sm leading-relaxed"
                    >
                      <svg
                        className="w-4 h-4 mt-0.5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={s.accent}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m4 12 5 5L20 6" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
