import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Geleceğin Adana'sı — Şehir Planlama Platformu",
    template: "%s | Geleceğin Adana'sı",
  },
  description:
    "Adana için bağımsız, veri odaklı şehir planlama ve vizyon platformu. Ulaşım, turizm, tarım ve dijital dönüşüm projeleri.",
  keywords: [
    "Adana",
    "şehir planlama",
    "ulaşım",
    "metro",
    "tramvay",
    "turizm",
    "tarım",
    "Karataş",
    "Yumurtalık",
    "ÇukurovaRay",
  ],
  metadataBase: new URL("https://geleceginadanasi.com.tr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Geleceğin Adana'sı",
    description:
      "Adana için bağımsız, veri odaklı şehir planlama ve vizyon platformu.",
    type: "website",
    url: "https://geleceginadanasi.com.tr",
    siteName: "Geleceğin Adana'sı",
    locale: "tr_TR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Geleceğin Adana'sı — Şehir Planlama Platformu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geleceğin Adana'sı",
    description:
      "Adana için bağımsız, veri odaklı şehir planlama ve vizyon platformu.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
