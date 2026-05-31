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
  ClipboardList,
  FlaskConical,
  FileText,
  Truck,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const TOTAL_STEPS = 5;

interface ProcurementStep {
  id: string;
  stepNum: string;
  title: string;
  subtitle: string;
  description: string;
  details: [string, string, string];
  Icon: LucideIcon;
  color: string;
}

const PROCUREMENT_STEPS: ProcurementStep[] = [
  {
    id: "submit",
    stepNum: "01",
    title: "Submit Requirement",
    subtitle: "Tell us what you need.",
    description:
      "Start by submitting your material requirement — type, grade, quantity, and delivery timeline. Our procurement portal captures every specification for instant routing.",
    details: ["Instant form submission", "Grade specification upload", "Priority flagging"],
    Icon: ClipboardList,
    color: "#F76C46",
  },
  {
    id: "verify",
    stepNum: "02",
    title: "Material Verification",
    subtitle: "We source the exact match.",
    description:
      "FerroCore traders verify stock availability across our supplier network, perform grade lab checks, and run a multi-supplier comparison to find the best-fit material.",
    details: ["Grade lab verification", "Multi-supplier comparison", "Live inventory check"],
    Icon: FlaskConical,
    color: "#3D55FD",
  },
  {
    id: "quote",
    stepNum: "03",
    title: "Quote Generation",
    subtitle: "Transparent pricing. Fast turnaround.",
    description:
      "Receive a detailed quote within 2 hours — with line-item breakdown of material cost, logistics, and insurance. Multiple payment term options available.",
    details: ["<2hr response time", "Line-item cost breakdown", "Payment terms options"],
    Icon: FileText,
    color: "#E9E778",
  },
  {
    id: "dispatch",
    stepNum: "04",
    title: "Dispatch Planning",
    subtitle: "From warehouse to route.",
    description:
      "Our logistics team activates GPS tracking, handles all customs documentation, and allocates the optimal carrier — road, sea, or air — for your delivery.",
    details: ["GPS tracking activated", "Customs documentation", "Carrier allocation"],
    Icon: Truck,
    color: "#85A1C5",
  },
  {
    id: "delivery",
    stepNum: "05",
    title: "Delivery Execution",
    subtitle: "Tracked until it lands.",
    description:
      "From first-mile pickup to final-mile drop, we provide real-time updates at every milestone. Delivery confirmation, proof of delivery, and instant invoice settlement.",
    details: ["Live shipment tracking", "Proof of delivery", "Invoice + settlement"],
    Icon: MapPin,
    color: "#F76C46",
  },
];

// Citrine (#E9E778) is too bright on dark backgrounds — darken for text
function displayColor(c: string) {
  return c === "#E9E778" ? "#c8c840" : c;
}

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x:   0, transition: { duration: 0.5, ease: EASE } },
  exit:   { opacity: 0, x:  24, transition: { duration: 0.3, ease: EASE } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 32  },
  show:   { opacity: 1, scale: 1,    y: 0,   transition: { duration: 0.55, ease: EASE } },
  exit:   { opacity: 0, scale: 1.04, y: -16, transition: { duration: 0.3,  ease: EASE } },
};

