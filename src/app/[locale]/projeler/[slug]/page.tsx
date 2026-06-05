import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { translations } from "@/lib/i18n";
import { getProjectBySlug, allProjectSlugs } from "@/data/projects";
import { SITE_URL, alternatesFor } from "@/lib/site";
import { routing, type AppLocale } from "@/i18n/routing";
import ProjectDetail from "@/components/projects/project-detail";

/** Pre-render all 14 detail pages × 2 locales at build time (fully static). */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allProjectSlugs().map((slug) => ({ locale, slug }))
  );
}

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const meta = getProjectBySlug(slug);
  if (!meta) return {};

  const isEn = locale === "en";
  const key = meta.i18nKey as keyof typeof translations.tr.projects;
  const loc = isEn ? translations.en.projects[key] : translations.tr.projects[key];
  const brand = isEn ? "Adana's Future" : "Geleceğin Adana'sı";

  return {
    title: loc.title,
    description: loc.description,
    alternates: await alternatesFor(`/projeler/${slug}`, locale as AppLocale),
    openGraph: {
      title: `${loc.title} — ${brand}`,
      description: loc.description,
      url: `${SITE_URL}${isEn ? "/en" : ""}/projeler/${slug}`,
      type: "article",
    },
    twitter: {
      title: `${loc.title} — ${brand}`,
      description: loc.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const meta = getProjectBySlug(slug);
  if (!meta) notFound();

  const key = meta.i18nKey as keyof typeof translations.tr.projects;
  // JSON-LD uses Turkish (canonical) names regardless of the rendered locale.
  const tr = translations.tr.projects[key];

  // Per-project structured data (server-rendered for crawlers).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: tr.title,
    description: tr.description,
    url: `${SITE_URL}/projeler/${slug}`,
    inLanguage: ["tr", "en"],
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: tr.type,
    creator: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail meta={meta} />
    </>
  );
}
