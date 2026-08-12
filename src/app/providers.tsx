"use client";

import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <Toaster />
      {children}
    </ThemeProvider>
  );
}