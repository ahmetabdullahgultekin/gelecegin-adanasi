"use client";

import Image from "next/image";
import { useLocale } from "@/lib/locale-context";
import ProjectCard from "@/components/projects/project-card";
import heroImg from "../../../public/images/projects-hero.webp";

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

const sections = [
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
