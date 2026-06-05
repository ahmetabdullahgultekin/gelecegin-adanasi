"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { translations, Locale, Translations } from "./i18n";

interface LocaleContextType {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

const STORAGE_KEY = "ga-locale";

/** Validate an arbitrary string into a supported {@link Locale}. */
function normalize(value: string | null | undefined): Locale | null {
  return value === "tr" || value === "en" ? value : null;
}

/**
 * Resolve the initial locale on the client. Precedence:
 *   1. `?lang=` query param (lets crawlers + shared links pin a language)
 *   2. persisted choice in localStorage
 *   3. the document's `lang` attribute (SSR default = "tr")
 * Returns "tr" on the server / before hydration so SSR output is deterministic.
 */
function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") return "tr";
  const fromUrl = normalize(
    new URLSearchParams(window.location.search).get("lang")
  );
  if (fromUrl) return fromUrl;
  try {
    const fromStorage = normalize(window.localStorage.getItem(STORAGE_KEY));
    if (fromStorage) return fromStorage;
  } catch {
    /* localStorage blocked (private mode / cookies off) — fall through */
  }
  const fromHtml = normalize(document.documentElement.lang);
  return fromHtml ?? "tr";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Lazy initializer runs once: "tr" on the server (deterministic SSR), and
  // the resolved URL/storage value on the client's first render. The sync
  // effect below then aligns <html lang>/URL/storage. Using the initializer
  // (instead of a setState-in-effect) keeps the React-19 hooks rule happy.
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale);

  // Keep <html lang>, localStorage, and the URL ?lang param in sync with the
  // active locale. Screen readers + crawlers read `lang`; the URL param makes
  // the EN view linkable/shareable; storage makes the choice survive reloads.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore storage failures */
    }
    try {
      const url = new URL(window.location.href);
      if (locale === "tr") url.searchParams.delete("lang");
      else url.searchParams.set("lang", locale);
      window.history.replaceState(null, "", url.toString());
    } catch {
      /* ignore URL failures */
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const toggleLocale = useCallback(
    () => setLocaleState((prev) => (prev === "tr" ? "en" : "tr")),
    []
  );

  const t = translations[locale];

  return (
    <LocaleContext.Provider value={{ locale, t, toggleLocale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
