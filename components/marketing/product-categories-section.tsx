"use client";

import { motion, type Variants } from "framer-motion";
import { Factory, Recycle, Zap, Layers, Cpu, Flame, Mountain, Circle, Filter, Droplets } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "plant-machinery", label: "Plant Machinery", desc: "Heavy industrial equipment & processing plants", icon: Factory, color: "ember" },
  { id: "iron-scrap", label: "Iron Scrap", desc: "Shredded, HMS 1&2, turnings & borings", icon: Recycle, color: "steel" },
  { id: "copper-scrap", label: "Copper Scrap", desc: "Bare bright wire, millberry & birch cliff", icon: Zap, color: "sand" },
  { id: "aluminium-scrap", label: "Aluminium Scrap", desc: "Tense, Taldon, Tablet & mixed alloy", icon: Layers, color: "cobalt" },
  { id: "electrical-equipment", label: "Electrical Equipment", desc: "Transformers, switchgear & generators", icon: Cpu, color: "citrine" },
  { id: "sponge-iron", label: "Sponge Iron", desc: "DRI pellets — 85–92% metallisation", icon: Flame, color: "ember" },
  { id: "coal", label: "Coal", desc: "Thermal, coking & steam coal grades", icon: Mountain, color: "steel" },
  { id: "pellets", label: "Pellets", desc: "Blast furnace & DR-grade iron ore pellets", icon: Circle, color: "sand" },
  { id: "fines", label: "Fines", desc: "Iron ore fines, coal fines & concentrates", icon: Filter, color: "cobalt" },
  { id: "oil-lubricants", label: "Oil & Lubricants", desc: "Industrial & transformer-grade oils", icon: Droplets, color: "ember" },
];

const colorMap: Record<string, string> = {
  ember: "bg-brand-ember/10 text-brand-ember border-brand-ember/20 group-hover:bg-brand-ember/15",
  cobalt: "bg-brand-cobalt/10 text-brand-cobalt border-brand-cobalt/20 group-hover:bg-brand-cobalt/15",
  sand: "bg-brand-sand/10 text-brand-sand border-brand-sand/20 group-hover:bg-brand-sand/15",
  steel: "bg-brand-steel/10 text-brand-steel border-brand-steel/20 group-hover:bg-brand-steel/15",
  citrine: "bg-brand-citrine/10 text-brand-citrine border-brand-citrine/20 group-hover:bg-brand-citrine/15",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function ProductCategoriesSection() {
  return (
    <section id="products" className="py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <span className="mb-4 inline-block rounded-full border border-brand-ember/25 bg-brand-ember/8 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-ember">
            Product Portfolio
          </span>
          <h2 className="font-display text-4xl font-black tracking-tight lg:text-5xl">
            Ten material categories.<br />
            <span className="text-muted-foreground">One unified platform.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From heavy plant machinery to precision alloys — FerroCore sources, stocks and ships across every major industrial material category.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.id} variants={item}>
                <Link
                  href={`/products?category=${cat.id}`}
                  className={cn(
                    "group flex flex-col gap-3 rounded-2xl border bg-card p-5 transition-all duration-200",
                    "hover:shadow-elevated hover:-translate-y-0.5"
                  )}
                >
                  <div className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors", colorMap[cat.color])}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display font-semibold leading-snug">{cat.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
