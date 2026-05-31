"use client";

import { motion } from "framer-motion";
import { Building2, Hammer, Car, Flame, Plane, Ship } from "lucide-react";

const INDUSTRIES = [
  {
    id: "steel",
    label: "Steel Manufacturing",
    desc: "Integrated plants and mini-mills rely on FerroCore for consistent raw material supply chains — sponge iron, coal, pellets and scrap at scale.",
    icon: Flame,
    stat: "40+ Plants",
  },
  {
    id: "construction",
    label: "Construction & Infrastructure",
    desc: "From high-rise structural frameworks to civil road projects — we supply certified structural steel, rebar and fastener systems on schedule.",
    icon: Building2,
    stat: "150+ Projects",
  },
  {
    id: "automotive",
    label: "Automotive",
    desc: "OEMs and tier-1 suppliers trust our precision-grade alloys and just-in-time logistics to keep production lines moving without interruption.",
    icon: Car,
    stat: "22 OEM Partners",
  },
  {
    id: "energy",
    label: "Energy & Power",
    desc: "Oil & gas pipelines, power plant structures and renewable energy foundations — engineered to withstand extreme operating environments.",
    icon: Flame,
    stat: "$280M Supplied",
  },
  {
    id: "aerospace",
    label: "Aerospace & Defense",
    desc: "Mission-critical aluminum and titanium alloys with full material traceability, NADCAP-compliant sourcing and aerospace-grade certifications.",
    icon: Plane,
    stat: "Tier-1 Certified",
  },
  {
    id: "shipbuilding",
    label: "Shipbuilding & Marine",
    desc: "Marine-grade structural steel, corrosion-resistant alloys and specialized plates for commercial vessels and naval applications worldwide.",
    icon: Ship,
    stat: "12 Shipyards",
  },
];

const iconMap: Record<string, typeof Flame> = { steel: Flame, construction: Building2, automotive: Car, energy: Hammer, aerospace: Plane, shipbuilding: Ship };

export function IndustriesSection() {
  return (
    <section id="industries" className="bg-[#0d0c0b] py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-brand-cobalt/30 bg-brand-cobalt/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-cobalt">
            Industries Served
          </span>
          <h2 className="font-display text-4xl font-black tracking-tight text-white lg:text-5xl">
            Powering the industries that<br />
            <span className="text-brand-ember">build the world</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/50">
            Specialized supply chains for six critical industrial sectors — each with unique material requirements and logistics demands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => {
            const Icon = iconMap[ind.id] ?? Flame;
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-[#0d0c0b] p-8 transition-colors hover:bg-white/[0.03]"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-ember/10 text-brand-ember transition-colors group-hover:bg-brand-ember/20">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-ember">{ind.stat}</p>
                <h3 className="mb-3 font-display text-xl font-bold text-white">{ind.label}</h3>
                <p className="text-sm leading-relaxed text-white/50">{ind.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
