"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export function useLocale(): Locale {
  const pathname = usePathname();
  const firstSegment = pathname.split("/")[1];
  return isLocale(firstSegment) ? firstSegment : defaultLocale;
}