"use client";

import { useLocale } from "@/lib/locale-context";

const phaseColors = [
  { bg: "bg-blue-50", border: "border-blue-300", dot: "bg-blue-500" },
  { bg: "bg-emerald-50", border: "border-emerald-300", dot: "bg-emerald-500" },
  { bg: "bg-amber-50", border: "border-amber-300", dot: "bg-amber-500" },
  { bg: "bg-purple-50", border: "border-purple-300", dot: "bg-purple-500" },
];

export default function Timeline() {
  const { t } = useLocale();

  const phases = [t.phases.phase1, t.phases.phase2, t.phases.phase3, t.phases.phase4];

  return (
    <div className="relative">
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

      <div className="space-y-8">
        {phases.map((phase, index) => {
          const colors = phaseColors[index];
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-center gap-4 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                <div
                  className={`${colors.bg} ${colors.border} border rounded-2xl p-6 inline-block max-w-md`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`w-3 h-3 rounded-full ${colors.dot}`}
                    />
                    <h3 className="font-semibold text-gray-900">
                      {phase.title}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-500 mb-3">
                    {phase.period}
                  </p>
                  <ul className="space-y-1.5">
                    {phase.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-gray-400 mt-0.5">&#8226;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`hidden md:flex w-10 h-10 rounded-full ${colors.dot} items-center justify-center text-white font-bold text-sm z-10 shrink-0`}
              >
                {index + 1}
              </div>

              <div className="flex-1 hidden md:block" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
