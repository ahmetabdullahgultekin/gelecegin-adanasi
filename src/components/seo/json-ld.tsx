import { SITE_URL } from "@/lib/site";

/**
 * Server-rendered JSON-LD structured data (Organization + WebSite). Emitted
 * once in the root layout so it appears on every page's initial HTML, making
 * the civic project a clear entity for search engines and unlocking
 * rich-result eligibility. Pure data — no client JS.
 */
export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Geleceğin Adana'sı",
    alternateName: "Adana's Future",
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    description:
      "Adana için bağımsız, veri odaklı şehir planlama ve vizyon platformu.",
    foundingLocation: {
      "@type": "Place",
      name: "Adana, Türkiye",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Adana",
    },
    knowsLanguage: ["tr", "en"],
    sameAs: [
      "https://github.com/ahmetabdullahgultekin/gelecegin-adanasi",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Geleceğin Adana'sı",
    inLanguage: ["tr", "en"],
    description:
      "Adana için bağımsız, veri odaklı şehir planlama, ulaşım, turizm, tarım ve dijital dönüşüm projeleri.",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Server-rendered, static, non-user data — safe to inline.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
