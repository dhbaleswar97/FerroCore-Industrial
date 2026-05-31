"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import {
  Recycle,
  Zap,
  Layers,
  Mountain,
  Flame,
  Circle,
  Filter,
  Factory,
  Cpu,
  Droplets,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Material {
  id: string;
  label: string;
  grade: string;
  Icon: LucideIcon;
  color: string;
  applications: string[];
  availability: number;
  stock: string;
}

const MATERIALS: Material[] = [
  {
    id: "iron-scrap",
    label: "Iron Scrap",
    grade: "HMS 1&2 · Shredded",
    Icon: Recycle,
    color: "#85A1C5",
    applications: ["Steel Mills", "Foundries", "Re-rollers"],
    availability: 87,
    stock: "In Stock",
  },
  {
    id: "copper-scrap",
    label: "Copper Scrap",
    grade: "Bare Bright · Birch",
    Icon: Zap,
    color: "#F76C46",
    applications: ["Cable Mfg", "Electronics", "Smelters"],
    availability: 92,
    stock: "In Stock",
  },
  {
    id: "aluminium-scrap",
    label: "Aluminium Scrap",
    grade: "Taint/Tabor · Extrusion",
    Icon: Layers,
    color: "#3D55FD",
    applications: ["Auto Parts", "Aerospace", "Packaging"],
    availability: 74,
    stock: "In Stock",
  },
  {
    id: "coal",
    label: "Coal",
    grade: "Thermal · Coking",
    Icon: Mountain,
    color: "#85A1C5",
    applications: ["Power Plants", "Steel Mills", "Cement"],
    availability: 68,
    stock: "Low Stock",
  },
  {
    id: "sponge-iron",
    label: "Sponge Iron",
    grade: "DRI — 85–92% Met.",
    Icon: Flame,
    color: "#F76C46",
    applications: ["EAF Steel", "Foundries", "Blast Furnace"],
    availability: 95,
    stock: "In Stock",
  },
  {
    id: "pellets",
    label: "Pellets",
    grade: "BF & DR Grade",
    Icon: Circle,
    color: "#C6AF88",
    applications: ["Blast Furnace", "DRI Plants", "Sinter Plants"],
    availability: 81,
    stock: "In Stock",
  },
  {
    id: "fines",
    label: "Iron Ore Fines",
    grade: "Fe 60–65% Export",
    Icon: Filter,
    color: "#3D55FD",
    applications: ["Sinter Plants", "Pelletization", "Export"],
    availability: 55,
    stock: "Low Stock",
  },
  {
    id: "machinery",
    label: "Plant Machinery",
    grade: "Used & Refurbished",
    Icon: Factory,
    color: "#85A1C5",
    applications: ["Steel Plants", "Cement", "Mining"],
    availability: 43,
    stock: "Available",
  },
  {
    id: "electrical",
    label: "Electrical Equip.",
    grade: "Transformers · Motors",
    Icon: Cpu,
    color: "#E9E778",
    applications: ["Power Infra", "Substations", "Industries"],
    availability: 78,
    stock: "In Stock",
  },
  {
    id: "lubricants",
    label: "Oil & Lubricants",
    grade: "Industrial · Transformer",
    Icon: Droplets,
    color: "#C6AF88",
    applications: ["Heavy Machinery", "Transformer", "Industrial"],
    availability: 90,
    stock: "In Stock",
  },
];

// Organic vertical offsets to break grid regularity
const OFFSETS = [0, 28, 12, 40, 8, 20, 36, 4, 24, 16];

function stockColor(stock: string) {
  if (stock === "In Stock") return { dot: "bg-green-500", text: "text-green-600", bg: "bg-green-500/10" };
  if (stock === "Low Stock") return { dot: "bg-amber-500", text: "text-amber-600", bg: "bg-amber-500/10" };
  return { dot: "bg-blue-500", text: "text-blue-600", bg: "bg-blue-500/10" };
}

