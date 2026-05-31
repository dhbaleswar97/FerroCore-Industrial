"use client";

import { useRef, useEffect } from "react";
import { createMagneticEffect, type MagneticOptions } from "@/animations/magnetic";

export function useMagnetic<T extends HTMLElement>(options?: MagneticOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cleanup = createMagneticEffect(ref.current, options);
    return cleanup;
  }, [options]);

  return ref;
}
