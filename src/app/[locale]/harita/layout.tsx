import type { Metadata } from "next";
import { SITE_URL, alternatesFor } from "@/lib/site";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const path = isEn ? "/en/harita" : "/harita";

  return {
    title: isEn ? "Map" : "Harita",
    description: isEn
      ? "Adana vision map: 6 rail-system lines, 49 stations, and 14 projects on an interactive map."
      : "Adana vizyon haritası: 6 raylı sistem hattı, 49 durak ve 14 projenin interaktif harita üzerinde görünümü.",
    openGraph: {
      title: isEn ? "Map — Adana's Future" : "Harita — Geleceğin Adana'sı",
      description: isEn
        ? "Adana vision map: rail-system lines and all project locations on an interactive map."
        : "Adana vizyon haritası: raylı sistem hatları ve tüm proje lokasyonları interaktif haritada.",
      url: `${SITE_URL}${path}`,
    },
    twitter: {
      title: isEn ? "Map — Adana's Future" : "Harita — Geleceğin Adana'sı",
      description: isEn
        ? "Adana vision map: rail-system lines and all project locations on an interactive map."
        : "Adana vizyon haritası: raylı sistem hatları ve tüm proje lokasyonları interaktif haritada.",
    },
    alternates: await alternatesFor("/harita", locale as AppLocale),
  };
}

export default function HaritaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