interface CardProps {
  material: Material;
  index: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

function EcosystemCard({ material, index, hoveredId, setHoveredId }: CardProps) {
  const isHovered = hoveredId === material.id;
  const anyHovered = hoveredId !== null;
  const { Icon, color } = material;
  const sc = stockColor(material.stock);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.1);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.1);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
    setHoveredId(null);
  }

  return (
    <div style={{ marginTop: OFFSETS[index] }}>
      <motion.div
        style={{
          x: mx,
          y: my,
          borderColor: isHovered ? `${color}50` : "rgba(0,0,0,0.07)",
          boxShadow: isHovered
            ? `0 16px 48px ${color}20, 0 4px 16px rgba(0,0,0,0.08)`
            : "0 2px 8px rgba(0,0,0,0.06)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHoveredId(material.id)}
        animate={{
          scale: isHovered ? 1.04 : anyHovered ? 0.97 : 1,
          opacity: anyHovered && !isHovered ? 0.55 : 1,
        }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative cursor-default overflow-hidden rounded-[22px] border bg-white"
      >
        {/* Default face */}
        <div className="p-5 space-y-3">
          {/* Icon */}
          <div
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${color}16` }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>

          {/* Name + grade */}
          <div>
            <p className="text-sm font-bold text-foreground leading-tight">{material.label}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{material.grade}</p>
          </div>

          {/* Availability mini bar */}
          <div className="space-y-1">
            <div className="h-1 w-full rounded-full bg-black/[0.06]">
              <div
                className="h-1 rounded-full transition-all"
                style={{ width: `${material.availability}%`, backgroundColor: color }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-1 text-[9px] font-semibold ${sc.text}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                {material.stock}
              </span>
              <span className="text-[9px] text-muted-foreground">{material.availability}%</span>
            </div>
          </div>
        </div>

        {/* Hover overlay — revealed with AnimatePresence */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="absolute inset-0 flex flex-col gap-3 rounded-[22px] bg-white p-5"
              style={{ border: `1.5px solid ${color}45` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${color}16` }}
                >
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${sc.bg} ${sc.text}`}>
                  <span className={`h-1 w-1 rounded-full ${sc.dot}`} />
                  {material.stock}
                </span>
              </div>

              {/* Name */}
              <p className="text-sm font-black text-foreground">{material.label}</p>

              {/* Grade badge */}
              <span
                className="self-start rounded-full px-2.5 py-0.5 text-[9px] font-semibold"
                style={{ backgroundColor: `${color}14`, color }}
              >
                {material.grade}
              </span>

              {/* Applications */}
              <div className="flex flex-wrap gap-1">
                {material.applications.map((app) => (
                  <span
                    key={app}
                    className="rounded-full px-2 py-0.5 text-[9px] font-medium"
                    style={{ backgroundColor: `${color}12`, color }}
                  >
                    {app}
                  </span>
                ))}
              </div>

              {/* Availability bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-muted-foreground">
                  <span>Availability</span>
                  <span className="font-bold" style={{ color }}>{material.availability}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-black/[0.06]">
                  <motion.div
                    className="h-1.5 rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${material.availability}%` }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="mt-auto inline-flex items-center gap-1 text-[10px] font-bold transition-opacity hover:opacity-70"
                style={{ color }}
              >
                Get Quote <ArrowRight className="h-2.5 w-2.5" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export function MaterialsEcosystemSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="bg-[#F2EFEA] px-6 py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-ember/25 bg-brand-ember/8 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-ember">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-ember" />
              Materials Portfolio
            </span>
            <h2 className="font-display text-4xl font-black tracking-tight lg:text-5xl">
              Ten materials.
              <br />
              <span className="text-muted-foreground">One ecosystem.</span>
            </h2>
            <p className="mt-3 max-w-md text-base text-muted-foreground">
              From ferrous scrap to industrial lubricants — FerroCore stocks, grades,
              and delivers across the full industrial materials spectrum.
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#3D55FD] px-6 text-sm font-bold text-white transition-all hover:bg-[#2B45F0] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore Product Inventory
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Organic grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {MATERIALS.map((material, i) => (
            <EcosystemCard
              key={material.id}
              material={material}
              index={i}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-xs text-muted-foreground"
        >
          Hover any card to see availability, grade specs, and industry applications.
        </motion.p>
      </div>
    </section>
  );
}
