import { Menu } from "@/types/menu";

const buildMenuData = (
  t: (key: string, options?: any) => string
): Menu[] => [
  
  {
    id: 1,
    title: t("menu.home"),
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: t("menu.features"),
    path: "/#features",
    newTab: false,
  },
  {
    id: 3,
    title: t("menu.services"),
    path: "/#services",
    newTab: false,
  },
  {
    id: 4,
    title: t("menu.about"),
    path: "/#pricing",
    newTab: false,
  },
  {
    id: 5,
    title: t("menu.faq"),
    path: "/#faq",
    newTab: false,
  },
  {
    id: 6,
    title: t("menu.contact"),
    path: "/#contact",
    newTab: false,
  },
];

export default buildMenuData;


