"use client";

import dynamic from "next/dynamic";
import { useLocale } from "@/lib/locale-context";
import { railLines } from "@/data/stations";

const RailMap = dynamic(() => import("@/components/map/rail-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
      <span className="text-gray-400">Harita yükleniyor...</span>
    </div>
  ),
});

export default function MapPage() {
  const { t, locale } = useLocale();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {t.sections.railSystem}
      </h1>
      <p className="text-gray-500 mb-8">
        {locale === "tr"
          ? "Tüm hatları ve durakları interaktif harita üzerinde keşfedin. Duraklara tıklayarak detayları görün."
          : "Explore all lines and stations on the interactive map. Click on stations for details."}
      </p>

      <RailMap />

      {/* Legend */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                {locale === "tr" ? line.type : line.typeEn}
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
    </div>
  );
}
