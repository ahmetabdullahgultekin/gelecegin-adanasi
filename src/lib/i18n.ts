import trMessages from "../../messages/tr.json";
import enMessages from "../../messages/en.json";

/**
 * Supported locales. Kept in sync with `i18n/routing.ts` (TR is the
 * default/canonical locale).
 */
export type Locale = "tr" | "en";

/**
 * Server-readable translation maps. The JSON catalogs in `messages/` are the
 * single source of truth (also consumed by next-intl via `i18n/request.ts`);
 * this module re-exports them as typed objects for server code that needs the
 * raw strings directly — e.g. `generateMetadata` and JSON-LD on the project
 * detail route — without going through the `useTranslations` hook.
 */
export const translations = {
  tr: trMessages,
  en: enMessages,
} as const;

export type Translations = typeof translations.tr;
