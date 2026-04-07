import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Harita",
  description:
    "Adana vizyon haritası: 5 raylı sistem hattı, 30+ durak ve 14 projenin interaktif harita üzerinde görünümü.",
  openGraph: {
    title: "Harita — Geleceğin Adana'sı",
    description:
      "Adana vizyon haritası: raylı sistem hatları ve tüm proje lokasyonları interaktif haritada.",
    url: "https://geleceginadanasi.com.tr/harita",
  },
  twitter: {
    title: "Harita — Geleceğin Adana'sı",
    description:
      "Adana vizyon haritası: raylı sistem hatları ve tüm proje lokasyonları interaktif haritada.",
  },
  alternates: {
    canonical: "/harita",
  },
};

export default function HaritaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
