"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/hooks/useLocale";
import { translatePathname } from "@/utils/i18n-url";
import { languageChangeParams, trackEvent } from "@/utils/analytics";
import { locales, type Locale } from "@/i18n/config";

const LanguageSelector = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const navigateTo = (target: Locale) => {
    if (target === locale) return;
    trackEvent("language_change", languageChangeParams(locale, target, pathname));
    const path = translatePathname(pathname, target);
    const { search, hash } = window.location;
    router.push(`${path}${search}${hash}`);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((lng) => (
        <button
          key={lng}
          onClick={() => navigateTo(lng)}
          aria-pressed={locale === lng}
          aria-label={lng === "en" ? "Switch to English" : "Cambiar a Español"}
          className={`rounded px-3 py-1 text-sm font-medium transition-colors duration-200 ${
            locale === lng
              ? "bg-primary text-white"
              : "text-body-color hover:bg-gray-2 dark:text-white dark:hover:bg-white/5"
          }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;