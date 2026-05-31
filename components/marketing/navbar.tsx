"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, ArrowRight, Home, Package, Mail, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/constants/brand";

// ─── Easing constants ────────────────────────────────────────────────────────
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN: [number, number, number, number] = [0.7, 0, 0.84, 0];

// ─── Navigation data ─────────────────────────────────────────────────────────
const TOP_LINKS = [
  { href: "/about",     label: "About"     },
  { href: "/products",  label: "Products"  },
  { href: "/solutions", label: "Solutions" },
  { href: "/contact",   label: "Contact"   },
];

// Compact items shown in the floating pill
const PILL_LINKS = [
  { href: "/home",     label: "Home",     Icon: Home    },
  { href: "/products", label: "Products", Icon: Package },
  { href: "/contact",  label: "Contact",  Icon: Mail    },
];

// All items shown in the overlay menu (with big typography)
const OVERLAY_LINKS = [
  { href: "/home",     label: "Home"      },
  { href: "/about",    label: "About"     },
  { href: "/products", label: "Products"  },
  { href: "/solutions",label: "Solutions" },
  { href: "/contact",  label: "Contact"   },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const overlayVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, filter: "blur(4px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
    transition: { duration: 0.28, ease: EASE_IN },
  },
};

const linkRowVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.12 } },
};

