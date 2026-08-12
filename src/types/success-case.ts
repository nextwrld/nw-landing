import type { Locale } from "@/i18n/config";

export interface SuccessCase {
  slug?: string;
  title?: string;
  description?: string;
  coverImage?: string;
  date?: string;
  author?: string;
  authorImage?: string;
  content?: string;
  locale?: Locale;
}