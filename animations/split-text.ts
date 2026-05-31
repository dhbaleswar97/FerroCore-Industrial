"use client";

import SplitType from "split-type";
import { gsap } from "./gsap";

export function splitAndReveal(
  element: HTMLElement,
  options?: {
    type?: "lines" | "words" | "chars" | "lines,words" | "words,chars";
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
    from?: { y?: string | number; opacity?: number; rotateX?: number };
  }
): { split: SplitType; tween: gsap.core.Tween } {
  const split = new SplitType(element, {
    types: (options?.type ?? "lines") as "lines" | "words" | "chars",
    tagName: "span",
  });

  const targets = split.lines ?? split.words ?? split.chars ?? [];

  const tween = gsap.fromTo(
    targets,
    {
      opacity: 0,
      y: options?.from?.y ?? "105%",
      rotateX: options?.from?.rotateX ?? -10,
    },
    {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      duration: options?.duration ?? 0.9,
      stagger: options?.stagger ?? 0.05,
      delay: options?.delay ?? 0,
      ease: options?.ease ?? "power4.out",
    }
  );

  return { split, tween };
}

export function splitWordByWord(
  element: HTMLElement,
  options?: { duration?: number; stagger?: number; delay?: number }
): { split: SplitType; tween: gsap.core.Tween } {
  return splitAndReveal(element, {
    type: "words",
    duration: options?.duration ?? 0.8,
    stagger: options?.stagger ?? 0.04,
    delay: options?.delay ?? 0,
    from: { y: 30, opacity: 0, rotateX: 0 },
  });
}

export function splitCharByChar(
  element: HTMLElement,
  options?: { duration?: number; stagger?: number; delay?: number }
): { split: SplitType; tween: gsap.core.Tween } {
  return splitAndReveal(element, {
    type: "chars",
    duration: options?.duration ?? 0.6,
    stagger: options?.stagger ?? 0.02,
    delay: options?.delay ?? 0,
    from: { y: 20, opacity: 0, rotateX: 0 },
  });
}
