import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { translations } from "@/lib/i18n";
import { getProjectBySlug, allProjectSlugs } from "@/data/projects";
import { SITE_URL, alternatesFor } from "@/lib/site";
import ProjectDetail from "@/components/projects/project-detail";

/** Pre-render all 14 detail pages at build time (fully static). */
export function generateStaticParams() {
  return allProjectSlugs().map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const meta = getProjectBySlug(slug);
  if (!meta) return {};

  const key = meta.i18nKey as keyof typeof translations.tr.projects;
  const tr = translations.tr.projects[key];
  const en = translations.en.projects[key];
  const path = `/projeler/${slug}`;

  return {
    title: tr.title,
    description: tr.description,
    alternates: alternatesFor(path),
    openGraph: {
      title: `${tr.title} — Geleceğin Adana'sı`,
      description: tr.description,
      url: `${SITE_URL}${path}`,
      type: "article",
    },
    twitter: {
      title: `${tr.title} — Geleceğin Adana'sı`,
      description: en.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const meta = getProjectBySlug(slug);
  if (!meta) notFound();

  const key = meta.i18nKey as keyof typeof translations.tr.projects;
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
