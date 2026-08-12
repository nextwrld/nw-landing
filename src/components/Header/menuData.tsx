import { Menu } from "@/types/menu";
import type { TOptions } from "i18next";
import { localizedHref } from "@/utils/i18n-url";
import type { Locale } from "@/i18n/config";

const buildMenuData = (
  t: (key: string, options?: TOptions) => string,
  locale: Locale
): Menu[] => [
  
  {
    id: 1,
    title: t("menu.home"),
    path: localizedHref(locale, "/"),
    newTab: false,
  },
  {
    id: 2,
    title: t("menu.features"),
    path: localizedHref(locale, "/#features"),
    newTab: false,
  },
  {
    id: 3,
    title: t("menu.services"),
    path: localizedHref(locale, "/#services"),
    newTab: false,
  },
  {
    id: 4,
    title: t("menu.about"),
    path: localizedHref(locale, "/#pricing"),
    newTab: false,
  },
  {
    id: 5,
    title: t("menu.faq"),
    path: localizedHref(locale, "/#faq"),
    newTab: false,
  },
  {
    id: 6,
    title: t("menu.contact"),
    path: localizedHref(locale, "/#contact"),
    newTab: false,
  },
];

export default buildMenuData;


