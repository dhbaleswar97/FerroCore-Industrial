"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, ArrowRight, Factory, Recycle, Zap, Layers, Cpu, Flame,
  Mountain, Circle as CircleIcon, SlidersHorizontal, Droplets, X, ChevronDown,
} from "lucide-react";
import { Suspense } from "react";
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
  { id: "p1", name: "HMS 1&2 Iron Scrap", category: "iron-scrap", grade: "HMS 1&2 80:20", origin: "US Domestic", unit: "MT", moq: "25 MT", price: "230–245", availability: "In Stock", tags: ["Certified", "ISO 9001"] },
  { id: "p2", name: "Copper Wire Birch", category: "copper-scrap", grade: "Millberry 99.9%", origin: "Multi-origin", unit: "MT", moq: "5 MT", price: "8,400–8,650", availability: "In Stock", tags: ["Assayed", "LME Tracked"] },
  { id: "p3", name: "Tense Aluminium Scrap", category: "aluminium-scrap", grade: "Tense / Tablet", origin: "US / EU", unit: "MT", moq: "10 MT", price: "1,820–1,900", availability: "In Stock", tags: ["Baled", "Sorted"] },
  { id: "p4", name: "Sponge Iron DRI 85%", category: "sponge-iron", grade: "DRI — 85% Fe+", origin: "India", unit: "MT", moq: "50 MT", price: "195–210", availability: "In Stock", tags: ["GC Tested", "Low Sulfur"] },
  { id: "p5", name: "Thermal Coal 5500 NAR", category: "coal", grade: "5500 kcal NAR", origin: "South Africa", unit: "MT", moq: "5,000 MT", price: "82–88", availability: "Available by Order", tags: ["ASTM D3174", "Low Ash"] },
  { id: "p6", name: "Iron Ore Pellets BF Grade", category: "pellets", grade: "BF Grade 65% Fe", origin: "Brazil", unit: "MT", moq: "500 MT", price: "115–125", availability: "In Stock", tags: ["DR Grade", "High Fe"] },
  { id: "p7", name: "Power Transformer 33kV", category: "electrical-equipment", grade: "33/11 kV 5 MVA", origin: "India / EU", unit: "Unit", moq: "1 Unit", price: "18,500–24,000", availability: "In Stock", tags: ["IEC 60076", "ONAN"] },
  { id: "p8", name: "Industrial Jaw Crusher", category: "plant-machinery", grade: "PE 600×900", origin: "China", unit: "Unit", moq: "1 Unit", price: "22,000–28,000", availability: "In Stock", tags: ["CE Certified", "1yr Warranty"] },
  { id: "p9", name: "Iron Ore Fines 62%", category: "fines", grade: "62% Fe IODEX", origin: "India", unit: "MT", moq: "1,000 MT", price: "90–96", availability: "In Stock", tags: ["SFAC Tested"] },
  { id: "p10", name: "Transformer Oil Class I", category: "oil-lubricants", grade: "IEC 60296 Class I", origin: "UAE / Europe", unit: "Litre", moq: "1,000 L", price: "1.80–2.20", availability: "In Stock", tags: ["PCB-Free", "Low Viscosity"] },
  { id: "p11", name: "Shredded Iron Scrap", category: "iron-scrap", grade: "P&S No. 1", origin: "US Midwest", unit: "MT", moq: "25 MT", price: "215–230", availability: "Low Stock", tags: ["Shredded", "Clean"] },
  { id: "p12", name: "Coking Coal HCC", category: "coal", grade: "HCC — 0.8% Sulfur", origin: "Australia", unit: "MT", moq: "5,000 MT", price: "195–210", availability: "Available by Order", tags: ["CSR 65+", "VM 24%"] },
];

const availabilityStyle: Record<string, string> = {
  "In Stock": "bg-success/15 text-success",
  "Low Stock": "bg-warning/15 text-warning",
  "Available by Order": "bg-brand-cobalt/15 text-brand-cobalt",
};

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc", label: "Name: A → Z" },
];

function inquireLink(product: typeof PRODUCTS[0]) {
  const params = new URLSearchParams({
    product: product.name,
    grade: product.grade,
    category: product.category,
    type: "product-inquiry",
  });
  return `/contact?${params.toString()}`;
}

