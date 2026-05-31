"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BarChart3, Package, Users, Zap, Shield, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Cinematic dashboards with live OEE tracking, revenue analytics, and production KPIs — all in one view.",
    color: "text-brand-ember",
    bg: "bg-brand-ember/10",
  },
  {
    icon: Package,
    title: "Smart Inventory",
    description:
      "Multi-warehouse inventory management with auto-reorder triggers, supplier tracking, and stock alerts.",
    color: "text-brand-cobalt",
    bg: "bg-brand-cobalt/10",
  },
  {
    icon: Users,
    title: "Enterprise CRM",
    description:
      "Full pipeline management with contact intelligence, deal tracking, and automated activity logging.",
    color: "text-brand-sand",
    bg: "bg-brand-sand/20",
  },
  {
    icon: Zap,
    title: "Turbo Performance",
    description:
      "Built on Next.js 15 with Turbopack — sub-second page loads, optimistic updates, and edge-ready infrastructure.",
    color: "text-brand-citrine",
    bg: "bg-brand-citrine/15",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Role-based access control, audit logs, SSO support, and SOC 2-ready architecture.",
    color: "text-brand-steel",
    bg: "bg-brand-steel/15",
  },
  {
    icon: Globe,
    title: "Global Operations",
    description:
      "Multi-currency, multi-language, and multi-timezone support built in from day one.",
    color: "text-brand-ember",
    bg: "bg-brand-ember/10",
  },
];

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-ember">
            Platform Capabilities
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-tight tracking-tight">
            Everything industrial ops{" "}
            <span className="gradient-text-brand">need to scale</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From raw material procurement to enterprise sales — FerroCore connects every
            touchpoint of your industrial operation.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, color, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
            >
              <div className={`mb-4 inline-flex rounded-xl p-3 ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
