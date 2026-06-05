import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * Per-request next-intl configuration. The requested locale typically comes
 * from the `[locale]` segment; if it is missing or unsupported we fall back to
 * the default (Turkish). The matching message catalog is loaded from
 * `messages/<locale>.json` — these carry the SAME keys as the former
 * `src/lib/i18n.ts` maps.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
