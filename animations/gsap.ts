"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const GSAP_DEFAULTS = {
  ease: "power3.out",
  duration: 0.8,
  stagger: 0.08,
};

export function fadeInUp(
  targets: gsap.TweenTarget,
  options?: {
    duration?: number;
    delay?: number;
    y?: number;
    stagger?: number;
    ease?: string;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: options?.y ?? 40 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? GSAP_DEFAULTS.duration,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? GSAP_DEFAULTS.stagger,
      ease: options?.ease ?? GSAP_DEFAULTS.ease,
      scrollTrigger: options?.scrollTrigger,
    }
  );
}

export function fadeIn(
  targets: gsap.TweenTarget,
  options?: {
    duration?: number;
    delay?: number;
    stagger?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    { opacity: 0 },
    {
      opacity: 1,
      duration: options?.duration ?? 0.6,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0,
      ease: "power2.out",
      scrollTrigger: options?.scrollTrigger,
    }
  );
}

export function scaleIn(
  targets: gsap.TweenTarget,
  options?: {
    duration?: number;
    delay?: number;
    from?: number;
    stagger?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    { opacity: 0, scale: options?.from ?? 0.92 },
    {
      opacity: 1,
      scale: 1,
      duration: options?.duration ?? GSAP_DEFAULTS.duration,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? GSAP_DEFAULTS.stagger,
      ease: "back.out(1.4)",
      scrollTrigger: options?.scrollTrigger,
    }
  );
}

export function revealText(
  targets: gsap.TweenTarget,
  options?: {
    duration?: number;
    stagger?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: "110%", rotateX: -15 },
    {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      duration: options?.duration ?? 0.9,
      stagger: options?.stagger ?? 0.06,
      ease: "power4.out",
      scrollTrigger: options?.scrollTrigger,
    }
  );
}

export function createScrollReveal(
  container: HTMLElement,
  animationFn: (el: HTMLElement) => void,
  triggerOptions?: Partial<ScrollTrigger.Vars>
): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: container,
    start: "top 85%",
    onEnter: () => animationFn(container),
    once: true,
    ...triggerOptions,
  });
}

export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
