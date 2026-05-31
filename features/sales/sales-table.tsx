"use client";

import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { MOCK_SALES } from "@/data/mock-sales";

const STATUS_STYLE: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  confirmed: "bg-brand-cobalt/15 text-brand-cobalt",
  shipped: "bg-brand-steel/15 text-brand-steel",
  delivered: "bg-success/15 text-success",
  cancelled: "bg-destructive/15 text-destructive",
};

const PAYMENT_STYLE: Record<string, string> = {
  unpaid: "bg-muted text-muted-foreground",
  partial: "bg-warning/15 text-warning",
  paid: "bg-success/15 text-success",
  overdue: "bg-destructive/15 text-destructive",
};

export function SalesTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = MOCK_SALES.filter((s) => {
    const matchSearch = !search ||
      s.saleNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sales, customers..."
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm outline-none focus:border-brand-ember/60 focus:ring-2 focus:ring-brand-ember/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-ember/60"
          >
            <option value="all">All Statuses</option>
            {["draft","confirmed","shipped","delivered","cancelled"].map((s) => (
              <option key={s} value={s} className="capitalize">{s}</option>
            ))}
          </select>
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-muted transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Sale #", "Customer", "Salesperson", "Date", "Total", "Status", "Payment"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((sale) => (
                <tr key={sale.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-sm text-brand-ember">{sale.saleNumber}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-display text-sm font-semibold">{sale.customerName}</p>
                    {sale.customerEmail && <p className="text-xs text-muted-foreground">{sale.customerEmail}</p>}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{sale.salespersonName}</td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(sale.saleDate)}</td>
                  <td className="px-5 py-3.5">
                    <span className="font-display font-bold">{formatCurrency(sale.total)}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold capitalize", STATUS_STYLE[sale.status])}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold capitalize", PAYMENT_STYLE[sale.paymentStatus])}>
                      {sale.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
          <span>{filtered.length} sales</span>
          <span>
            Total: <strong className="text-foreground font-display">{formatCurrency(filtered.reduce((s, r) => s + r.total, 0))}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