const linkItemVariants: Variants = {
  hidden: { opacity: 0, x: -32, filter: "blur(6px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: EASE_OUT } },
};

// ─── Pill NavItem ─────────────────────────────────────────────────────────────
function PillLink({
  href, label, Icon, active,
}: {
  href: string; label: string; Icon: React.ElementType; active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "bg-foreground/8 text-foreground"
          : "text-foreground/55 hover:bg-foreground/6 hover:text-foreground"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 transition-transform duration-200 group-hover:scale-110",
          active ? "text-brand-ember" : "text-foreground/40"
        )}
      />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function MarketingNavbar() {
  const pathname = usePathname();
  const [scrolled,     setScrolled]     = useState(false);
  const [topHidden,    setTopHidden]    = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const lastY = useRef(0);

  // Scroll detection
  useEffect(() => {
    const THRESHOLD   = 80;   // px — start tracking direction after this
    const SENSITIVITY = 6;    // px — minimum delta to trigger state change

    const handler = () => {
      const y     = window.scrollY;
      const delta = y - lastY.current;

      setScrolled(y > 20);

      if (y <= THRESHOLD) {
        setTopHidden(false);
      } else if (delta > SENSITIVITY) {
        setTopHidden(true);    // scrolling down → hide top, show pill
      } else if (delta < -SENSITIVITY) {
        setTopHidden(false);   // scrolling up → show top, hide pill
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close overlay on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          TOP NAVIGATION
      ══════════════════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y:       topHidden ? -80 : 0,
          opacity: topHidden ?  0  : 1,
        }}
        transition={{
          y:       { duration: topHidden ? 0.38 : 0.52, ease: topHidden ? EASE_IN : EASE_OUT },
          opacity: { duration: 0.28 },
        }}
        className={cn(
          "fixed left-0 right-0 top-0 z-[200] will-change-transform",
          scrolled
            ? "border-b border-border/50 bg-background/85 py-3 backdrop-blur-xl"
            : "bg-transparent py-5"
        )}
        style={{ pointerEvents: topHidden ? "none" : "auto" }}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-ember shadow-brand transition-transform duration-200 group-hover:scale-110">
              <span className="text-sm font-black text-white">FC</span>
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              {BRAND.shortName}
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-7 md:flex">
            {TOP_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative text-sm font-medium transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-brand-ember after:transition-all after:duration-300 hover:text-foreground hover:after:w-full",
                  pathname === href
                    ? "text-foreground after:w-full"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:block"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="hidden rounded-full bg-brand-ember px-5 py-2 text-sm font-semibold text-white shadow-brand transition-all hover:scale-[1.03] hover:bg-brand-ember/90 hover:shadow-lg md:inline-flex"
            >
              Get Started
            </Link>
            {/* Mobile hamburger (top nav) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:bg-muted md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════════════════
          FLOATING BOTTOM PILL NAVIGATION
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {topHidden && (
          <motion.div
            key="floating-nav"
            initial={{ y: 96, opacity: 0, scale: 0.88 }}
            animate={{ y: 0,  opacity: 1, scale: 1    }}
            exit={{   y: 96, opacity: 0, scale: 0.9   }}
            transition={{
              y:       { duration: 0.5,  ease: EASE_OUT },
              opacity: { duration: 0.35 },
              scale:   { duration: 0.5,  ease: EASE_OUT },
            }}
            className="fixed bottom-5 left-1/2 z-[200] -translate-x-1/2 will-change-transform"
            style={{
              width: "clamp(320px, 40vw, 600px)",
            }}
          >
            <div
              className="flex items-center justify-between gap-1.5 rounded-full border border-black/[0.08] bg-background/92 px-2 py-2 backdrop-blur-2xl"
              style={{
                boxShadow:
                  "0 4px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.6)",
              }}
            >
              {/* Logo mark */}
              <Link
                href="/home"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-ember shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md"
                aria-label="Home"
              >
                <span className="text-xs font-black text-white">FC</span>
              </Link>

              {/* Divider */}
              <div className="mx-0.5 h-6 w-px rounded-full bg-border/60" />

              {/* Pill nav links */}
              <div className="flex flex-1 items-center justify-center gap-0.5">
                {PILL_LINKS.map(({ href, label, Icon }) => (
                  <PillLink
                    key={href}
                    href={href}
                    label={label}
                    Icon={Icon}
                    active={pathname === href}
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="mx-0.5 h-6 w-px rounded-full bg-border/60" />

              {/* Get Started CTA */}
              <Link
                href="/auth/register"
                className="group flex shrink-0 items-center gap-2 rounded-full bg-brand-ember px-5 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:scale-[1.04] hover:bg-brand-ember/90 hover:shadow-md"
              >
                <span className="hidden sm:inline">Get Started</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              {/* Menu button */}
              <motion.button
                onClick={() => setMenuOpen(true)}
                whileTap={{ scale: 0.92 }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/60 bg-transparent text-foreground/60 transition-all duration-200 hover:border-foreground/20 hover:bg-muted hover:text-foreground"
                aria-label="Open full menu"
              >
                <Layers className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          FULL-SCREEN OVERLAY MENU
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-[300] flex flex-col overflow-hidden bg-[#0d0c0b]"
          >
            {/* Glow orbs */}
            <motion.div
              className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-brand-ember/10 blur-[120px]"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-brand-cobalt/10 blur-[100px]"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* Header bar */}
            <div className="relative flex items-center justify-between px-8 pt-7 pb-4 lg:px-14">
              <Link
                href="/home"
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-ember transition-transform duration-200 group-hover:scale-110">
                  <span className="text-sm font-black text-white">FC</span>
                </div>
                <span className="font-display text-lg font-bold text-white">
                  {BRAND.shortName}
                </span>
              </Link>

              <motion.button
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-200 hover:border-white/40 hover:bg-white/8 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Big nav links */}
            <motion.nav
              variants={linkRowVariants}
              initial="hidden"
              animate="show"
              className="flex flex-1 flex-col justify-center px-8 lg:px-14"
            >
              {OVERLAY_LINKS.map(({ href, label }) => (
                <motion.div key={href} variants={linkItemVariants}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-4 py-3 border-b border-white/[0.06] last:border-0"
                  >
                    <span
                      className="font-display font-black text-white/80 transition-all duration-300 group-hover:text-white group-hover:translate-x-2"
                      style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.1 }}
                    >
                      {label}
                    </span>
                    <ArrowRight
                      className="h-6 w-6 text-white/20 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-ember group-hover:opacity-100"
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Footer CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4, ease: EASE_OUT }}
              className="flex flex-col gap-3 border-t border-white/[0.08] px-8 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-14"
            >
              <p className="text-sm text-white/30">
                Trusted by{" "}
                <span className="text-white/60">150+ enterprise clients</span>{" "}
                across{" "}
                <span className="text-white/60">22 countries</span>
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/40 hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-ember px-6 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.03] hover:bg-brand-ember/90"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
