"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// ─── Constants ────────────────────────────────────────────────────────────────
// Element is always MAX px × MAX px — clip-path shrinks/grows the visible circle.
// This avoids GPU texture upscaling (which causes pixelation with transform:scale).
const MAX  = 96;          // must be ≥ largest radius × 2
const HALF = MAX / 2;     // 48 — offset so element center sits on mouse position

const MAGNETIC_STR = 0.18;
const MAGNETIC_CAP = 10;

// clip-path radii (diameter = radius × 2)
const RADII = {
  default: 10,   // 20 px
  link:    28,   // 56 px
  button:  36,   // 72 px
  cta:     44,   // 88 px
} as const;

const CTA_KEYWORDS = [
  "get quote", "get started", "contact", "request",
  "bulk supply", "demo", "view dashboard", "sign up", "register",
];

function radiusForEl(el: Element): number {
  const text = (el.textContent ?? "").toLowerCase();
  if (CTA_KEYWORDS.some((k) => text.includes(k))) return RADII.cta;
  const w = (el as HTMLElement).getBoundingClientRect?.()?.width ?? 0;
  return w > 180 ? RADII.button : RADII.link;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Desktop / fine-pointer only
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.innerWidth < 1024
    ) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tDur = reduced ? 0 : 0.18;   // tracking duration
    const rDur = reduced ? 0 : 0.35;   // resize duration

    // Start off-screen
    gsap.set(dot, { x: -300, y: -300 });

    // Position — buttery quickTo, no easing overshoot
    const xTo = gsap.quickTo(dot, "x", { duration: tDur, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: tDur, ease: "power3.out" });

    let curRadius: number = RADII.default;
    let visible   = false;
    const cleanups: (() => void)[] = [];
    let rafId = 0;

    // ── Visibility ────────────────────────────────────────────
    function show() {
      if (visible) return;
      visible = true;
      gsap.to(dot, { opacity: 1, duration: 0.3, overwrite: "auto" });
    }
    function hide() {
      if (!visible) return;
      visible = false;
      gsap.to(dot, { opacity: 0, duration: 0.2, overwrite: "auto" });
    }

    // ── Resize via clip-path (crisp at every size, no pixelation) ────────────
    function applyRadius(r: number) {
      if (r === curRadius) return;
      curRadius = r;
      // power2.out = smooth but no elastic overshoot (which caused blur feel)
      gsap.to(dot, {
        clipPath:  `circle(${r}px at center)`,
        duration:  rDur,
        ease:      "power2.out",
        overwrite: "auto",
      });
    }

    // ── Cursor size: event delegation ─────────────────────────
    function onOver(e: MouseEvent) {
      const t = (e.target as Element).closest("button, a[href], [data-cursor]");
      applyRadius(t ? radiusForEl(t) : RADII.default);
    }
    function onOut(e: MouseEvent) {
      const from = (e.target as Element).closest("button, a[href], [data-cursor]");
      const to   = (e.relatedTarget as Element | null)?.closest("button, a[href], [data-cursor]");
      if (from && from !== to) applyRadius(RADII.default);
    }

    // ── Mouse tracking ────────────────────────────────────────
    function onMove(e: MouseEvent) {
      xTo(e.clientX);
      yTo(e.clientY);
      show();
    }

    // ── Magnetic pull on individual elements ──────────────────
    function bindMagnetic(node: HTMLElement) {
      if (node.dataset.mBound) return;
      const rect = node.getBoundingClientRect();
      if (rect.width > 360 || rect.width === 0) return;
      node.dataset.mBound = "1";

      const mx = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3.out" });
      const my = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3.out" });

      function move(e: MouseEvent) {
        const r  = node.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        mx(Math.max(-MAGNETIC_CAP, Math.min(MAGNETIC_CAP, (e.clientX - cx) * MAGNETIC_STR)));
        my(Math.max(-MAGNETIC_CAP, Math.min(MAGNETIC_CAP, (e.clientY - cy) * MAGNETIC_STR)));
      }
      function leave() { mx(0); my(0); }

      node.addEventListener("mousemove",  move);
      node.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        node.removeEventListener("mousemove",  move);
        node.removeEventListener("mouseleave", leave);
        gsap.killTweensOf(node);
      });
    }

    function scanMagnetics() {
      document.querySelectorAll<HTMLElement>("button, a[href]").forEach(bindMagnetic);
    }

    scanMagnetics();
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(scanMagnetics);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove",  onMove, { passive: true });
    document.addEventListener("mouseover",  onOver, { passive: true });
    document.addEventListener("mouseout",   onOut,  { passive: true });
    document.addEventListener("mouseleave", hide);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("mouseleave", hide);
      observer.disconnect();
      cancelAnimationFrame(rafId);
      cleanups.forEach((fn) => fn());
      gsap.killTweensOf(dot);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        // Fixed at MAX size — clip-path controls what's visible, not width/height
        position:        "fixed",
        top:             -HALF,   // -48px so GSAP x/y tracks the center, not top-left
        left:            -HALF,
        width:           MAX,
        height:          MAX,
        borderRadius:    "50%",
        clipPath:        `circle(10px at center)`,
        backgroundColor: "#ffffff",
        mixBlendMode:    "difference",
        pointerEvents:   "none",
        zIndex:          99999,
        opacity:         0,
        willChange:      "transform",  // only for x/y — no scale → no texture upscaling
      }}
    />
  );
}
