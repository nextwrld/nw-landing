import { defaultLocale, type Locale } from "@/i18n/config";

export function localizedPath(locale: Locale, path: string): string {
  if (!path.startsWith("/")) {
    return path;
  }
  if (path === "/") {
    return `/${locale}`;
  }
  return `/${locale}${path}`;
}

export function localizedHref(locale: Locale, path: string): string {
  if (path.startsWith("/#")) {
    return `/${locale}/${path.slice(1)}`;
  }
  return localizedPath(locale, path);
}

export function replaceLocale(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${nextLocale}`;
  }
  if (segments[0] === "es" || segments[0] === "en") {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }
  return `/${segments.join("/")}`;
}

export const HOME_LABEL: Record<Locale, string> = {
  es: "Inicio",
  en: "Home",
};

export const DEFAULT_HOME_LABEL = HOME_LABEL[defaultLocale];