function ProductsCatalog() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") ?? "all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [availFilter, setAvailFilter] = useState<string[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Sync category from URL
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  let filtered = PRODUCTS.filter((p) => {
    const catMatch = activeCategory === "all" || p.category === activeCategory;
    const searchMatch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.grade.toLowerCase().includes(search.toLowerCase()) ||
      p.origin.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const availMatch = availFilter.length === 0 || availFilter.includes(p.availability);
    return catMatch && searchMatch && availMatch;
  });

  if (sort === "name-asc") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const activeFilterCount = (activeCategory !== "all" ? 1 : 0) + availFilter.length;

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

      {/* Sticky search + filter bar */}
      <section className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur-sm py-3 px-6">
        <div className="container mx-auto max-w-7xl flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[180px] max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, grades, tags..."
              className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setFilterDrawerOpen(true)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors lg:hidden",
              activeFilterCount > 0
                ? "border-brand-ember/40 bg-brand-ember/10 text-brand-ember"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-ember text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Active category chip (mobile) */}
          {activeCategory !== "all" && (
            <span className="flex items-center gap-1.5 rounded-full bg-brand-ember/10 px-3 py-1 text-xs font-semibold text-brand-ember lg:hidden">
              {CATEGORIES.find((c) => c.id === activeCategory)?.label}
              <button onClick={() => setActiveCategory("all")}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          <div className="ml-auto flex items-center gap-3">
            {/* Sort */}
            <div className="relative hidden sm:block">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none rounded-lg border border-border bg-card py-2 pl-3 pr-8 text-sm outline-none focus:border-brand-ember/60"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">{filtered.length} products</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6 py-10">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-52 shrink-0 lg:block">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</p>
            <nav className="space-y-1">
              {CATEGORIES.map((cat) => {
                const count = cat.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activeCategory === cat.id
                        ? "bg-brand-ember/10 text-brand-ember font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span>{cat.label}</span>
                    <span className="text-xs opacity-60">{count}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Availability</p>
              {["In Stock", "Low Stock", "Available by Order"].map((avail) => (
                <label key={avail} className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                  <input
                    type="checkbox"
                    checked={availFilter.includes(avail)}
                    onChange={(e) =>
                      setAvailFilter((prev) =>
                        e.target.checked ? [...prev, avail] : prev.filter((a) => a !== avail)
                      )
                    }
                    className="rounded border-border accent-brand-ember"
                  />
                  {avail}
                </label>
              ))}
            </div>
          </aside>

          {/* Product grid */}
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

                  <div className="mt-auto pt-4 flex items-end justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Price / {product.unit}</p>
                          <p className="font-display text-lg font-black text-brand-ember">${product.price}</p>
                        </div>
                        <div className="border-l border-border pl-2">
                          <p className="text-xs text-muted-foreground">MOQ</p>
                          <p className="text-sm font-semibold">{product.moq}</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={inquireLink(product)}
                      className="flex shrink-0 items-center gap-1 rounded-lg bg-brand-ember/10 px-3 py-1.5 text-xs font-semibold text-brand-ember transition-colors hover:bg-brand-ember/20"
                    >
                      Inquire <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  <div className="absolute bottom-0 left-0 h-0.5 w-full rounded-b-2xl bg-gradient-to-r from-brand-ember/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                  <Search className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="text-lg font-semibold">No products found</p>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory("all"); setAvailFilter([]); }}
                  className="mt-4 text-sm font-medium text-brand-ember hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filterDrawerOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              key="drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-border bg-background p-6 pb-10"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display font-bold">Filters</h3>
                <button onClick={() => setFilterDrawerOpen(false)} className="rounded-lg p-1 hover:bg-muted">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                          activeCategory === cat.id
                            ? "bg-brand-ember text-white"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Availability</p>
                  <div className="space-y-2">
                    {["In Stock", "Low Stock", "Available by Order"].map((avail) => (
                      <label key={avail} className="flex cursor-pointer items-center gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={availFilter.includes(avail)}
                          onChange={(e) =>
                            setAvailFilter((prev) =>
                              e.target.checked ? [...prev, avail] : prev.filter((a) => a !== avail)
                            )
                          }
                          className="h-4 w-4 rounded accent-brand-ember"
                        />
                        {avail}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="mt-6 w-full rounded-xl bg-brand-ember py-3 text-sm font-bold text-white"
              >
                Show {filtered.length} Products
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh pt-20" />}>
      <ProductsCatalog />
    </Suspense>
  );
}
