"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initLenis, destroyLenis } from "@/animations/lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const isDashboard = pathname.startsWith("/dashboard");
    if (isDashboard) return;

    initLenis();

    return () => {
      destroyLenis();
    };
  }, [pathname]);

  return <>{children}</>;
}
