import "./globals.css";

/**
 * Root layout — intentionally minimal. With next-intl's `[locale]` routing the
 * real document shell (`<html>`, fonts, providers, metadata) lives in
 * `app/[locale]/layout.tsx`, where the active locale is known. This wrapper
 * only forwards children so Next.js has a root layout for non-localized
 * special files (sitemap, robots, the not-found boundary).
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
