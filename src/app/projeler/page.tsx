"use client";

import Image from "next/image";
import { useLocale } from "@/lib/locale-context";
import ProjectCard from "@/components/projects/project-card";
import heroImg from "../../../public/images/projects-hero.webp";

// Category accent colours come from the same CSS-variable palette the homepage
// uses (defined once in globals.css / data/projects.ts), so the two project
// listings stay visually consistent instead of drifting to ad-hoc hex values.
const sections = [
  {
    sectionKey: "transport" as const,
    color: "var(--cat-transport)",
    projects: ["m1Extension", "ringTram", "cukurovaRay", "blueLineExpress", "smartTerminal"],
  },
  {
    sectionKey: "tourism" as const,
    color: "var(--cat-tourism)",
    projects: ["tourism", "agropark"],
  },
  {
    sectionKey: "digital" as const,
    color: "var(--cat-digital)",
    projects: ["abbAI", "adakart", "technopark"],
  },
  {
    sectionKey: "urban" as const,
    color: "var(--cat-urban)",
    projects: ["waterInfra", "greenSpaces", "bikeNetwork", "disasterPrep"],
  },
];

export default function ProjectsPage() {
  const { t, locale } = useLocale();

  return (
    <div>
      {/* Hero banner with illustrated Çukurova/Adana motif */}
      <div className="relative isolate overflow-hidden">
        <Image
          src={heroImg}
          alt={
            locale === "tr"
              ? "Adana silüeti ve Çukurova deltası illüstrasyonu — raylı sistem motifi"
              : "Illustration of the Adana skyline and Çukurova delta with a rail-system motif"
          }
          priority
          placeholder="blur"
          sizes="100vw"
          className="w-full h-[220px] md:h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--civic-900)]/85 via-[color:var(--civic-900)]/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
              {t.nav.projects}
            </h1>
            <p className="mt-3 text-blue-100 max-w-2xl">
              {locale === "tr"
                ? "Adana için önerilen 14 proje; tahmini maliyetleri ve yetki alanlarıyla. Her karta tıklayarak detaylı incelemeye geçin."
                : "14 proposed projects for Adana with estimated costs and authority scope. Click any card for the full detail page."}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {sections.map((section) => (
        <div key={section.sectionKey} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t.sections[section.sectionKey]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.projects.map((projectKey) => (
              <ProjectCard
                key={projectKey}
                titleKey={projectKey}
                color={section.color}
              />
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