export function ProcurementSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveStep(Math.min(Math.floor(v * TOTAL_STEPS), TOTAL_STEPS - 1));
  });

  const current     = PROCUREMENT_STEPS[activeStep];
  const CurrentIcon = current.Icon;
  const dc          = displayColor(current.color);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div
        className="sticky top-0 flex h-screen flex-col overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #111 0%, #1a0800 40%, #0d0c0b 100%)",
        }}
      >
        {/* Top ember accent line */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #F76C46, transparent)" }}
        />

        {/* Section header — no border */}
        <div className="flex items-center justify-between bg-white/[0.03] px-6 py-4">
          <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/40">
            Procurement Command Center
          </span>
          <div className="flex items-center gap-2">
            {PROCUREMENT_STEPS.map((s, i) => (
              <motion.div
                key={s.id}
                animate={{
                  width: i === activeStep ? 24 : 8,
                  backgroundColor:
                    i === activeStep
                      ? "#F76C46"
                      : i < activeStep
                      ? "rgba(247,108,70,0.4)"
                      : "rgba(255,255,255,0.12)",
                }}
                transition={{ duration: 0.35, ease: EASE }}
                className="h-2 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Main area */}
        <div className="flex-1 grid overflow-hidden lg:grid-cols-2">

          {/* LEFT: step narrative */}
          <div className="flex flex-col justify-center px-8 py-10 lg:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                variants={leftVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-6"
              >
                {/* Step counter row */}
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-5xl font-black leading-none"
                    style={{ color: `${current.color}40` }}
                  >
                    {current.stepNum}
                  </span>
                  <div className="h-px flex-1 bg-white/[0.07]" />
                  <span className="font-mono text-xs text-white/25">
                    {activeStep + 1}/{TOTAL_STEPS}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h2 className="font-display text-3xl font-black text-white lg:text-4xl">
                    {current.title}
                  </h2>
                  <p className="mt-2 text-lg font-semibold" style={{ color: dc }}>
                    {current.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="max-w-md text-base leading-relaxed text-white/50">
                  {current.description}
                </p>

                {/* Detail chips — solid fills, no borders */}
                <div className="flex flex-wrap gap-2">
                  {current.details.map((detail, i) => (
                    <span
                      key={detail}
                      className="rounded-full px-3 py-1.5 text-xs font-medium"
                      style={{
                        backgroundColor:
                          i === 0
                            ? `${current.color}18`
                            : i === 1
                            ? `${current.color}11`
                            : `${current.color}0c`,
                        color: dc,
                      }}
                    >
                      {detail}
                    </span>
                  ))}
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-2 pt-2">
                  {PROCUREMENT_STEPS.map((s, i) => (
                    <div
                      key={s.id}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === activeStep ? "w-6" : i < activeStep ? "w-3" : "w-1.5"
                      )}
                      style={{
                        backgroundColor:
                          i === activeStep
                            ? current.color
                            : i < activeStep
                            ? `${current.color}55`
                            : "rgba(255,255,255,0.12)",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: bento visual card */}
          <div
            className="hidden items-center justify-center px-10 py-10 lg:flex"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.04)" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-[#111010]"
                style={{
                  boxShadow: `0 32px 80px rgba(0,0,0,0.55), 0 0 60px ${current.color}0f`,
                }}
              >
                {/* Top accent line */}
                <div
                  className="h-[3px] w-full"
                  style={{
                    background: `linear-gradient(90deg, ${current.color}, ${current.color}50, transparent 70%)`,
                  }}
                />

                {/* Radial inner glow */}
                <div
                  className="pointer-events-none absolute left-0 top-0 h-48 w-full"
                  style={{
                    background: `radial-gradient(ellipse at 30% 0%, ${current.color}12, transparent 65%)`,
                  }}
                />

                {/* Watermark step number */}
                <div
                  className="pointer-events-none absolute bottom-0 right-3 select-none font-display font-black leading-none"
                  style={{
                    fontSize:   "clamp(6rem, 14vw, 10rem)",
                    color:      "rgba(255,255,255,0.025)",
                    lineHeight: 0.85,
                  }}
                >
                  {current.stepNum}
                </div>

                {/* ── BENTO GRID ── */}
                <div className="relative grid grid-cols-3 gap-2 p-4">

                  {/* Cell 1: Icon — col-span-1 */}
                  <div
                    className="col-span-1 flex items-center justify-center rounded-2xl py-6"
                    style={{ backgroundColor: `${current.color}12` }}
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${current.color}22` }}
                    >
                      <CurrentIcon className="h-6 w-6" style={{ color: dc }} />
                    </div>
                  </div>

                  {/* Cell 2: Title + subtitle — col-span-2 */}
                  <div className="col-span-2 flex flex-col justify-center rounded-2xl bg-white/[0.05] p-4">
                    <p className="text-base font-black leading-tight text-white">
                      {current.title}
                    </p>
                    <p className="mt-1.5 text-xs font-semibold" style={{ color: dc }}>
                      {current.subtitle}
                    </p>
                  </div>

                  {/* Cells 3-5: Detail chips — 1 col each, tinted */}
                  {current.details.map((detail, i) => (
                    <div
                      key={detail}
                      className="col-span-1 rounded-2xl p-4"
                      style={{
                        backgroundColor:
                          i === 0
                            ? `${current.color}18`
                            : i === 1
                            ? `${current.color}11`
                            : `${current.color}0d`,
                      }}
                    >
                      <motion.div
                        className="mb-2 h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: current.color }}
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
                      />
                      <p className="text-[10px] leading-snug text-white/55">{detail}</p>
                    </div>
                  ))}

                  {/* Cell 6: Description — col-span-3 */}
                  <div className="col-span-3 rounded-2xl bg-white/[0.04] p-4">
                    <p className="text-[11px] leading-relaxed text-white/40">
                      {current.description}
                    </p>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA bar — no border */}
        <div className="flex items-center justify-between bg-white/[0.03] px-6 py-4">
          <span className="font-mono text-xs text-white/25">
            {current.stepNum} — {current.title}
          </span>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[#3D55FD] px-6 text-sm font-bold text-white transition-all duration-200 hover:bg-[#2B45F0] hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Your Procurement Request →
          </Link>
        </div>
      </div>
    </div>
  );
}
