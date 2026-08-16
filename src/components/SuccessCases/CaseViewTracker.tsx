"use client";

import { useEffect } from "react";
import { trackEvent } from "@/utils/analytics";

const CaseViewTracker = ({ slug, locale }: { slug: string; locale: string }) => {
  useEffect(() => {
    trackEvent("case_click", { case_slug: slug, locale });
  }, [slug, locale]);

  return null;
};

export default CaseViewTracker;
