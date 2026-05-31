"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight, Play, TrendingUp, Package, Users,
  BarChart2, ShoppingCart, Boxes, CheckCircle2, Shield,
  Activity, Layers, Zap, Recycle, Circle, Flame,
  type LucideIcon,
} from "lucide-react";

const CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SPRING = { type: "spring", stiffness: 320, damping: 28 } as const;

const heroVariants: { container: Variants; item: Variants } = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: CINEMATIC } },
  },
};

// Each cycling word has a paired icon that reveals with it
const WORD_ITEMS: { word: string; Icon: LucideIcon }[] = [
  { word: "Steel",     Icon: Layers  },
  { word: "Copper",    Icon: Zap     },
  { word: "Aluminium", Icon: Recycle },
  { word: "Pellets",   Icon: Circle  },
  { word: "Coal",      Icon: Flame   },
];

// Sidebar nav
const NAV_ITEMS: { label: string; Icon: LucideIcon }[] = [
  { label: "Dashboard", Icon: BarChart2   },
  { label: "Sales",     Icon: ShoppingCart},
  { label: "Inventory", Icon: Boxes       },
  { label: "CRM",       Icon: Users       },
  { label: "Reports",   Icon: Activity    },
];

// KPI sets that cycle
const KPI_SETS = [
  { revenue: "$12.8M", orders: "284", efficiency: "94.2%" },
  { revenue: "$13.2M", orders: "301", efficiency: "95.8%" },
  { revenue: "$11.9M", orders: "267", efficiency: "92.1%" },
];

// Live activity feed items
const ACTIVITY_ITEMS = [
  { id: 1, Icon: Package,      text: "New order placed",   sub: "Steel Coils — 48T",       color: "#F76C46" },
  { id: 2, Icon: TrendingUp,   text: "Invoice paid",       sub: "#INV-2041 · $84.2K",      color: "#22c55e" },
  { id: 3, Icon: Users,        text: "Lead converted",     sub: "Tata Steel → Active",     color: "#3D55FD" },
  { id: 4, Icon: Package,      text: "Low stock alert",    sub: "Copper Scrap · W-02",     color: "#f59e0b" },
  { id: 5, Icon: CheckCircle2, text: "Shipment delivered", sub: "Pittsburgh → Chicago",    color: "#22c55e" },
  { id: 6, Icon: BarChart2,    text: "Report generated",   sub: "Q2 Executive Summary",    color: "#C6AF88" },
];

// Chart path
const CHART_POINTS = [
  [0,72],[60,64],[120,58],[180,62],[240,48],
  [300,42],[360,38],[420,44],[480,30],[540,24],[600,18],
];
const CHART_LINE = CHART_POINTS
  .map(([x,y],i) => `${i===0?"M":"L"} ${x} ${y}`)
  .join(" ");
const CHART_AREA = `${CHART_LINE} L 600 100 L 0 100 Z`;
const MONTH_LABELS = ["J","F","M","A","M","J","J","A","S","O","N"];
const CATEGORY_BARS = [
  { label:"Steel",   pct:"42%", color:"#F76C46" },
  { label:"Copper",  pct:"28%", color:"#3D55FD" },
  { label:"Alumin.", pct:"15%", color:"#C6AF88" },
  { label:"Other",   pct:"15%", color:"#85A1C5" },
];

// ── Sub-components ──────────────────────────────────────────────

function FlipNumber({ value }: { value: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.26 }}
        className="tabular-nums"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

// Slide-swap CTA button — primary variant
function SwapLinkPrimary({
  href, defaultText, hoverText,
}: { href: string; defaultText: React.ReactNode; hoverText: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-brand-ember px-8 text-sm font-bold text-white transition-opacity hover:opacity-95"
    >
      <span className="flex items-center gap-2 transition-transform duration-300 ease-out group-hover:-translate-y-[130%]">
        {defaultText}
      </span>
      <span className="absolute inset-0 flex items-center justify-center gap-2 translate-y-[130%] transition-transform duration-300 ease-out group-hover:translate-y-0">
        {hoverText}
      </span>
    </Link>
  );
}

