"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertTriangle, Package } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PREVIEW_ITEMS = [
  { sku: "SS-HRB-6MM", name: "Hot-Rolled Steel Bar 6mm", category: "Structural Steel", qty: "73,000 kg", status: "in_stock", trend: "up" },
  { sku: "AL-T6061-PLT", name: "Aluminum Alloy 6061-T6 Plate", category: "Alloys", qty: "2,400 kg", status: "in_stock", trend: "down" },
  { sku: "FT-HXB-M16", name: "High-Strength Hex Bolt M16", category: "Fasteners", qty: "1,300 pcs", status: "low_stock", trend: "down" },
  { sku: "CU-SCRAP-A", name: "Copper Scrap Grade A", category: "Copper Scrap", qty: "8,500 kg", status: "in_stock", trend: "up" },
  { sku: "SI-DRI-85", name: "Sponge Iron DRI 85%", category: "Sponge Iron", qty: "42,000 MT", status: "in_stock", trend: "up" },
  { sku: "SF-HELM-HV", name: "High-Vis Safety Helmet", category: "Safety", qty: "Out of Stock", status: "out_of_stock", trend: "down" },
];

const statusConfig = {
  in_stock: { label: "In Stock", className: "bg-success/15 text-success" },
  low_stock: { label: "Low Stock", className: "bg-warning/15 text-warning" },
  out_of_stock: { label: "Out of Stock", className: "bg-destructive/15 text-destructive" },
};

export function InventoryPreviewSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-5 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <span className="mb-4 inline-block self-start rounded-full border border-brand-cobalt/25 bg-brand-cobalt/8 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-cobalt">
              Live Inventory
            </span>
            <h2 className="font-display text-4xl font-black tracking-tight lg:text-5xl">
              Real-time stock visibility across every warehouse
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              See live inventory levels, availability status and movement trends — directly in your FerroCore dashboard. No spreadsheets. No calls to the warehouse.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: "SKUs Tracked", value: "1,200+" },
                { label: "Warehouses", value: "8" },
                { label: "Reorder Rules", value: "340" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-display text-2xl font-black text-brand-ember">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/auth/register"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-ember hover:text-brand-ember/80 transition-colors"
            >
              <Package className="h-4 w-4" />
              Request live inventory access
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <span className="font-display text-sm font-bold">Inventory Overview</span>
                <div className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              </div>
              <div className="divide-y divide-border">
                {PREVIEW_ITEMS.map((item, i) => {
                  const cfg = statusConfig[item.status as keyof typeof statusConfig];
                  return (
                    <motion.div
                      key={item.sku}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="flex items-center justify-between px-5 py-3.5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-mono text-muted-foreground">{item.sku}</p>
                        <p className="font-display text-sm font-semibold truncate">{item.name}</p>
                      </div>
                      <div className="ml-4 flex items-center gap-3">
                        <span className="text-sm text-muted-foreground hidden sm:block">{item.qty}</span>
                        <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", cfg.className)}>
                          {cfg.label}
                        </span>
                        {item.trend === "up" ? (
                          <TrendingUp className="h-3.5 w-3.5 text-success" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 border-t border-border bg-muted/30 px-5 py-3">
                <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                <span className="text-xs text-muted-foreground">2 items require reorder attention</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
