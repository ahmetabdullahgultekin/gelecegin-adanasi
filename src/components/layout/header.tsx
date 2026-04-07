"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { useState } from "react";

export default function Header() {
  const { t, toggleLocale } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GA</span>
            </div>
            <span className="font-bold text-lg text-gray-900 hidden sm:block">
              Geleceğin Adana&apos;sı
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/projeler"
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              {t.nav.projects}
            </Link>
            <Link
              href="/harita"
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              {t.nav.map}
            </Link>
            <Link
              href="/hakkinda"
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              {t.nav.about}
            </Link>
            <button
              onClick={toggleLocale}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
            >
              {t.nav.language}
            </button>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
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
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-blue-600 px-2 py-1"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/projeler"
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-blue-600 px-2 py-1"
            >
              {t.nav.projects}
            </Link>
            <Link
              href="/harita"
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-blue-600 px-2 py-1"
            >
              {t.nav.map}
            </Link>
            <Link
              href="/hakkinda"
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-blue-600 px-2 py-1"
            >
              {t.nav.about}
            </Link>
            <button
              onClick={() => {
                toggleLocale();
                setMenuOpen(false);
              }}
              className="text-left text-blue-600 px-2 py-1 font-medium"
            >
              {t.nav.language}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
