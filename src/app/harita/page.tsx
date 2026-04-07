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

const projectCategories = [
  { key: "hub", color: "#ef4444", tr: "Transfer Merkezi", en: "Transfer Hub" },
  { key: "transport", color: "#f97316", tr: "Ulaşım", en: "Transport" },
  { key: "tourism", color: "#8b5cf6", tr: "Turizm", en: "Tourism" },
  { key: "agriculture", color: "#22c55e", tr: "Tarım", en: "Agriculture" },
  { key: "digital", color: "#3b82f6", tr: "Dijital", en: "Digital" },
  { key: "urban", color: "#14b8a6", tr: "Kentsel Yaşam", en: "Urban Living" },
];

export default function MapPage() {
  const { locale } = useLocale();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {locale === "tr"
          ? "Adana Vizyon Haritası"
          : "Adana Vision Map"}
      </h1>
      <p className="text-gray-500 mb-8">
        {locale === "tr"
          ? "Raylı sistem hatları ve tüm proje lokasyonlarını interaktif harita üzerinde keşfedin. Filtreleri kullanarak kategorilere göre görüntüleyin."
          : "Explore rail lines and all project locations on the interactive map. Use filters to view by category."}
      </p>

      <RailMap />

      {/* Rail Legend */}
      <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">
        {locale === "tr" ? "Raylı Sistem Hatları" : "Rail System Lines"}
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
                {locale === "tr" ? "durak" : "stations"}
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
        {locale === "tr" ? "Proje Kategorileri" : "Project Categories"}
      </h2>
      <div className="flex flex-wrap gap-3">
        {projectCategories.map((cat) => (
          <div key={cat.key} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: cat.color }}
            />
            <span className="text-sm text-gray-600">
              {locale === "tr" ? cat.tr : cat.en}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
