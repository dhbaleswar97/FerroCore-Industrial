"use client";

import { ThemeProvider } from "./theme-provider";
import { LenisProvider } from "./lenis-provider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LenisProvider>
        {children}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: "var(--font-sans)",
              background: "var(--color-card)",
              color: "var(--color-foreground)",
              border: "1px solid var(--color-border)",
            },
          }}
        />
      </LenisProvider>
    </ThemeProvider>
  );
}
