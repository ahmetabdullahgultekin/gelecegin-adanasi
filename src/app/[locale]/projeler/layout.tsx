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
  const path = isEn ? "/en/projeler" : "/projeler";

  return {
    title: isEn ? "Projects" : "Projeler",
    description: isEn
      ? "14 proposed projects for Adana: transport, tourism, digital transformation, and urban infrastructure. Estimated costs and authority scope."
      : "Adana için önerilen 14 proje: ulaşım, turizm, dijital dönüşüm ve kentsel altyapı. Tahmini maliyetler ve yetki alanları.",
    openGraph: {
      title: isEn
        ? "Projects — Adana's Future"
        : "Projeler — Geleceğin Adana'sı",
      description: isEn
        ? "14 proposed projects for Adana: transport, tourism, digital transformation, and urban infrastructure."
        : "Adana için önerilen 14 proje: ulaşım, turizm, dijital dönüşüm ve kentsel altyapı.",
      url: `${SITE_URL}${path}`,
    },
    twitter: {
      title: isEn
        ? "Projects — Adana's Future"
        : "Projeler — Geleceğin Adana'sı",
      description: isEn
        ? "14 proposed projects for Adana: transport, tourism, digital transformation, and urban infrastructure."
        : "Adana için önerilen 14 proje: ulaşım, turizm, dijital dönüşüm ve kentsel altyapı.",
    },
    alternates: await alternatesFor("/projeler", locale as AppLocale),
  };
}

export default function ProjelerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
