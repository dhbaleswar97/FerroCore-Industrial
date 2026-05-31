"use client";

import { motion } from "framer-motion";
import { Building2, Package, AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_WAREHOUSES, MOCK_INVENTORY, MOCK_PRODUCTS } from "@/data/mock-inventory";

function UtilizationBar({ value, className }: { value: number; className?: string }) {
  const color = value >= 90 ? "bg-destructive" : value >= 70 ? "bg-warning" : "bg-success";
  return (
    <div className={cn("h-2 w-full rounded-full bg-muted", className)}>
      <div className={cn("h-2 rounded-full transition-all duration-700", color)} style={{ width: `${value}%` }} />
    </div>
  );
}

export function WarehouseOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-black">Warehouses</h1>
        <p className="text-sm text-muted-foreground">Utilization and inventory status across all locations</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Warehouses", value: MOCK_WAREHOUSES.length, icon: Building2 },
          { label: "Total Capacity", value: `${(MOCK_WAREHOUSES.reduce((s, w) => s + w.capacity, 0) / 1000).toFixed(0)}K`, icon: Package },
          { label: "Avg Utilization", value: `${Math.round(MOCK_WAREHOUSES.reduce((s, w) => s + w.currentUtilization, 0) / MOCK_WAREHOUSES.length)}%`, icon: TrendingUp },
          { label: "Low Stock Alerts", value: MOCK_INVENTORY.filter((i) => i.stockStatus !== "in_stock").length, icon: AlertTriangle },
        ].map(({ label, value, icon: Icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-ember/10 text-brand-ember">
                <Icon className="h-3.5 w-3.5" />
              </div>
            </div>
            <p className="font-display text-2xl font-black">{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Warehouse cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {MOCK_WAREHOUSES.map((wh, i) => {
          const whInventory = MOCK_INVENTORY.filter((inv) => inv.warehouseId === wh.id);
          const lowStockCount = whInventory.filter((inv) => inv.stockStatus !== "in_stock").length;
          const util = wh.currentUtilization;

          return (
            <motion.div
              key={wh.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="font-display font-bold">{wh.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{wh.code}</p>
                </div>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-semibold",
                  wh.status === "active" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
                )}>
                  {wh.status}
                </span>
              </div>

              <p className="mb-4 text-xs text-muted-foreground leading-relaxed">{wh.address}</p>

              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Utilization</span>
                  <span className={cn("font-display font-bold", util >= 90 ? "text-destructive" : util >= 70 ? "text-warning" : "text-success")}>
                    {util}%
                  </span>
                </div>
                <UtilizationBar value={util} />
                <p className="text-xs text-muted-foreground">
                  {(wh.capacity * util / 100 / 1000).toFixed(1)}K / {(wh.capacity / 1000).toFixed(0)}K capacity
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Products</p>
                  <p className="font-display font-bold">{whInventory.length}</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Alerts</p>
                  <p className={cn("font-display font-bold", lowStockCount > 0 ? "text-warning" : "text-success")}>
                    {lowStockCount}
                  </p>
                </div>
              </div>

              {wh.manager && (
                <p className="mt-4 text-xs text-muted-foreground">
                  Manager: <span className="font-semibold text-foreground">{wh.manager}</span>
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Inventory table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <p className="font-display font-bold">All Inventory Items</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Product", "SKU", "Warehouse", "Available", "Reserved", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_INVENTORY.map((inv) => {
                const product = MOCK_PRODUCTS.find((p) => p.id === inv.productId);
                const warehouse = MOCK_WAREHOUSES.find((w) => w.id === inv.warehouseId);
                const statusConfig: Record<string, { label: string; className: string }> = {
                  in_stock: { label: "In Stock", className: "bg-success/15 text-success" },
                  low_stock: { label: "Low Stock", className: "bg-warning/15 text-warning" },
                  out_of_stock: { label: "Out of Stock", className: "bg-destructive/15 text-destructive" },
                  discontinued: { label: "Discontinued", className: "bg-muted text-muted-foreground" },
                };
                const cfg = statusConfig[inv.stockStatus] ?? { label: inv.stockStatus, className: "bg-muted text-muted-foreground" };
                return (
                  <tr key={inv.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-display text-sm font-semibold">{product?.name ?? "—"}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{product?.sku ?? "—"}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{warehouse?.name ?? "—"}</td>
                    <td className="px-5 py-3.5 font-display font-bold text-sm">{inv.availableQuantity.toLocaleString()} {product?.unit}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{inv.reservedQuantity.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", cfg.className)}>{cfg.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
