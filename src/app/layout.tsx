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
  title: "Geleceğin Adana'sı — Şehir Planlama Platformu",
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
  openGraph: {
    title: "Geleceğin Adana'sı",
    description:
      "Adana için bağımsız, veri odaklı şehir planlama ve vizyon platformu.",
    type: "website",
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
