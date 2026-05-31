"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ShoppingCart, FileText, Users, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import CountUp from "react-countup";
import { cn, formatCurrency } from "@/lib/utils";
import { MOCK_SALES, MOCK_INVOICES, MOCK_LEADS, MOCK_SALES_PERFORMANCE } from "@/data/mock-sales";

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
  cancelled: "bg-muted text-muted-foreground",
};

export function SalesOverview() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 400); }, []);

  const totalRevenue = MOCK_SALES.reduce((sum, s) => sum + s.total, 0);
  const confirmedSales = MOCK_SALES.filter((s) => s.status !== "cancelled" && s.status !== "draft").length;
  const overdueInvoices = MOCK_INVOICES.filter((i) => i.status === "overdue").length;
  const activeLeads = MOCK_LEADS.filter((l) => l.status !== "converted" && l.status !== "lost").length;

  const kpis = [
    { label: "Total Revenue", value: totalRevenue, prefix: "$", icon: TrendingUp, color: "ember" },
    { label: "Active Sales", value: confirmedSales, icon: ShoppingCart, color: "cobalt" },
    { label: "Overdue Invoices", value: overdueInvoices, icon: FileText, color: "warning" },
    { label: "Active Leads", value: activeLeads, icon: Users, color: "steel" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-black">Sales Overview</h1>
          <p className="text-sm text-muted-foreground">Monitor revenue, invoices and lead pipeline</p>
        </div>
        <Link
          href="/dashboard/sales/entry"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-ember px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> New Sale
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-ember/10 text-brand-ember">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="font-display text-2xl font-black">
                {kpi.prefix && <span>{kpi.prefix}</span>}
                {loaded ? (
                  <CountUp end={kpi.value} duration={1.2} separator="," decimals={kpi.prefix ? 0 : 0} />
                ) : (
                  "—"
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Sales */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <p className="font-display font-bold">Recent Sales</p>
            <Link href="/dashboard/sales" className="flex items-center gap-1 text-xs text-brand-ember hover:text-brand-ember/80">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {MOCK_SALES.slice(0, 5).map((sale) => (
              <div key={sale.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-mono text-muted-foreground">{sale.saleNumber}</p>
                  <p className="font-display text-sm font-semibold truncate">{sale.customerName}</p>
                  <p className="text-xs text-muted-foreground">{sale.salespersonName} · {sale.saleDate}</p>
                </div>
                <div className="ml-4 flex flex-col items-end gap-1.5">
                  <span className="font-display font-bold text-sm">{formatCurrency(sale.total)}</span>
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold capitalize", STATUS_STYLE[sale.status])}>
                    {sale.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance */}
        <div className="rounded-2xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <p className="font-display font-bold">Team Performance</p>
          </div>
          <div className="divide-y divide-border">
            {MOCK_SALES_PERFORMANCE.map((sp) => (
              <div key={sp.salespersonId} className="px-5 py-4">
                <div className="flex items-center gap-3 mb-3">
                  <img src={sp.avatar} alt={sp.salespersonName} className="h-8 w-8 rounded-full" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold truncate">{sp.salespersonName}</p>
                    <p className="text-xs text-muted-foreground">{sp.totalSales} sales · {sp.conversionRate}% conversion</p>
                  </div>
                  <span className="text-xs font-bold text-brand-ember">{sp.achievement}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-brand-ember transition-all duration-700"
                    style={{ width: `${sp.achievement}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
