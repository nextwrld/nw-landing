"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "../i18n";
import i18n from "../i18n";

export default function Providers({ children, initialLanguage = "es" }: PropsWithChildren & { initialLanguage?: string }) {
  useEffect(() => {
    if (i18n.language !== initialLanguage) {
      i18n.changeLanguage(initialLanguage);
    }
  }, [initialLanguage]);

  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="light"
    >
      <Toaster />
      {children}
    </ThemeProvider>
  );
}
