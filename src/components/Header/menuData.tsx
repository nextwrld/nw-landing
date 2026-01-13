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
    title: "Services",
    path: "/#services",
    newTab: false,
  },
  {
    id: 4,
    title: "About",
    path: "/#about",
    newTab: false,
  },
  {
    id: 5,
    title: "Plans",
    path: "/#pricing",
    newTab: false,
  },
  {
    id: 6,
    title: "FAQs",
    path: "/#faq",
    newTab: false,
  },
  {
    id: 7,
    title: "Success Cases",
    path: "/#success-cases",
    newTab: false,
  },
  {
    id: 8,
    title: "Contact",
    path: "/#contact",
    newTab: false,
  },
];

export default buildMenuData;


