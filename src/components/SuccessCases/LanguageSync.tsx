"use client";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LanguageSync({ slug }: { slug: string }) {
  const { i18n } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    // Refresh the page when language changes to load correct content
    router.refresh();
  }, [i18n.language, router]);

  return null;
}
