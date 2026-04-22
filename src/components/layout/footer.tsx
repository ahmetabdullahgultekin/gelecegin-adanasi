"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export default function Footer() {
  const { t, locale } = useLocale();

  return (
    <footer className="bg-[color:var(--civic-900)] text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand + description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-display font-bold shadow-[0_8px_24px_-8px_rgba(15,118,110,0.6)]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--civic-500) 0%, var(--delta-500) 100%)",
                }}
              >
                GA
              </div>
              <div>
                <p className="font-display text-white font-bold text-lg tracking-tight">
                  Geleceğin Adana&apos;sı
                </p>
                <p className="text-xs text-white/50 font-mono uppercase tracking-widest mt-0.5">
                  {locale === "tr" ? "Şehir Planlama" : "Urban Planning"}
                </p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-md">
              {t.footer.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {(locale === "tr"
                ? ["Bağımsız", "Açık kaynak", "Siyasetten bağımsız"]
                : ["Independent", "Open source", "Non-political"]
              ).map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-xs text-white/70 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--delta-200)]" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-display text-white font-semibold text-sm uppercase tracking-widest mb-4">
              {locale === "tr" ? "Gezinme" : "Navigation"}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/projeler" className="hover:text-white transition-colors">
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link href="/harita" className="hover:text-white transition-colors">
                  {t.nav.map}
                </Link>
              </li>
              <li>
                <Link href="/hakkinda" className="hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Open source / contact */}
          <div>
            <h3 className="font-display text-white font-semibold text-sm uppercase tracking-widest mb-4">
              {locale === "tr" ? "Katılın" : "Contribute"}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/ahmetabdullahgultekin/gelecegin-adanasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ahmetabdullahgultekin/gelecegin-adanasi/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {locale === "tr" ? "Öneri / eleştiri" : "Suggest / critique"}
                </a>
              </li>
              <li>
                <a
                  href="https://rollingcatsoftware.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  RollingCat Software
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="section-rule mt-10 mb-6 opacity-20" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-white/50">
          <p className="font-mono">
            &copy; {new Date().getFullYear()} Geleceğin Adana&apos;sı. {t.footer.rights}
          </p>
          <p>
            {locale === "tr"
              ? "Bu bir siyasi kampanya değildir. Siyasi bağ yok."
              : "This is not a political campaign. No political affiliation."}
          </p>
        </div>
      </div>
    </footer>
  );
}
