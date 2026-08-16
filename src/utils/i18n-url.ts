import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { routeForSlug, servicePrefix, slugForRoute } from "@/content/sections";

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

/**
 * Translates a locale-prefixed pathname into the target locale, mapping every
 * V3 section slug through the per-locale slug table. Service prefixes
 * (servicios|services) and section slugs translate; case slugs and non-section
 * segments (contact, pricing, legal pages) stay unchanged.
 * Example: /es/servicios/software-a-medida -> /en/services/custom-software.
 */
export function translatePathname(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  const sourceLocale: Locale =
    segments.length > 0 && isLocale(segments[0]) ? segments[0] : defaultLocale;
  const rest = segments.slice(1);

  const translated = rest.map((segment, index) => {
    if (index === 0 && segment === servicePrefix(sourceLocale)) {
      return servicePrefix(targetLocale);
    }
    const route = routeForSlug(segment, sourceLocale);
    if (route !== null) {
      return slugForRoute(route, targetLocale);
    }
    return segment;
  });

  return translated.length > 0
    ? `/${targetLocale}/${translated.join("/")}`
    : `/${targetLocale}`;
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