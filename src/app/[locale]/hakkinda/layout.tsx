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
  const path = isEn ? "/en/hakkinda" : "/hakkinda";

  return {
    title: isEn ? "About" : "Hakkında",
    description: isEn
      ? "About the Adana's Future platform. An independent, data-driven urban-planning vision — our mission and values."
      : "Geleceğin Adana'sı platformu hakkında. Bağımsız, veri odaklı şehir planlama vizyonu, misyon ve değerlerimiz.",
    openGraph: {
      title: isEn ? "About — Adana's Future" : "Hakkında — Geleceğin Adana'sı",
      description: isEn
        ? "About the Adana's Future platform. An independent, data-driven urban-planning vision."
        : "Geleceğin Adana'sı platformu hakkında. Bağımsız, veri odaklı şehir planlama vizyonu.",
      url: `${SITE_URL}${path}`,
    },
    twitter: {
      title: isEn ? "About — Adana's Future" : "Hakkında — Geleceğin Adana'sı",
      description: isEn
        ? "About the Adana's Future platform. An independent, data-driven urban-planning vision."
        : "Geleceğin Adana'sı platformu hakkında. Bağımsız, veri odaklı şehir planlama vizyonu.",
    },
    alternates: await alternatesFor("/hakkinda", locale as AppLocale),
  };
}

export default function HakkindaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
