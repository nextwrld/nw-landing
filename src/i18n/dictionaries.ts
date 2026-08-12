import type { Locale } from "./config";
import type { commonES } from "./es";

export type Dictionary = typeof commonES;

const loaders = {
  es: () => import("./es").then((m) => m.commonES),
  en: () => import("./en").then((m) => m.commonEN),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}