"use client";

import { useLocale } from "@/lib/locale-context";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GA</span>
            </div>
            <div>
              <p className="text-white font-semibold">
                Geleceğin Adana&apos;sı
              </p>
              <p className="text-xs">{t.footer.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="https://github.com/ahmetabdullahgultekin/gelecegin-adanasi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span>|</span>
            <span>
              &copy; {new Date().getFullYear()} {t.footer.rights}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
