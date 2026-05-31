"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

const STATS = [
  { value: 150, suffix: "+", label: "Enterprise Clients", description: "Across 22 countries" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Platform Uptime", description: "SLA guaranteed" },
  { value: 12.8, prefix: "$", suffix: "M", decimals: 1, label: "Revenue Tracked", description: "YTD across all clients" },
  { value: 94, suffix: "%", label: "Avg OEE Improvement", description: "Within first quarter" },
];

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="border-y border-border bg-surface py-20" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {STATS.map(({ value, prefix, suffix, decimals, label, description }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center bg-surface px-6 py-10 text-center"
            >
              <div className="flex items-baseline gap-0.5">
                {prefix && (
                  <span className="font-display text-3xl font-black text-brand-ember">{prefix}</span>
                )}
                <CountUp
                  start={0}
                  end={inView ? value : 0}
                  duration={2}
                  decimals={decimals ?? 0}
                  separator=","
                  className="font-display text-4xl font-black tracking-tight text-foreground lg:text-5xl"
                />
                <span className="font-display text-2xl font-black text-brand-ember">{suffix}</span>
              </div>
              <p className="mt-2 font-semibold text-foreground">{label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
