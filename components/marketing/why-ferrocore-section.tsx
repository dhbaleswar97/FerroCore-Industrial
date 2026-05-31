"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe2, Clock4, BarChart3, Boxes, HeadphonesIcon } from "lucide-react";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Material Certification",
    desc: "Every product ships with full mill certificates, test reports and traceability documentation — meeting ISO, ASTM, DIN and EN standards.",
  },
  {
    icon: Globe2,
    title: "Global Sourcing Network",
    desc: "Direct relationships with 80+ mills and refineries across 22 countries — ensuring competitive pricing and supply continuity.",
  },
  {
    icon: Clock4,
    title: "Just-In-Time Delivery",
    desc: "Our logistics backbone handles 1,200+ shipments annually with real-time tracking from dispatch to delivery.",
  },
  {
    icon: BarChart3,
    title: "Market Intelligence",
    desc: "Live commodity pricing, demand forecasting and procurement analytics embedded directly into your FerroCore dashboard.",
  },
  {
    icon: Boxes,
    title: "Warehouse Infrastructure",
    desc: "500,000 sq ft of strategic warehousing across 3 continents with climate-controlled storage for sensitive material grades.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Account Teams",
    desc: "Every enterprise client is assigned a dedicated supply chain manager available 24/5 — not a call center, a real expert.",
  },
];

export function WhyFerrocoreSection() {
  return (
    <section id="why-ferrocore" className="py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <span className="mb-4 inline-block self-start rounded-full border border-brand-ember/25 bg-brand-ember/8 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-ember">
              Why FerroCore
            </span>
            <h2 className="font-display text-4xl font-black tracking-tight lg:text-5xl">
              Not just a supplier.<br />
              <span className="gradient-text-brand">A strategic partner.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              FerroCore was built by industrial operators who understood what was missing — a supply chain platform that combines commodity expertise, enterprise technology and genuine operational support into one unified experience.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { label: "Years of Operation", value: "14+" },
                { label: "Countries Served", value: "22" },
                { label: "Annual Shipments", value: "1,200+" },
                { label: "Client Retention", value: "94%" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-display text-3xl font-black text-brand-ember">{value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-elevated"
                >
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-ember/10 text-brand-ember">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="mb-2 font-display text-sm font-bold">{pillar.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
