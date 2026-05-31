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
  Globe,
  Warehouse,
  Package,
  Users,
  Truck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const TOTAL_STEPS = 5;

interface StepStat { label: string; value: string }
interface Step {
  id: number;
  code: string;
  phase: string;
  tagline: string;
  description: string;
  stats: StepStat[];
  Icon: LucideIcon;
  color: string;
}

const STEPS: Step[] = [
  {
    id: 0,
    code: "01",
    phase: "Supplier Network",
    tagline: "Where every trade begins.",
    description:
      "FerroCore maintains active relationships with 400+ verified industrial suppliers across 18 countries, ensuring consistent quality and availability across all material categories.",
    stats: [
      { value: "400+", label: "Verified Suppliers" },
      { value: "18",   label: "Source Countries"  },
      { value: "99.2%",label: "Grade Accuracy"    },
    ],
    Icon: Globe,
    color: "#F76C46",
  },
  {
    id: 1,
    code: "02",
    phase: "Warehouse Operations",
    tagline: "Every tonne. Perfectly placed.",
    description:
      "Our owned warehouses handle incoming material with a 4-hour intake cycle — weighing, grading, and cataloguing every shipment with industrial-grade accuracy.",
    stats: [
      { value: "8",    label: "Owned Warehouses" },
      { value: "4hr",  label: "Intake Cycle"     },
      { value: "340K", label: "MT Capacity"       },
    ],
    Icon: Warehouse,
    color: "#3D55FD",
  },
  {
    id: 2,
    code: "03",
    phase: "Inventory Intelligence",
    tagline: "Live stock. Zero surprises.",
    description:
      "Every SKU is tracked live with sub-hour latency. Our proprietary inventory engine ensures 99.8% data accuracy across all warehouses and material types.",
    stats: [
      { value: "1,200+", label: "SKUs Tracked"    },
      { value: "99.8%",  label: "Data Accuracy"   },
      { value: "<1hr",   label: "Update Latency"  },
    ],
    Icon: Package,
    color: "#E9E778",
  },
  {
    id: 3,
    code: "04",
    phase: "Sales Execution",
    tagline: "Fast quotes. Higher conversions.",
    description:
      "Our sales team responds to enquiries within 2 hours with detailed quotes. A 94% quote-to-order rate reflects the trust and efficiency built into every interaction.",
    stats: [
      { value: "<2hr",  label: "Quote Response" },
      { value: "94%",   label: "Quote-to-Order" },
      { value: "$12.8M",label: "Monthly Volume" },
    ],
    Icon: Users,
    color: "#C6AF88",
  },
  {
    id: 4,
    code: "05",
    phase: "Customer Delivery",
    tagline: "Tracked until it lands.",
    description:
      "From dispatch to destination, every shipment is tracked in real time across road, sea, and air corridors. 22 countries. 98.7% on-time delivery. Zero surprises.",
    stats: [
      { value: "22",    label: "Countries Served" },
      { value: "98.7%", label: "On-Time Rate"     },
      { value: "3 Modes",label: "Road · Sea · Air"},
    ],
    Icon: Truck,
    color: "#85A1C5",
  },
];

const leftVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.5, ease: EASE } },
  exit:   { opacity: 0, y: -20,filter: "blur(4px)", transition: { duration: 0.32,ease: EASE } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9,  y: 48 },
  show:   { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.6, ease: EASE } },
  exit:   { opacity: 0, scale: 0.96, y: -24,transition: { duration: 0.32,ease: EASE } },
};

