"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

/**
 * Client chrome (header + footer) around the page body. The locale context is
 * provided by `NextIntlClientProvider` in `app/[locale]/layout.tsx`, so this no
 * longer wires up its own provider.
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </>
  );
}
