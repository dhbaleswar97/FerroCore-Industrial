"use client";

import { useState } from "react";
import { Search, Package, ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, AlertTriangle, Plus, RefreshCcw, ShoppingBag } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { MOCK_ACTIVITY_LOGS } from "@/data/mock-sales";

const ACTION_CONFIG: Record<string, { icon: typeof Package; label: string; className: string }> = {
  stock_in: { icon: ArrowDownToLine, label: "Stock In", className: "bg-success/15 text-success" },
  stock_out: { icon: ArrowUpFromLine, label: "Stock Out", className: "bg-destructive/15 text-destructive" },
  transfer: { icon: ArrowLeftRight, label: "Transfer", className: "bg-brand-cobalt/15 text-brand-cobalt" },
  adjustment: { icon: RefreshCcw, label: "Adjustment", className: "bg-warning/15 text-warning" },
  reorder_alert: { icon: AlertTriangle, label: "Reorder Alert", className: "bg-brand-ember/15 text-brand-ember" },
  new_product: { icon: Plus, label: "New Product", className: "bg-brand-steel/15 text-brand-steel" },
  product_updated: { icon: Package, label: "Product Updated", className: "bg-muted text-muted-foreground" },
  supplier_order: { icon: ShoppingBag, label: "Supplier Order", className: "bg-brand-sand/15 text-brand-sand" },
};

export function ActivityLog() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const filtered = MOCK_ACTIVITY_LOGS.filter((log) => {
    const matchSearch = !search ||
      log.entityName.toLowerCase().includes(search.toLowerCase()) ||
      log.description.toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === "all" || log.action === actionFilter;
    return matchSearch && matchAction;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-black">Inventory Activity Log</h1>
        <p className="text-sm text-muted-foreground">Chronological record of all inventory actions</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activity..."
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
          />
        </div>
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
        >
          <option value="all">All Actions</option>
          {Object.entries(ACTION_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {filtered.map((log, i) => {
          const cfg = ACTION_CONFIG[log.action] ?? { icon: Package, label: log.action, className: "bg-muted text-muted-foreground" };
          const Icon = cfg.icon;
          return (
            <div key={log.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-sm">
              <div className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", cfg.className)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", cfg.className)}>{cfg.label}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{log.entityName}</span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{formatDate(log.createdAt)}</span>
                </div>
                <p className="mt-1.5 text-sm text-foreground/80">{log.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">By {log.performedByName}</p>
                {log.metadata && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(log.metadata).map(([k, v]) => (
                      <span key={k} className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs">
                        {k}: {String(v)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