export function SupplyChainSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveStep(Math.min(Math.floor(v * TOTAL_STEPS), TOTAL_STEPS - 1));
  });

  const step = STEPS[activeStep];

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-[#0d0c0b]">

        {/* Colored progress stripe */}
        <div className="relative h-[3px] w-full bg-white/[0.05]">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-r-full"
            style={{ backgroundColor: step.color }}
            animate={{ width: `${((activeStep + 1) / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.55, ease: EASE }}
          />
        </div>

        {/* Top label bar */}
        <div className="flex items-center justify-between px-8 pt-5 pb-3 lg:px-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
            <span className="h-1 w-1 rounded-full bg-brand-ember" />
            Supply Chain Intelligence
          </span>
          <span className="font-mono text-xs text-white/20">
            {step.code} / {String(TOTAL_STEPS).padStart(2, "0")}
          </span>
        </div>

        {/* Main two-column layout */}
        <div className="flex flex-1 overflow-hidden lg:grid lg:grid-cols-[1fr_1.15fr]">

          {/* ── LEFT: step narrative ── */}
          <div className="flex flex-col justify-center px-8 lg:px-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                variants={leftVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="max-w-[420px]"
              >
                {/* Large ghost step number */}
                <div
                  className="mb-1 select-none font-display font-black leading-none"
                  style={{ fontSize: "clamp(5rem, 10vw, 8rem)", color: "rgba(255,255,255,0.04)" }}
                >
                  {step.code}
                </div>

                {/* Icon badge */}
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${step.color}1a` }}
                >
                  <step.Icon className="h-5 w-5" style={{ color: step.color }} />
                </div>

                {/* Headline */}
                <h2 className="font-display text-4xl font-black leading-[1.05] text-white lg:text-[2.8rem]">
                  {step.phase}
                </h2>
                <p className="mt-2 text-base font-semibold" style={{ color: step.color }}>
                  {step.tagline}
                </p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
                  {step.description}
                </p>

                {/* Left stat cards — solid fill, no border */}
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {step.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl p-4"
                      style={{ backgroundColor: `${step.color}14` }}
                    >
                      <p className="font-display text-xl font-black" style={{ color: step.color }}>
                        {s.value}
                      </p>
                      <p className="mt-0.5 text-[10px] text-white/30">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Step progress dots */}
            <div className="mt-10 flex items-center gap-2">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.id}
                  animate={{
                    width: i === activeStep ? 28 : 6,
                    backgroundColor:
                      i === activeStep
                        ? step.color
                        : i < activeStep
                        ? `${step.color}40`
                        : "rgba(255,255,255,0.1)",
                  }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="h-1.5 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: bento card panel ── */}
          <div className="relative hidden items-center justify-center p-8 lg:flex lg:p-12">

            {/* Ambient glow */}
            <motion.div
              className="pointer-events-none absolute inset-0 blur-[100px]"
              animate={{ backgroundColor: `${step.color}0a` }}
              transition={{ duration: 0.9 }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="relative w-full max-w-lg overflow-hidden rounded-[28px] bg-[#111010]"
                style={{
                  boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 60px ${step.color}0f`,
                }}
              >
                {/* Colored top accent line */}
                <div
                  className="h-[3px] w-full"
                  style={{
                    background: `linear-gradient(90deg, ${step.color}, ${step.color}50, transparent 70%)`,
                  }}
                />

                {/* Radial inner glow */}
                <div
                  className="pointer-events-none absolute left-0 top-0 h-56 w-full"
                  style={{
                    background: `radial-gradient(ellipse at 30% 0%, ${step.color}12, transparent 65%)`,
                  }}
                />

                {/* Watermark number */}
                <div
                  className="pointer-events-none absolute bottom-3 right-5 select-none font-display font-black leading-none"
                  style={{ fontSize: "clamp(7rem, 12vw, 10rem)", color: "rgba(255,255,255,0.025)" }}
                >
                  {step.code}
                </div>

                {/* ── BENTO GRID ── */}
                <div className="relative grid grid-cols-3 gap-2 p-4">

                  {/* Cell 1: Icon + phase name — col-span-2 */}
                  <div
                    className="col-span-2 flex items-center gap-3 rounded-2xl p-4"
                    style={{ backgroundColor: `${step.color}10` }}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <step.Icon className="h-4 w-4" style={{ color: step.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-white">{step.phase}</p>
                      <p className="truncate text-[10px]" style={{ color: step.color }}>{step.tagline}</p>
                    </div>
                  </div>

                  {/* Cell 2: Step badge — col-span-1 */}
                  <div className="col-span-1 flex items-center justify-center rounded-2xl bg-white/[0.05] p-4">
                    <span className="font-mono text-sm font-black leading-none text-white/20">
                      {step.code}
                      <span className="text-white/10">/{String(TOTAL_STEPS).padStart(2, "0")}</span>
                    </span>
                  </div>

                  {/* Cells 3-5: Stat cards — 1 col each, tinted with step color */}
                  {step.stats.map((s, i) => (
                    <div
                      key={s.label}
                      className="col-span-1 rounded-2xl p-5"
                      style={{
                        backgroundColor:
                          i === 0
                            ? `${step.color}18`
                            : i === 1
                            ? `${step.color}11`
                            : `${step.color}0d`,
                      }}
                    >
                      <p
                        className="font-display text-[1.65rem] font-black leading-none"
                        style={{ color: step.color }}
                      >
                        {s.value}
                      </p>
                      <p className="mt-2 text-[10px] text-white/30">{s.label}</p>
                    </div>
                  ))}

                  {/* Cell 6: Description — col-span-3 */}
                  <div className="col-span-3 rounded-2xl bg-white/[0.04] p-4">
                    <p className="text-[11px] leading-relaxed text-white/35">
                      {step.description}
                    </p>
                  </div>

                  {/* Cell 7: Operational status — col-span-2 */}
                  <div className="col-span-2 flex items-center gap-2.5 rounded-2xl bg-white/[0.04] px-4 py-3">
                    <motion.div
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-[10px] text-white/25">Operational · Real-time data</span>
                  </div>

                  {/* Cell 8: Progress bar — col-span-1 */}
                  <div className="col-span-1 flex items-center rounded-2xl bg-white/[0.04] px-4 py-3">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.div
                        className="h-1 rounded-full"
                        style={{ backgroundColor: step.color }}
                        animate={{ width: `${((activeStep + 1) / TOTAL_STEPS) * 100}%` }}
                        transition={{ duration: 0.6, ease: EASE }}
                      />
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom bar — icon step nav + CTA */}
        <div className="flex items-center justify-between px-8 py-4 lg:px-14">
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => {
              const SIcon = s.Icon;
              const isActive = i === activeStep;
              return (
                <motion.div
                  key={s.id}
                  animate={{
                    opacity:         isActive ? 1 : 0.25,
                    scale:           isActive ? 1 : 0.88,
                    backgroundColor: isActive ? `${s.color}20` : "rgba(255,255,255,0.04)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                >
                  <SIcon className="h-3 w-3" style={{ color: isActive ? s.color : "rgba(255,255,255,0.4)" }} />
                </motion.div>
              );
            })}
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-ember px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Request Bulk Supply Quote
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
