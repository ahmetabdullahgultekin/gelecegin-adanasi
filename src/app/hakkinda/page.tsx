"use client";

import { useLocale } from "@/lib/locale-context";

export default function AboutPage() {
  const { t } = useLocale();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.about.title}</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-600 leading-relaxed">
          {t.about.description}
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.about.mission}
            </h2>
            <p className="text-gray-600">{t.about.missionText}</p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t.about.values}
            </h2>
            <ul className="space-y-2">
              {t.about.valuesList.map((value, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <span className="text-emerald-500 mt-1">&#10003;</span>
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "14", label: "Proje / Projects" },
            { value: "5", label: "Raylı Hat / Rail Lines" },
            { value: "30+", label: "Durak / Stations" },
            { value: "4", label: "Faz / Phases" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 text-center"
            >
              <p className="text-3xl font-bold text-blue-700">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <p className="text-amber-800 text-sm">
            <strong>
              {t.about.title === "Hakkında" ? "Sorumluluk Reddi" : "Disclaimer"}:
            </strong>{" "}
            {t.about.title === "Hakkında"
              ? "Bu platformdaki tüm projeler öneri niteliğindedir. Tahmini maliyetler ve süre planlamaları gerçek fizibilite çalışmalarına dayanmamaktadır. Yetki alanı bilgileri genel bilgi amacıyla sunulmuştur."
              : "All projects on this platform are proposals. Estimated costs and timelines are not based on actual feasibility studies. Authority information is provided for general reference only."}
          </p>
        </div>
      </div>
    </div>
  );
}
