"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight, Factory, Recycle, Zap, Layers, Cpu, Flame, Mountain, Circle as CircleIcon, SlidersHorizontal, Droplets } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "plant-machinery", label: "Plant Machinery", icon: Factory },
  { id: "iron-scrap", label: "Iron Scrap", icon: Recycle },
  { id: "copper-scrap", label: "Copper Scrap", icon: Zap },
  { id: "aluminium-scrap", label: "Aluminium Scrap", icon: Layers },
  { id: "electrical-equipment", label: "Electrical Equipment", icon: Cpu },
  { id: "sponge-iron", label: "Sponge Iron", icon: Flame },
  { id: "coal", label: "Coal", icon: Mountain },
  { id: "pellets", label: "Pellets", icon: CircleIcon },
  { id: "fines", label: "Fines", icon: SlidersHorizontal },
  { id: "oil-lubricants", label: "Oil & Lubricants", icon: Droplets },
];

const PRODUCTS = [
  { id: "p1", name: "HMS 1&2 Iron Scrap", category: "iron-scrap", grade: "HMS 1&2 80:20", origin: "US Domestic", unit: "MT", price: "230–245", availability: "In Stock", tags: ["Certified", "ISO 9001"] },
  { id: "p2", name: "Copper Wire Birch", category: "copper-scrap", grade: "Millberry 99.9%", origin: "Multi-origin", unit: "MT", price: "8,400–8,650", availability: "In Stock", tags: ["Assayed", "LME Tracked"] },
  { id: "p3", name: "Tense Aluminium Scrap", category: "aluminium-scrap", grade: "Tense / Tablet", origin: "US / EU", unit: "MT", price: "1,820–1,900", availability: "In Stock", tags: ["Baled", "Sorted"] },
  { id: "p4", name: "Sponge Iron DRI 85%", category: "sponge-iron", grade: "DRI — 85% Fe+", origin: "India", unit: "MT", price: "195–210", availability: "In Stock", tags: ["GC Tested", "Low Sulfur"] },
  { id: "p5", name: "Thermal Coal 5500 NAR", category: "coal", grade: "5500 kcal NAR", origin: "South Africa", unit: "MT", price: "82–88", availability: "Available by Order", tags: ["ASTM D3174", "Low Ash"] },
  { id: "p6", name: "Iron Ore Pellets BF Grade", category: "pellets", grade: "BF Grade 65% Fe", origin: "Brazil", unit: "MT", price: "115–125", availability: "In Stock", tags: ["DR Grade", "High Fe"] },
  { id: "p7", name: "Power Transformer 33kV", category: "electrical-equipment", grade: "33/11 kV 5 MVA", origin: "India / EU", unit: "Unit", price: "18,500–24,000", availability: "In Stock", tags: ["IEC 60076", "ONAN"] },
  { id: "p8", name: "Industrial Jaw Crusher", category: "plant-machinery", grade: "PE 600×900", origin: "China", unit: "Unit", price: "22,000–28,000", availability: "In Stock", tags: ["CE Certified", "1yr Warranty"] },
  { id: "p9", name: "Iron Ore Fines 62%", category: "fines", grade: "62% Fe IODEX", origin: "India", unit: "MT", price: "90–96", availability: "In Stock", tags: ["SFAC Tested"] },
  { id: "p10", name: "Transformer Oil Class I", category: "oil-lubricants", grade: "IEC 60296 Class I", origin: "UAE / Europe", unit: "Litre", price: "1.80–2.20", availability: "In Stock", tags: ["PCB-Free", "Low Viscosity"] },
  { id: "p11", name: "Shredded Iron Scrap", category: "iron-scrap", grade: "P&S No. 1", origin: "US Midwest", unit: "MT", price: "215–230", availability: "Low Stock", tags: ["Shredded", "Clean"] },
  { id: "p12", name: "Coking Coal HCC", category: "coal", grade: "HCC — 0.8% Sulfur", origin: "Australia", unit: "MT", price: "195–210", availability: "Available by Order", tags: ["CSR 65+", "VM 24%"] },
];

const availabilityStyle: Record<string, string> = {
  "In Stock": "bg-success/15 text-success",
  "Low Stock": "bg-warning/15 text-warning",
  "Available by Order": "bg-brand-cobalt/15 text-brand-cobalt",
};

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const catMatch = activeCategory === "all" || p.category === activeCategory;
    const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.grade.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="min-h-dvh pt-20">
      {/* Hero */}
      <section className="border-b border-border bg-[#0d0c0b] py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-4 inline-block rounded-full border border-brand-ember/30 bg-brand-ember/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-ember">
              Product Catalog
            </span>
            <h1 className="font-display text-5xl font-black tracking-tight text-white lg:text-6xl">
              Industrial Materials<br />
              <span className="text-brand-ember">at Global Scale</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/50">
              10 product categories. 1,200+ active SKUs. Sourced from 80+ mills across 22 countries — with full material traceability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur-sm py-4 px-6">
        <div className="container mx-auto max-w-7xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, grades..."
              className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{filtered.length} products</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6 py-10">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden w-52 shrink-0 lg:block">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</p>
            <nav className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    activeCategory === cat.id
                      ? "bg-brand-ember/10 text-brand-ember font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group relative flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-elevated hover:-translate-y-0.5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", availabilityStyle[product.availability] ?? "bg-muted text-muted-foreground")}>
                      {product.availability}
                    </span>
                    <span className="text-xs text-muted-foreground">{product.origin}</span>
                  </div>

                  <h3 className="font-display text-base font-bold leading-snug">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{product.grade}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Price / {product.unit}</p>
                      <p className="font-display text-lg font-black text-brand-ember">${product.price}</p>
                    </div>
                    <Link
                      href="/contact"
                      className="flex items-center gap-1 rounded-lg bg-brand-ember/10 px-3 py-1.5 text-xs font-semibold text-brand-ember transition-colors hover:bg-brand-ember/20"
                    >
                      Inquire <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  <div className="absolute bottom-0 left-0 h-0.5 w-full rounded-b-2xl bg-gradient-to-r from-brand-ember/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-20 text-center text-muted-foreground">
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm mt-1">Try a different category or search term</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
