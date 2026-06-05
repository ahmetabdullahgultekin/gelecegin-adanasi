import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import ClientLayout from "../client-layout";
import JsonLd from "@/components/seo/json-ld";
import { SITE_URL, alternatesFor } from "@/lib/site";
import { routing, type AppLocale } from "@/i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Per-locale, per-language metadata. Turkish copy is canonical; English gets
 *  its own localized title/description served from the `/en` URL. hreflang
 *  alternates pair the TR (`/`) and EN (`/en`) URLs for the homepage. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: {
      default: isEn
        ? "Adana's Future — Urban Planning Platform"
        : "Geleceğin Adana'sı — Şehir Planlama Platformu",
      template: isEn
        ? "%s | Adana's Future"
        : "%s | Geleceğin Adana'sı",
    },
    description: isEn
      ? "Independent, data-driven urban planning and vision platform for Adana. Transport, tourism, agriculture, and digital-transformation projects."
      : "Adana için bağımsız, veri odaklı şehir planlama ve vizyon platformu. Ulaşım, turizm, tarım ve dijital dönüşüm projeleri.",
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
    metadataBase: new URL(SITE_URL),
    alternates: await alternatesFor("/", locale as AppLocale),
    openGraph: {
      title: isEn ? "Adana's Future" : "Geleceğin Adana'sı",
      description: isEn
        ? "Independent, data-driven urban planning and vision platform for Adana."
        : "Adana için bağımsız, veri odaklı şehir planlama ve vizyon platformu.",
      type: "website",
      url: isEn ? `${SITE_URL}/en` : SITE_URL,
      siteName: isEn ? "Adana's Future" : "Geleceğin Adana'sı",
      locale: isEn ? "en_US" : "tr_TR",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: isEn
            ? "Adana's Future — Urban Planning Platform"
            : "Geleceğin Adana'sı — Şehir Planlama Platformu",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "Adana's Future" : "Geleceğin Adana'sı",
      description: isEn
        ? "Independent, data-driven urban planning and vision platform for Adana."
        : "Adana için bağımsız, veri odaklı şehir planlama ve vizyon platformu.",
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

/** Pre-render both locales (`tr` at `/`, `en` at `/en`) at build time. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <NextIntlClientProvider>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
