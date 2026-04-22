"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { useState, useEffect } from "react";

export default function Header() {
  const { t, toggleLocale } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[color:var(--paper)]/80 backdrop-blur-xl border-b border-[color:var(--border)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm shadow-[0_8px_20px_-8px_rgba(13,30,55,0.5)]"
              style={{
                background:
                  "linear-gradient(135deg, var(--civic-700) 0%, var(--delta-500) 100%)",
              }}
            >
              GA
            </div>
            <span className="font-display font-semibold text-base md:text-lg text-[color:var(--ink)] hidden sm:block tracking-tight">
              Geleceğin Adana&apos;sı
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/", label: t.nav.home },
              { href: "/projeler", label: t.nav.projects },
              { href: "/harita", label: t.nav.map },
              { href: "/hakkinda", label: t.nav.about },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-sm font-medium text-[color:var(--ink-soft)] hover:text-[color:var(--civic-700)] rounded-md hover:bg-[color:var(--paper-soft)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleLocale}
              aria-label="Toggle language"
              className="ml-2 px-3 py-1.5 text-xs font-mono font-semibold text-[color:var(--civic-700)] border border-[color:var(--border)] rounded-full hover:bg-[color:var(--paper-soft)] hover:border-[color:var(--civic-300)] transition-colors"
            >
              {t.nav.language}
            </button>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-[color:var(--paper-soft)] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg
              className="w-6 h-6 text-[color:var(--ink)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1 pt-2">
            {[
              { href: "/", label: t.nav.home },
              { href: "/projeler", label: t.nav.projects },
              { href: "/harita", label: t.nav.map },
              { href: "/hakkinda", label: t.nav.about },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 text-[color:var(--ink-soft)] hover:text-[color:var(--civic-700)] hover:bg-[color:var(--paper-soft)] rounded-md font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleLocale();
                setMenuOpen(false);
              }}
              className="mt-2 mx-3 px-3 py-2 text-sm font-mono font-semibold text-[color:var(--civic-700)] border border-[color:var(--border)] rounded-full hover:bg-[color:var(--paper-soft)] transition-colors"
            >
              {t.nav.language}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
