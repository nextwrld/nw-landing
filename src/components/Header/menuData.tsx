import type { Menu } from "@/types/menu";
import { localizedHref } from "@/utils/i18n-url";
import { publishedRoutes, routeFromDestination } from "@/content/sections";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { HomepageContent } from "@/content/homepage/types";

const buildMenuData = (
  menu: Dictionary["menu"],
  locale: Locale
): Menu[] => [
  {
    id: 1,
    title: menu.home,
    path: localizedHref(locale, "/"),
    newTab: false,
  },
  {
    id: 2,
    title: menu.features,
    path: localizedHref(locale, "/#features"),
    newTab: false,
  },
  {
    id: 3,
    title: menu.services,
    path: localizedHref(locale, "/#services"),
    newTab: false,
  },
  {
    id: 4,
    title: menu.about,
    path: localizedHref(locale, "/#pricing"),
    newTab: false,
  },
  {
    id: 5,
    title: menu.faq,
    path: localizedHref(locale, "/#faq"),
    newTab: false,
  },
  {
    id: 6,
    title: menu.contact,
    path: localizedHref(locale, "/#contact"),
    newTab: false,
  },
];

export function buildApprovedNav(content: HomepageContent): Menu[] {
  const items: Menu[] = [];
  let id = 1;
  for (const item of content.nav.items) {
    if (item.approved && item.destination) {
      items.push({
        id: id++,
        title: item.label,
        path: localizedHref(content.locale, item.destination),
        newTab: false,
      });
    }
  }
  return items;
}

/**
 * V3 route-based nav: emits only approved items whose destinations are
 * registered section routes. The services item renders its approved children
 * as a submenu. EN entries are emitted structurally (registered routes) while
 * the locale-parity gate keeps `publishedRoutes("en")` empty, so release
 * validation blocks EN links until approved content exists.
 */
export function buildApprovedNavV3(content: HomepageContent): Menu[] {
  const items: Menu[] = [];
  let id = 1;
  for (const item of content.nav.items) {
    if (!item.approved) {
      continue;
    }
    if (item.children && item.children.length > 0) {
      const submenu: Menu[] = [];
      for (const child of item.children) {
        if (!child.approved || !child.destination) {
          continue;
        }
        const route = routeFromDestination(child.destination, content.locale);
        if (route === null) {
          continue;
        }
        submenu.push({
          id: id++,
          title: child.label,
          path: localizedHref(content.locale, child.destination),
          newTab: false,
        });
      }
      if (submenu.length > 0) {
        items.push({
          id: id++,
          title: item.label,
          newTab: false,
          submenu,
        });
      }
      continue;
    }
    if (!item.destination) {
      continue;
    }
    const route = routeFromDestination(item.destination, content.locale);
    if (route === null) {
      continue;
    }
    items.push({
      id: id++,
      title: item.label,
      path: localizedHref(content.locale, item.destination),
      newTab: false,
    });
  }
  return items;
}

export type ShellA11yCopy = {
  menuToggle: string;
  skipToContent: string;
};

export function shellA11yCopy(locale: Locale): ShellA11yCopy {
  return locale === "es"
    ? { menuToggle: "Abrir menú", skipToContent: "Saltar al contenido principal" }
    : { menuToggle: "Open menu", skipToContent: "Skip to main content" };
}

export function nextMenuState(current: boolean, key: string): boolean | null {
  if (key === "Escape") return false;
  if (key === "Enter" || key === " ") return !current;
  return null;
}

const SOCIAL_NETWORKS = ["X", "Instagram", "LinkedIn"] as const;

export type SocialNetwork = (typeof SOCIAL_NETWORKS)[number];

export function socialLinkLabel(locale: Locale, network: SocialNetwork): string {
  const name = locale === "es" ? "Enlace social" : "Social link";
  return `${name} ${network}`;
}

export default buildMenuData;
