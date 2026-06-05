import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * next-intl proxy (formerly "middleware") — performs locale negotiation and
 * rewrites/redirects so that `/` serves Turkish (no prefix) and `/en/...`
 * serves English, per the `localePrefix: "as-needed"` strategy in
 * `i18n/routing.ts`. Next.js 16 renamed the `middleware` file convention to
 * `proxy`; the next-intl handler is unchanged.
 */
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`, `og-image.png`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
