"use client";

import { LocaleProvider } from "@/lib/locale-context";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider>
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