// Slide-swap CTA button — outline variant
function SwapLinkOutline({
  href, defaultText, hoverText,
}: { href: string; defaultText: React.ReactNode; hoverText: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-border bg-background px-8 text-sm font-semibold transition-colors hover:border-brand-ember/40 hover:bg-brand-ember/5"
    >
      <span className="flex items-center gap-2 transition-transform duration-300 ease-out group-hover:-translate-y-[130%]">
        {defaultText}
      </span>
      <span className="absolute inset-0 flex items-center justify-center gap-2 translate-y-[130%] transition-transform duration-300 ease-out group-hover:translate-y-0">
        {hoverText}
      </span>
    </Link>
  );
}

// ── Main component ───────────────────────────────────────────────

export function HeroSection() {
  const [wordIdx,        setWordIdx]        = useState(0);
  const [kpiIdx,         setKpiIdx]         = useState(0);
  const [activeNav,      setActiveNav]      = useState(0);
  const [activityOffset, setActivityOffset] = useState(0);
  const [chartKey,       setChartKey]       = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % WORD_ITEMS.length), 2200);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setKpiIdx((i) => (i + 1) % KPI_SETS.length), 3500);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setActiveNav((i) => (i + 1) % NAV_ITEMS.length), 2000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setActivityOffset((i) => (i + 1) % ACTIVITY_ITEMS.length), 1800);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setChartKey((k) => k + 1), 4500);
    return () => clearInterval(t);
  }, []);

  const kpi = KPI_SETS[kpiIdx];
  const currentWord = WORD_ITEMS[wordIdx];
  const visibleActivities = Array.from({ length: 3 }, (_, i) =>
    ACTIVITY_ITEMS[(activityOffset + i) % ACTIVITY_ITEMS.length]
  );

  return (
    <section className="gradient-hero relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center">

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Breathing glow orbs */}
      <motion.div
        className="pointer-events-none absolute left-1/3 top-1/3 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-ember/8 blur-[130px]"
        animate={{ scale:[1,1.18,1], opacity:[0.5,0.9,0.5] }}
        transition={{ duration:6, repeat:Infinity, ease:"easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 bottom-1/4 h-[420px] w-[420px] rounded-full bg-brand-cobalt/8 blur-[90px]"
        animate={{ scale:[1,1.22,1], opacity:[0.35,0.7,0.35] }}
        transition={{ duration:8, repeat:Infinity, ease:"easeInOut", delay:2 }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/4 bottom-1/3 h-[280px] w-[280px] rounded-full bg-brand-sand/6 blur-[70px]"
        animate={{ scale:[1,1.3,1], opacity:[0.3,0.6,0.3] }}
        transition={{ duration:10, repeat:Infinity, ease:"easeInOut", delay:4 }}
      />

      {/* ── Hero copy ── */}
      <motion.div
        variants={heroVariants.container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl"
      >
        {/* Badge */}
        <motion.div variants={heroVariants.item} className="mb-6 inline-flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-ember/25 bg-brand-ember/8 px-4 py-1.5 text-sm font-medium text-brand-ember">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-brand-ember"
              animate={{ opacity:[1,0.2,1] }}
              transition={{ duration:1.4, repeat:Infinity }}
            />
            Enterprise Industrial Platform — v1.0
          </span>
        </motion.div>

        {/* Headline — word flows inline, no fixed-width wrapper */}
        <motion.h1
          variants={heroVariants.item}
          className="font-display text-[clamp(3rem,7vw,6rem)] font-black leading-[1.05] tracking-[-0.03em]"
        >
          The future of{" "}
          {/*
            No min-width here — that was causing the huge blank-line gap.
            inline-block lets it take natural width; AnimatePresence
            swaps old word out and new one in without creating phantom height.
          */}
          <span className="relative inline-block align-middle">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ opacity:0, y:24, filter:"blur(10px)" }}
                animate={{ opacity:1, y:0,  filter:"blur(0px)"  }}
                exit={{   opacity:0, y:-24, filter:"blur(10px)" }}
                transition={{ duration:0.42, ease:CINEMATIC }}
                className="gradient-text-brand inline-flex items-center gap-2 align-middle"
              >
                {/* Icon reveals 80ms after the word starts entering */}
                <motion.span
                  initial={{ scale:0.4, opacity:0, rotate:-15 }}
                  animate={{ scale:1,   opacity:1, rotate:0    }}
                  exit={{    scale:0.4, opacity:0, rotate:15   }}
                  transition={{ duration:0.35, delay:0.08, ease:CINEMATIC }}
                  className="inline-flex shrink-0"
                >
                  <currentWord.Icon
                    className="inline-block align-middle text-brand-ember"
                    style={{ width:"0.78em", height:"0.78em" }}
                    strokeWidth={2.2}
                  />
                </motion.span>
                {currentWord.word}
              </motion.span>
            </AnimatePresence>
          </span>
          <br />
          trading starts here.
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={heroVariants.item}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          FerroCore unifies industrial trading, inventory management, and CRM into a
          single cinematic platform — built for precision, engineered for scale.
        </motion.p>

        {/* CTAs with swap-text hover */}
        <motion.div
          variants={heroVariants.item}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <SwapLinkPrimary
            href="/auth/register"
            defaultText={<>Get Started Free <ArrowRight className="h-4 w-4" /></>}
            hoverText={<>Join 150+ Teams <ArrowRight className="h-4 w-4" /></>}
          />
          <SwapLinkOutline
            href="/auth/login"
            defaultText={<><Play className="h-4 w-4" /> View Dashboard</>}
            hoverText={<><Play className="h-4 w-4" /> See it Live</>}
          />
        </motion.div>

        {/* Social proof */}
        <motion.p variants={heroVariants.item} className="mt-8 text-sm text-muted-foreground">
          Trusted by{" "}
          <span className="font-semibold text-foreground">150+ enterprise clients</span>
          {" "}across{" "}
          <span className="font-semibold text-foreground">22 countries</span>
        </motion.p>
      </motion.div>

      {/* ── Animated Dashboard Preview ── */}
      <motion.div
        initial={{ opacity:0, y:80, scale:0.95 }}
        animate={{ opacity:1, y:0,  scale:1    }}
        transition={{ duration:1.2, delay:0.65, ease:[0.16,1,0.3,1] }}
        className="relative z-10 mt-16 w-full max-w-6xl"
      >
        {/* Floating badge — revenue */}
        <motion.div
          initial={{ opacity:0, x:32 }}
          animate={{ opacity:1, x:0  }}
          transition={{ duration:0.9, delay:1.5, ease:CINEMATIC }}
          className="absolute -right-5 top-10 z-20 hidden lg:block"
        >
          <motion.div
            animate={{ y:[0,-7,0] }}
            transition={{ duration:3.2, repeat:Infinity, ease:"easeInOut" }}
            className="flex items-center gap-2 rounded-2xl border border-success/30 bg-success/10 px-3 py-2.5 shadow-xl backdrop-blur-md"
          >
            <TrendingUp className="h-3.5 w-3.5 text-success" />
            <span className="text-xs font-bold text-success">+12.4% Revenue YoY</span>
          </motion.div>
        </motion.div>

        {/* Floating badge — live orders */}
        <motion.div
          initial={{ opacity:0, x:-32 }}
          animate={{ opacity:1, x:0   }}
          transition={{ duration:0.9, delay:1.7, ease:CINEMATIC }}
          className="absolute -left-5 top-40 z-20 hidden lg:block"
        >
          <motion.div
            animate={{ y:[0,7,0] }}
            transition={{ duration:4.1, repeat:Infinity, ease:"easeInOut", delay:1 }}
            className="flex items-center gap-2 rounded-2xl border border-brand-ember/30 bg-brand-ember/10 px-3 py-2.5 shadow-xl backdrop-blur-md"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-brand-ember"
              animate={{ opacity:[1,0.2,1] }}
              transition={{ duration:1.1, repeat:Infinity }}
            />
            <span className="text-xs font-bold text-brand-ember">47 Live Orders</span>
          </motion.div>
        </motion.div>

        {/* Floating badge — ISO */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0  }}
          transition={{ duration:0.9, delay:1.9, ease:CINEMATIC }}
          className="absolute -right-3 bottom-20 z-20 hidden lg:block"
        >
          <motion.div
            animate={{ y:[0,-5,0] }}
            transition={{ duration:5, repeat:Infinity, ease:"easeInOut", delay:0.5 }}
            className="flex items-center gap-2 rounded-2xl border border-brand-cobalt/30 bg-brand-cobalt/10 px-3 py-2.5 shadow-xl backdrop-blur-md"
          >
            <Shield className="h-3.5 w-3.5 text-brand-cobalt" />
            <span className="text-xs font-bold text-brand-cobalt">ISO 9001 Certified</span>
          </motion.div>
        </motion.div>

        {/* Browser chrome */}
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-overlay">
          {/* Title bar */}
          <div className="flex h-8 items-center gap-2 border-b border-border bg-muted/40 px-4">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <div className="mx-auto flex h-5 w-52 items-center gap-1.5 rounded-md bg-muted px-2.5">
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/25" />
              <div className="h-1.5 flex-1 rounded-full bg-muted-foreground/15" />
            </div>
          </div>

          <div className="grid grid-cols-4">
            {/* ── Sidebar ── */}
            <div className="col-span-1 hidden min-h-[480px] self-stretch border-r border-border/50 bg-[#0d0c0b] p-4 md:block">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-ember">
                  <span className="text-[10px] font-black text-white">FC</span>
                </div>
                <span className="font-display text-xs font-bold text-white">FerroCore</span>
              </div>

              <div className="space-y-0.5">
                {NAV_ITEMS.map(({ label, Icon: NavIcon }, i) => {
                  const isActive = i === activeNav;
                  return (
                    <motion.div
                      key={label}
                      animate={{
                        backgroundColor: isActive ? "rgba(247,108,70,0.13)" : "rgba(255,255,255,0)",
                        color: isActive ? "#F76C46" : "rgba(255,255,255,0.38)",
                      }}
                      transition={{ duration:0.4 }}
                      className="flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-2"
                    >
                      <NavIcon className="h-3.5 w-3.5 shrink-0" />
                      <span className="text-[11px] font-medium leading-none">{label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="sidebarDot"
                          transition={SPRING}
                          className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-ember"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-lg border border-white/6 bg-white/[0.03] p-3">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-green-400"
                    animate={{ opacity:[1,0.3,1] }}
                    transition={{ duration:1.6, repeat:Infinity }}
                  />
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-white/35">System Online</span>
                </div>
                {["API","DB","CDN"].map((svc) => (
                  <div key={svc} className="flex items-center justify-between py-0.5">
                    <span className="text-[9px] text-white/25">{svc}</span>
                    <span className="text-[9px] font-medium text-green-400/70">OK</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Main content ── */}
            <div className="col-span-4 space-y-4 p-5 md:col-span-3">
              {/* Page header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-sm font-bold">Executive Dashboard</p>
                  <p className="text-[10px] text-muted-foreground">Updated just now</p>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ opacity:[0.5,1,0.5] }}
                    transition={{ duration:2, repeat:Infinity }}
                    className="hidden items-center gap-1.5 sm:flex"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-success" />
                    <span className="text-[10px] font-semibold text-success">Live</span>
                  </motion.div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-cobalt text-[9px] font-black text-white">
                    AD
                  </div>
                </div>
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label:"Revenue",    value:kpi.revenue,    bg:"bg-brand-ember/10", ring:"border-brand-ember/20"  },
                  { label:"Orders",     value:kpi.orders,     bg:"bg-brand-cobalt/10",ring:"border-brand-cobalt/20" },
                  { label:"Efficiency", value:kpi.efficiency, bg:"bg-brand-sand/10",  ring:"border-brand-sand/20"   },
                ].map(({ label, value, bg, ring }) => (
                  <div key={label} className={`rounded-xl border p-3 ${bg} ${ring}`}>
                    <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                    <div className="font-display text-lg font-black">
                      <FlipNumber value={value} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart + Activity */}
              <div className="grid grid-cols-5 gap-3">
                {/* Area chart */}
                <div className="col-span-3 overflow-hidden rounded-xl border border-border bg-muted/20 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[10px] font-bold">Monthly Revenue</p>
                    <span className="rounded-full bg-success/12 px-1.5 py-0.5 text-[9px] font-bold text-success">+12.4%</span>
                  </div>
                  <svg
                    key={chartKey}
                    viewBox="0 0 600 100"
                    className="h-[88px] w-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#F76C46" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#F76C46" stopOpacity="0"    />
                      </linearGradient>
                    </defs>
                    <motion.path d={CHART_AREA} fill="url(#hcGrad)"
                      initial={{ opacity:0 }} animate={{ opacity:1 }}
                      transition={{ duration:0.8, delay:0.6 }}
                    />
                    {[25,50,75].map((y) => (
                      <line key={y} x1="0" y1={y} x2="600" y2={y}
                        stroke="currentColor" strokeOpacity="0.06" strokeWidth="1"
                      />
                    ))}
                    <motion.path
                      d={CHART_LINE}
                      stroke="#F76C46" strokeWidth="2.5" fill="none"
                      strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength:0 }} animate={{ pathLength:1 }}
                      transition={{ duration:1.6, ease:"easeOut" }}
                    />
                    <motion.rect
                      x="0" y="0" width="1.5" height="100"
                      fill="#F76C46" fillOpacity="0.45"
                      animate={{ x:[0,598] }}
                      transition={{ duration:4, repeat:Infinity, ease:"linear", delay:1.8, repeatDelay:0.6 }}
                    />
                    <motion.circle cx="600" cy="18" r="3.5" fill="#F76C46"
                      initial={{ opacity:0 }} animate={{ opacity:1 }}
                      transition={{ delay:1.55 }}
                    />
                    <motion.circle cx="600" cy="18" r="8" fill="none"
                      stroke="#F76C46" strokeWidth="1"
                      initial={{ opacity:0 }}
                      animate={{ opacity:[0,0.5,0] }}
                      transition={{ duration:1.8, repeat:Infinity, delay:1.6 }}
                    />
                    {MONTH_LABELS.map((m,i) => (
                      <text key={`${m}-${i}`} x={i*60} y={99} fontSize="7"
                        fill="currentColor" fillOpacity="0.25" textAnchor="middle">
                        {m}
                      </text>
                    ))}
                  </svg>
                </div>

                {/* Activity feed */}
                <div className="col-span-2 overflow-hidden rounded-xl border border-border bg-muted/20 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[10px] font-bold">Live Activity</p>
                    <motion.div
                      animate={{ opacity:[1,0.3,1] }}
                      transition={{ duration:1.2, repeat:Infinity }}
                      className="h-1.5 w-1.5 rounded-full bg-brand-ember"
                    />
                  </div>
                  <div className="space-y-2">
                    <AnimatePresence mode="popLayout">
                      {visibleActivities.map((act) => {
                        const ActIcon = act.Icon;
                        return (
                          <motion.div
                            key={act.id}
                            initial={{ opacity:0, x:14,  height:0 }}
                            animate={{ opacity:1, x:0,   height:"auto" }}
                            exit={{   opacity:0, x:-14, height:0 }}
                            transition={{ duration:0.28 }}
                            className="flex items-start gap-2 overflow-hidden"
                          >
                            <div
                              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded"
                              style={{ backgroundColor:`${act.color}22` }}
                            >
                              <ActIcon className="h-2.5 w-2.5" style={{ color:act.color }} />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-[9px] font-semibold leading-tight">{act.text}</p>
                              <p className="truncate text-[9px] leading-tight text-muted-foreground">{act.sub}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Category breakdown */}
              <div className="grid grid-cols-4 gap-2">
                {CATEGORY_BARS.map(({ label, pct, color }, i) => (
                  <div key={label} className="rounded-lg border border-border/60 bg-muted/20 p-2">
                    <p className="text-[9px] text-muted-foreground">{label}</p>
                    <p className="font-display text-xs font-black">{pct}</p>
                    <div className="mt-1.5 h-1 w-full rounded-full bg-muted">
                      <motion.div
                        className="h-1 rounded-full"
                        style={{ backgroundColor:color }}
                        initial={{ width:"0%" }}
                        animate={{ width:pct }}
                        transition={{ duration:1.3, delay:0.6+i*0.12, ease:CINEMATIC }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Breathing glow reflection */}
        <motion.div
          className="absolute -bottom-8 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full blur-3xl"
          style={{ backgroundColor:"rgba(247,108,70,0.12)" }}
          animate={{ opacity:[0.6,1,0.6], scaleX:[0.9,1.05,0.9] }}
          transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
