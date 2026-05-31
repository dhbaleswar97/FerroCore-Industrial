"use client";

import { useState, useEffect } from "react";

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  direction: "up" | "down" | null;
  isAtTop: boolean;
  isAtBottom: boolean;
  progress: number;
}

export function useScrollPosition(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    direction: null,
    isAtTop: true,
    isAtBottom: false,
    progress: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const update = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      setPosition({
        scrollY,
        scrollX,
        direction: scrollY > lastScrollY ? "down" : scrollY < lastScrollY ? "up" : null,
        isAtTop: scrollY < 10,
        isAtBottom: scrollY >= docHeight - 10,
        progress: Math.min(1, Math.max(0, progress)),
      });

      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return position;
}
