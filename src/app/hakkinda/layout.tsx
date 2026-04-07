import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkında",
  description:
    "Geleceğin Adana'sı platformu hakkında. Bağımsız, veri odaklı şehir planlama vizyonu, misyon ve değerlerimiz.",
  openGraph: {
    title: "Hakkında — Geleceğin Adana'sı",
    description:
      "Geleceğin Adana'sı platformu hakkında. Bağımsız, veri odaklı şehir planlama vizyonu.",
    url: "https://geleceginadanasi.com.tr/hakkinda",
  },
  twitter: {
    title: "Hakkında — Geleceğin Adana'sı",
    description:
      "Geleceğin Adana'sı platformu hakkında. Bağımsız, veri odaklı şehir planlama vizyonu.",
  },
  alternates: {
    canonical: "/hakkinda",
  },
};

export default function HakkindaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
