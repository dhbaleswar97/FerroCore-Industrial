"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";

interface ScrollRevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const {
      y = 40,
      opacity = 0,
      duration = 0.8,
      stagger = 0,
      start = "top 85%",
      once = true,
    } = options;

    const targets = el.querySelectorAll("[data-reveal]");
    const els = targets.length > 0 ? Array.from(targets) : [el];

    gsap.set(els, { opacity, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
        });
      },
    });

    return () => trigger.kill();
  }, [options]);

  return ref;
}
