"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Filter, X, Package, Tag, DollarSign, Edit, Trash2, Eye } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { MOCK_PRODUCTS } from "@/data/mock-inventory";
import type { Product } from "@/types/inventory";

const CATEGORY_LABELS: Record<string, string> = {
  structural_steel: "Structural Steel",
  alloys: "Alloys",
  fasteners: "Fasteners",
  safety: "Safety",
  tools: "Tools",
  raw_materials: "Raw Materials",
};

const STATUS_CONFIG = {
  active: { label: "Active", className: "bg-success/15 text-success" },
  inactive: { label: "Inactive", className: "bg-muted text-muted-foreground" },
  discontinued: { label: "Discontinued", className: "bg-destructive/15 text-destructive" },
};

function ProductDetailModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-overlay"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-mono text-xs text-brand-ember">{product.sku}</p>
              <h2 className="font-display text-xl font-black">{product.name}</h2>
            </div>
            <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="rounded-xl bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Category</p>
              <p className="font-display text-sm font-semibold mt-0.5">{CATEGORY_LABELS[product.category] ?? product.category}</p>
            </div>
            <div className="rounded-xl bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Unit Price</p>
              <p className="font-display text-sm font-bold text-brand-ember mt-0.5">{formatCurrency(product.unitPrice)} / {product.unit}</p>
            </div>
          </div>

          {product.specifications && product.specifications.length > 0 && (
            <div className="mb-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Specifications</p>
              <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
                {product.specifications.map((spec, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-sm text-muted-foreground">{spec.name}</span>
                    <span className="font-display text-sm font-semibold">
                      {spec.value}{spec.unit ? ` ${spec.unit}` : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">{tag}</span>
              ))}
            </div>
          )}

          <div className="mt-5 flex gap-2 border-t border-border pt-5">
            <button className="flex-1 rounded-xl border border-border py-2 text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
              <Edit className="h-3.5 w-3.5" /> Edit Product
            </button>
            <button className="rounded-xl bg-brand-ember px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity">
              Add to Sale
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ProductsOverview() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = Array.from(new Set(MOCK_PRODUCTS.map((p) => p.category)));

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-4">
      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-black">Product Catalog</h1>
          <p className="text-sm text-muted-foreground">{MOCK_PRODUCTS.length} products across {categories.length} categories</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-brand-ember px-4 py-2 text-sm font-bold text-white hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, SKU..."
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{CATEGORY_LABELS[cat] ?? cat}</option>
          ))}
        </select>
        <div className="flex rounded-lg border border-border bg-card p-0.5">
          {(["grid", "table"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setViewMode(v)}
              className={cn("rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors", viewMode === v ? "bg-brand-ember text-white" : "text-muted-foreground")}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => {
            const cfg = STATUS_CONFIG[product.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.active;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-elevated hover:-translate-y-0.5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", cfg.className)}>{cfg.label}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setSelectedProduct(product)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mb-1 flex items-center gap-1.5">
                  <Package className="h-3.5 w-3.5 shrink-0 text-brand-ember" />
                  <p className="font-mono text-xs text-muted-foreground">{product.sku}</p>
                </div>
                <h3 className="font-display font-bold leading-snug">{product.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{CATEGORY_LABELS[product.category] ?? product.category}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Unit Price</p>
                    <p className="font-display font-black text-brand-ember">{formatCurrency(product.unitPrice)}<span className="text-xs font-normal text-muted-foreground">/{product.unit}</span></p>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="rounded-lg bg-brand-ember/10 px-2.5 py-1.5 text-xs font-semibold text-brand-ember hover:bg-brand-ember/20 transition-colors"
                  >
                    View
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 h-0.5 w-full rounded-b-2xl bg-gradient-to-r from-brand-ember/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["SKU", "Product Name", "Category", "Unit", "Price", "Status", "Tags", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((product) => {
                  const cfg = STATUS_CONFIG[product.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.active;
                  return (
                    <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs text-brand-ember">{product.sku}</td>
                      <td className="px-5 py-3.5 font-display text-sm font-semibold">{product.name}</td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{CATEGORY_LABELS[product.category] ?? product.category}</td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{product.unit}</td>
                      <td className="px-5 py-3.5 font-display font-bold text-brand-ember">{formatCurrency(product.unitPrice)}</td>
                      <td className="px-5 py-3.5">
                        <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", cfg.className)}>{cfg.label}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {(product.tags ?? []).slice(0, 2).map((tag) => (
                            <span key={tag} className="rounded-md bg-muted px-1.5 py-0.5 text-xs">{tag}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-1">
                          <button onClick={() => setSelectedProduct(product)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-brand-ember transition-colors">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
