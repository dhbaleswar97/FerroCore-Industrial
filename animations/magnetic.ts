"use client";

import { gsap } from "./gsap";

export interface MagneticOptions {
  strength?: number;
  ease?: number;
  radiusFactor?: number;
}

export function createMagneticEffect(
  element: HTMLElement,
  options: MagneticOptions = {}
): () => void {
  const { strength = 0.4, ease = 0.15, radiusFactor = 1.5 } = options;

  let rafId: number;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }

  function animate() {
    currentX = lerp(currentX, targetX, ease);
    currentY = lerp(currentY, targetY, ease);
    gsap.set(element, { x: currentX, y: currentY });
    rafId = requestAnimationFrame(animate);
  }

  function onMouseMove(e: MouseEvent) {
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const radius = Math.max(rect.width, rect.height) * radiusFactor;
    const dist = Math.hypot(dx, dy);

    if (dist < radius) {
      targetX = dx * strength;
      targetY = dy * strength;
    }
  }

  function onMouseLeave() {
    targetX = 0;
    targetY = 0;
  }

  rafId = requestAnimationFrame(animate);
  element.addEventListener("mousemove", onMouseMove);
  element.addEventListener("mouseleave", onMouseLeave);

  return () => {
    cancelAnimationFrame(rafId);
    element.removeEventListener("mousemove", onMouseMove);
    element.removeEventListener("mouseleave", onMouseLeave);
    gsap.set(element, { x: 0, y: 0 });
  };
}
