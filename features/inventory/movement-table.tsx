"use client";

import { useState } from "react";
import { Search, ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, SlidersHorizontal } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { MOCK_STOCK_MOVEMENTS } from "@/data/mock-sales";

const TYPE_CONFIG = {
  in: { icon: ArrowDownToLine, label: "Stock In", className: "bg-success/15 text-success" },
  out: { icon: ArrowUpFromLine, label: "Stock Out", className: "bg-destructive/15 text-destructive" },
  transfer: { icon: ArrowLeftRight, label: "Transfer", className: "bg-brand-cobalt/15 text-brand-cobalt" },
  adjustment: { icon: SlidersHorizontal, label: "Adjustment", className: "bg-warning/15 text-warning" },
};

export function MovementTable() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = MOCK_STOCK_MOVEMENTS.filter((m) => {
    const matchSearch = !search ||
      m.productName.toLowerCase().includes(search.toLowerCase()) ||
      m.sku.toLowerCase().includes(search.toLowerCase()) ||
      (m.reference ?? "").toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || m.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-black">Stock Movements</h1>
        <p className="text-sm text-muted-foreground">Complete history of all inventory movements</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search SKU, product, reference..."
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
        >
          <option value="all">All Types</option>
          {Object.entries(TYPE_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Type", "Product", "SKU", "Warehouse", "Quantity", "Reference", "Performed By", "Date"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((mov) => {
                const cfg = TYPE_CONFIG[mov.type];
                const Icon = cfg.icon;
                return (
                  <tr key={mov.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg", cfg.className)}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className={cn("text-xs font-semibold", cfg.className.split(" ")[1])}>
                          {cfg.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-display text-sm font-semibold">{mov.productName}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{mov.sku}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{mov.warehouseName}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("font-display font-bold text-sm", mov.quantity > 0 ? "text-success" : "text-destructive")}>
                        {mov.quantity > 0 ? "+" : ""}{mov.quantity.toLocaleString()} {mov.unit}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-brand-cobalt">{mov.reference ?? "—"}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{mov.performedByName}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(mov.movedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
          {filtered.length} movements
        </div>
      </div>
    </div>
  );
}
