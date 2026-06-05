import type { Metadata } from "next";
import { alternatesFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Adana için önerilen 14 proje: ulaşım, turizm, dijital dönüşüm ve kentsel altyapı. Tahmini maliyetler ve yetki alanları.",
  openGraph: {
    title: "Projeler — Geleceğin Adana'sı",
    description:
      "Adana için önerilen 14 proje: ulaşım, turizm, dijital dönüşüm ve kentsel altyapı.",
    url: "https://geleceginadanasi.com.tr/projeler",
  },
  twitter: {
    title: "Projeler — Geleceğin Adana'sı",
    description:
      "Adana için önerilen 14 proje: ulaşım, turizm, dijital dönüşüm ve kentsel altyapı.",
  },
  alternates: alternatesFor("/projeler"),
};

export default function ProjelerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
