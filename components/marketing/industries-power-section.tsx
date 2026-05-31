"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type Variants,
} from "framer-motion";
import {
  Factory,
  Building2,
  Mountain,
  Cog,
  Zap,
  Ship,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const TOTAL = 6;

interface IndustryStat { label: string; value: string }
interface Industry {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stats: IndustryStat[];
  Icon: LucideIcon;
  color: string;
  applications: string[];
}

const INDUSTRIES: Industry[] = [
  {
    id: "steel-mfg",
    name: "Steel Manufacturing",
    tagline: "The backbone of industrial output.",
    description:
      "FerroCore serves major steel mills and mini-mills across Asia and Europe — supplying prime scrap, sponge iron, and pellets at scale. Our grade verification and rapid logistics keep mill operations uninterrupted.",
    stats: [
      { value: "2.1B+ MT", label: "Global Production" },
      { value: "38%",      label: "Uses Scrap Input"  },
      { value: "$900B",    label: "Market Size"        },
    ],
    Icon: Factory,
    color: "#F76C46",
    applications: ["EAF Furnaces", "BOF Converters", "Continuous Casting", "Rolling Mills"],
  },
  {
    id: "construction",
    name: "Construction & Infrastructure",
    tagline: "Building the cities of tomorrow.",
    description:
      "From TMT bars to structural steel, FerroCore ensures continuous material supply for construction conglomerates and government infrastructure projects — enabling zero-downtime project execution.",
    stats: [
      { value: "$14T", label: "Global Market"   },
      { value: "50%",  label: "Steel Intensive"  },
      { value: "2050", label: "Net-Zero Target"  },
    ],
    Icon: Building2,
    color: "#3D55FD",
    applications: ["High-Rise Buildings", "Bridges & Roads", "Metro Rail", "Port Infrastructure"],
  },
  {
    id: "mining",
    name: "Mining & Extraction",
    tagline: "Fueling the extractive economy.",
    description:
      "Mining operations depend on consistent supply of heavy machinery, lubricants, and specialized metals. FerroCore provides critical inputs — from refurbished equipment to industrial consumables.",
    stats: [
      { value: "180B MT", label: "Ore Mined / yr"       },
      { value: "65%",     label: "Uses Heavy Machinery" },
      { value: "23",      label: "Major Minerals"       },
    ],
    Icon: Mountain,
    color: "#C6AF88",
    applications: ["Open-Pit Mining", "Underground Ops", "Ore Processing", "Tailings Management"],
  },
  {
    id: "heavy-eng",
    name: "Heavy Engineering",
    tagline: "Precision metal for precision machines.",
    description:
      "Heavy engineering manufacturers require consistent alloy composition and tight tolerances. FerroCore's quality-first supply ensures production lines run without material-related downtime.",
    stats: [
      { value: "40M+ MT", label: "Annual Demand"  },
      { value: "8yr",     label: "Avg Equip. Life"},
      { value: "$600B",   label: "Global Market"  },
    ],
    Icon: Cog,
    color: "#85A1C5",
    applications: ["Crane Manufacturing", "Press & Forging", "Industrial Pumps", "Pressure Vessels"],
  },
  {
    id: "energy",
    name: "Energy Production",
    tagline: "Powering the global grid.",
    description:
      "From thermal power stations to renewable energy installations, FerroCore supplies copper scrap, electrical grade materials, and transformer lubricants to the energy sector globally.",
    stats: [
      { value: "8,500 TWh", label: "Annual Demand" },
      { value: "120MT",     label: "Copper Used"   },
      { value: "55%",       label: "Uses Lubricants"},
    ],
    Icon: Zap,
    color: "#E9E778",
    applications: ["Thermal Plants", "Solar Farms", "Transformer Mfg", "Grid Infrastructure"],
  },
  {
    id: "marine",
    name: "Marine & Shipping",
    tagline: "The arteries of global trade.",
    description:
      "With 80% of global trade moving by sea, marine industries demand reliable scrap metal, lubricants, and spare components. FerroCore's port-adjacent warehouses enable rapid marine supply.",
    stats: [
      { value: "11B Tonnes", label: "Cargo Per Year" },
      { value: "60K+",       label: "Active Vessels" },
      { value: "80%",        label: "Trade by Sea"   },
    ],
    Icon: Ship,
    color: "#F76C46",
    applications: ["Ship Breaking", "Ship Building", "Port Equipment", "Marine Lubricants"],
  },
];

const showcaseVariants: Variants = {
  hidden: { opacity: 0, scale: 0.91, y: 40  },
  show:   { opacity: 1, scale: 1,    y: 0,   transition: { duration: 0.6, ease: EASE } },
  exit:   { opacity: 0, scale: 0.96, y: -20, transition: { duration: 0.3, ease: EASE } },
};

export function IndustriesPowerSection() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(Math.min(Math.floor(v * TOTAL), TOTAL - 1));
  });

  const current     = INDUSTRIES[activeIndex];
  const CurrentIcon = current.Icon;

  return (
    <div ref={containerRef} className="relative h-[480vh]">
      <div className="sticky top-0 flex h-screen overflow-hidden bg-[#0d0c0b]">

        {/* ── LEFT sidebar ── */}
        <div className="flex w-full shrink-0 flex-col overflow-y-auto px-6 py-8 lg:w-72 xl:w-80"
          style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}
        >
          {/* Section label */}
          <div className="mb-8">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/35">
              Industries We Power
            </span>
            <h2 className="font-display text-2xl font-black leading-tight text-white">
              Every industrial
              <br />
              vertical. Served.
            </h2>
          </div>

          {/* Industry tab list */}
          <div className="space-y-1">
            {INDUSTRIES.map((industry, i) => {
              const isActive = i === activeIndex;
              const IndIcon  = industry.Icon;
              return (
                <motion.div
                  key={industry.id}
                  animate={{
                    backgroundColor:  isActive ? "rgba(255,255,255,0.05)" : "transparent",
                    borderLeftColor:  isActive ? industry.color : "transparent",
                  }}
                  transition={{ duration: 0.35 }}
                  className="flex cursor-default items-center gap-3 rounded-r-xl border-l-2 py-2.5 pl-3 pr-2"
                >
                  <span className="w-5 shrink-0 font-mono text-[10px] text-white/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: isActive
                        ? `${industry.color}20`
                        : "rgba(255,255,255,0.04)",
                    }}
                  >
                    <IndIcon
                      className="h-3.5 w-3.5 transition-colors duration-300"
                      style={{ color: isActive ? industry.color : "rgba(255,255,255,0.3)" }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "truncate text-xs font-semibold transition-colors duration-300",
                        isActive ? "text-white" : "text-white/35"
                      )}
                    >
                      {industry.name}
                    </p>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="truncate text-[10px]"
                          style={{ color: industry.color }}
                        >
                          {industry.stats[0].value} {industry.stats[0].label}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom progress + CTA */}
          <div className="mt-auto pt-8">
            <div className="mb-2 flex justify-between font-mono text-[10px] text-white/20">
              <span>01</span>
              <span>{String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}</span>
              <span>{String(TOTAL).padStart(2, "0")}</span>
            </div>
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-0.5 rounded-full"
                style={{ backgroundColor: current.color }}
                animate={{ width: `${((activeIndex + 1) / TOTAL) * 100}%` }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </div>
            <Link
              href="/solutions"
              className="group mt-5 inline-flex items-center gap-2 text-xs font-semibold text-white/40 transition-colors hover:text-white"
            >
              See Industry Solutions
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* ── RIGHT: bento showcase card ── */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden p-8 lg:p-12">

          {/* Ambient background glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 blur-[140px]"
            animate={{ backgroundColor: `${current.color}08` }}
            transition={{ duration: 1 }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={showcaseVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="relative w-full max-w-2xl overflow-hidden rounded-[32px] bg-[#111010]"
              style={{
                boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 80px ${current.color}0c`,
              }}
            >
              {/* Top accent gradient line */}
              <div
                className="h-[3px] w-full"
                style={{
                  background: `linear-gradient(90deg, ${current.color}, ${current.color}50, transparent 65%)`,
                }}
              />

              {/* Inner radial glow */}
              <div
                className="pointer-events-none absolute left-0 top-0 h-64 w-full"
                style={{
                  background: `radial-gradient(ellipse at 30% 0%, ${current.color}12, transparent 60%)`,
                }}
              />

              {/* Watermark index */}
              <div
                className="pointer-events-none absolute bottom-0 right-4 select-none font-display font-black leading-none"
                style={{
                  fontSize: "clamp(8rem, 16vw, 14rem)",
                  color:    "rgba(255,255,255,0.025)",
                  lineHeight: 0.85,
                }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </div>

              {/* ── BENTO GRID ── */}
              <div className="relative grid grid-cols-3 gap-2 p-5">

                {/* Cell 1: Icon badge — col-span-1 */}
                <div
                  className="col-span-1 flex items-center justify-center rounded-2xl py-6"
                  style={{ backgroundColor: `${current.color}12` }}
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${current.color}22` }}
                  >
                    <CurrentIcon className="h-7 w-7" style={{ color: current.color }} />
                  </div>
                </div>

                {/* Cell 2: Industry name + tagline — col-span-2 */}
                <div className="col-span-2 flex flex-col justify-center rounded-2xl bg-white/[0.05] p-5">
                  <h3
                    className="font-display text-xl font-black leading-tight text-white lg:text-2xl"
                  >
                    {current.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold" style={{ color: current.color }}>
                    {current.tagline}
                  </p>
                </div>

                {/* Cells 3-5: Stat cards — 1 col each */}
                {current.stats.map((s, i) => (
                  <div
                    key={s.label}
                    className="col-span-1 rounded-2xl p-5"
                    style={{
                      backgroundColor:
                        i === 0
                          ? `${current.color}18`
                          : i === 1
                          ? `${current.color}11`
                          : `${current.color}0d`,
                    }}
                  >
                    <p
                      className="font-display text-2xl font-black leading-none"
                      style={{ color: current.color }}
                    >
                      {s.value}
                    </p>
                    <p className="mt-2 text-[10px] text-white/30">{s.label}</p>
                  </div>
                ))}

                {/* Cell 6: Description — col-span-3 */}
                <div className="col-span-3 rounded-2xl bg-white/[0.04] p-5">
                  <p className="text-[11px] leading-relaxed text-white/40">
                    {current.description}
                  </p>
                </div>

                {/* Cell 7: Application chips — col-span-3, no borders */}
                <div className="col-span-3 flex flex-wrap gap-2 rounded-2xl bg-white/[0.04] p-4">
                  {current.applications.map((app) => (
                    <span
                      key={app}
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: `${current.color}14`,
                        color:           current.color,
                      }}
                    >
                      {app}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
