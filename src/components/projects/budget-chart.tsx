"use client";

import { useTranslations } from "next-intl";
import { costByCategory, type ProjectCategory } from "@/data/projects";

const categoryColors: Record<ProjectCategory, string> = {
  transport: "var(--cat-transport)",
  tourism: "var(--cat-tourism)",
  digital: "var(--cat-digital)",
  urban: "var(--cat-urban)",
};

/** Format a USD-millions value as a compact "$Xm / $X.Xb" string. */
function fmt(usdM: number): string {
  return usdM >= 1000
    ? `$${(usdM / 1000).toFixed(1).replace(/\.0$/, "")}B`
    : `$${usdM}M`;
}

/**
 * Budget-by-category bar chart, driven entirely from the structured
 * `costUsdM` fields in `data/projects.ts` (not a hardcoded constant). Pure SVG
 * + CSS — no chart library, no extra bundle weight. Accessible via an
 * equivalent data table for screen readers.
 */
export default function BudgetChart() {
  const t = useTranslations();
  const data = costByCategory();
  const rows = (Object.keys(categoryColors) as ProjectCategory[]).map((cat) => ({
    cat,
    value: data[cat],
    color: categoryColors[cat],
    label: t(`ui.budgetCategories.${cat}`),
  }));
  const max = Math.max(...rows.map((r) => r.value), 1);
  const total = rows.reduce((s, r) => s + r.value, 0);

  return (
    <figure className="rounded-2xl border border-[color:var(--border)] bg-white p-6 md:p-8">
      <figcaption className="flex items-baseline justify-between gap-3 mb-6">
        <h3 className="font-display text-lg font-bold text-[color:var(--ink)] tracking-tight">
          {t("ui.budget.chartHeading")}
        </h3>
        <span className="font-tabular font-bold text-[color:var(--civic-700)]">
          {fmt(total)}
        </span>
      </figcaption>

      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.cat}>
            <div className="flex items-baseline justify-between mb-1.5 text-sm">
              <span className="font-medium text-[color:var(--ink-soft)]">
                {r.label}
              </span>
              <span className="font-tabular text-[color:var(--ink-muted)]">
                {fmt(r.value)}
              </span>
            </div>
            <div
              className="h-2.5 rounded-full bg-[color:var(--paper-soft)] overflow-hidden"
              role="img"
              aria-label={`${r.label}: ${fmt(r.value)}`}
            >
              <div
                className="h-full rounded-full transition-[width] duration-700"
                style={{
                  width: `${(r.value / max) * 100}%`,
                  backgroundColor: r.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-[color:var(--ink-muted)] leading-relaxed">
        {t("ui.budget.chartNote")}
      </p>
    </figure>
  );
}
