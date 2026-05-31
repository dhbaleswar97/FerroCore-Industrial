"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import {
  Building2,
  Package,
  Boxes,
  Globe,
  Users,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix: string;
  description: string;
  Icon: LucideIcon;
  color: string;
}

const METRICS: Metric[] = [
  {
    label: "Active Warehouses",
    value: 8,
    suffix: "",
    prefix: "",
    description: "Strategically located across 3 continents",
    Icon: Building2,
    color: "#F76C46",
  },
  {
    label: "MT Storage Capacity",
    value: 340000,
    suffix: "+",
    prefix: "",
    description: "Ready-to-ship inventory at any time",
    Icon: Package,
    color: "#3D55FD",
  },
  {
    label: "Material SKUs",
    value: 1200,
    suffix: "+",
    prefix: "",
    description: "Across 10 major industrial categories",
    Icon: Boxes,
    color: "#C6AF88",
  },
  {
    label: "Countries Served",
    value: 22,
    suffix: "+",
    prefix: "",
    description: "Cross-border logistics with 98.7% on-time",
    Icon: Globe,
    color: "#85A1C5",
  },
  {
    label: "Enterprise Clients",
    value: 150,
    suffix: "+",
    prefix: "",
    description: "Long-term supply partnerships globally",
    Icon: Users,
    color: "#E9E778",
  },
  {
    label: "Annual Trade Volume",
    value: 128,
    suffix: "M+",
    prefix: "$",
    description: "In confirmed orders processed last year",
    Icon: TrendingUp,
    color: "#F76C46",
  },
];

function formatNumber(n: number, value: number): string {
  if (value >= 100000) {
    return Math.round(n).toLocaleString();
  }
  return Math.round(n).toString();
}

interface AnimatedCounterProps {
  value: number;
  prefix: string;
  suffix: string;
  color: string;
}

function AnimatedCounter({ value, prefix, suffix, color }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => {
        setDisplay(formatNumber(v, value));
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-5xl font-black" style={{ color }}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

interface MetricCardProps {
  metric: Metric;
  index: number;
}

function MetricCard({ metric, index }: MetricCardProps) {
  const { Icon, color } = metric;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="relative flex flex-col rounded-2xl border border-black/8 bg-white p-6 overflow-hidden"
    >
      {/* Top */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <div className="text-sm font-semibold text-muted-foreground leading-tight">
          {metric.label}
        </div>
      </div>

      {/* Counter */}
      <div className="mb-3">
        <AnimatedCounter
          value={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix}
          color={color}
        />
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {metric.description}
      </p>

      {/* Bottom accent bar */}
      <div className="mt-5 h-0.5 w-full rounded-full bg-black/5">
        <motion.div
          className="h-0.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.1 + 0.4, ease: EASE }}
        />
      </div>
    </motion.div>
  );
}

export function OperationalStrengthSection() {
  return (
    <section className="bg-[#F2EFEA] py-24 px-6">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-ember/25 bg-brand-ember/8 px-4 py-1.5 text-sm font-medium text-brand-ember">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-ember" />
            Operational Strength
          </div>
          <h2 className="font-display text-4xl font-black tracking-tight lg:text-5xl">
            Built for industrial scale.
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Our infrastructure is purpose-built to handle the demands of
            global industrial trade — reliably, consistently, at scale.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {METRICS.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/about"
            className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-black/15 px-7 text-sm font-semibold text-foreground transition-all duration-200 hover:border-brand-ember hover:text-brand-ember hover:bg-brand-ember/5"
          >
            View Operational Capacity →
          </Link>
        </div>
      </div>
    </section>
  );
}
