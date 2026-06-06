"use client";

import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { railLines } from "@/data/stations";

const RailMap = dynamic(() => import("@/components/map/rail-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
      <span className="text-gray-400">...</span>
    </div>
  ),
});

const projectCategoryKeys = [
  "hub",
  "transport",
  "tourism",
  "agriculture",
  "digital",
  "urban",
] as const;

const categoryColors: Record<string, string> = {
  hub: "#ef4444",
  transport: "#f97316",
  tourism: "#8b5cf6",
  agriculture: "#22c55e",
  digital: "#3b82f6",
  urban: "#14b8a6",
};

export default function MapPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {t("ui.map.title")}
      </h1>
      <p className="text-gray-500 mb-8">
        {t("ui.map.subtitle")}
      </p>

      <RailMap />

      {/* Rail Legend */}
      <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">
        {t("ui.map.railLinesHeading")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {railLines.map((line) => (
          <div
            key={line.id}
            className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200"
          >
            <div
              className="w-4 h-4 rounded-full mt-0.5 shrink-0"
              style={{ backgroundColor: line.color }}
            />
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {locale === "tr" ? line.name : line.nameEn}
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                {locale === "tr" ? line.type : line.typeEn} &middot;{" "}
                {line.stations.length}{" "}
                {t("common.stations")}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {line.stations
                  .map((s) => (locale === "tr" ? s.name : s.nameEn))
                  .join(" → ")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Project Legend */}
      <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">
        {t("ui.map.categoriesHeading")}
      </h2>
      <div className="flex flex-wrap gap-3">
        {projectCategoryKeys.map((key) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: categoryColors[key] }}
            />
            <span className="text-sm text-gray-600">
              {t(`ui.categories.${key}`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
