"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import ProjectCard from "@/components/projects/project-card";
import Timeline from "@/components/projects/timeline";
import { railLines } from "@/data/stations";

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
    color: "#e63946",
    icon: transportIcon,
    projects: ["m1Extension", "ringTram", "cukurovaRay", "blueLineExpress", "smartTerminal"],
  },
  {
    sectionKey: "tourism" as const,
    color: "#2a9d8f",
    icon: tourismIcon,
    projects: ["tourism", "agropark"],
  },
  {
    sectionKey: "digital" as const,
    color: "#7209b7",
    icon: digitalIcon,
    projects: ["abbAI", "adakart", "technopark"],
  },
  {
    sectionKey: "urban" as const,
    color: "#06d6a0",
    icon: urbanIcon,
    projects: ["waterInfra", "greenSpaces", "bikeNetwork", "disasterPrep"],
  },
];

export default function HomePage() {
  const { t, locale } = useLocale();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJIMjR2LTJoMTJ6TTI0IDI0aDEydjJIMjR2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t.hero.title}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-blue-100 font-medium">
              {t.hero.subtitle}
            </p>
            <p className="mt-4 text-blue-200 text-lg max-w-2xl">
              {t.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/harita"
                className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-colors"
              >
                {t.hero.exploreMap}
              </Link>
              <Link
                href="/projeler"
                className="px-6 py-3 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                {t.hero.viewProjects}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rail System Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {t.sections.railSystem}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {railLines.map((line) => (
              <Link
                key={line.id}
                href="/harita"
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all"
              >
                <div
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: line.color }}
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {locale === "tr" ? line.name : line.nameEn}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {locale === "tr" ? line.type : line.typeEn} &middot;{" "}
                    {line.stations.length}{" "}
                    {locale === "tr" ? "durak" : "stations"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects by Category */}
      {projectSections.map((section) => (
        <section
          key={section.sectionKey}
          className="py-16 odd:bg-gray-50 even:bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t.sections[section.sectionKey]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.projects.map((projectKey) => (
                <ProjectCard
                  key={projectKey}
                  titleKey={projectKey}
                  descriptionKey={projectKey}
                  typeKey={projectKey}
                  costKey={projectKey}
                  authorityKey={projectKey}
                  color={section.color}
                  icon={section.icon}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.sections.timeline}
          </h2>
          <Timeline />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {locale === "tr"
              ? "Adana'nın Geleceğini Birlikte Planlayalım"
              : "Let's Plan Adana's Future Together"}
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            {locale === "tr"
              ? "Bu platform açık kaynaklıdır. Katkıda bulunmak, öneri yapmak veya tartışmalara katılmak için GitHub'ı ziyaret edin."
              : "This platform is open source. Visit GitHub to contribute, suggest, or join discussions."}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/harita"
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-colors"
            >
              {t.hero.exploreMap}
            </Link>
            <a
              href="https://github.com/ahmetabdullahgultekin/gelecegin-adanasi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
