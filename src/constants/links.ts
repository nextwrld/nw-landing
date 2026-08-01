export const CALENDAR_URL =
  process.env.NEXT_PUBLIC_CALENDAR_URL ||
  "https://calendar.app.google/JQnkVUqK3FF5VSRU6";

export const CONTACT_EMAIL = "info@nextwrld.com";
export const SECONDARY_EMAIL = "contact@nextwrld.com";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NJJC2MGP";
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-2GJSCZWWHC";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/nextwrld",
  twitter: "https://twitter.com/nextwrld",
  instagram: "https://www.instagram.com/nextwrld",
  facebook: "https://www.facebook.com/nextwrld",
} as const;
