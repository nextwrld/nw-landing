import type { Menu } from "@/types/menu";
import { localizedHref } from "@/utils/i18n-url";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

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

export default buildMenuData;
