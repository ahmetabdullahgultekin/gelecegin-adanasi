import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation primitives. These are drop-in replacements for the
 * Next.js equivalents that automatically keep the active locale in the URL
 * (adding the `/en` prefix only when needed, per `localePrefix: "as-needed"`).
 * Always import `Link`/`usePathname`/`useRouter` from here, not `next/link` /
 * `next/navigation`, so locale-prefixed routing stays correct.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
