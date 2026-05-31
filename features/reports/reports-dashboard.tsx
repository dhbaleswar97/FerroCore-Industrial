"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Calendar, TrendingUp, TrendingDown, BarChart3, Users, Package, FileText } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { MOCK_REVENUE_DATA } from "@/data/mock-analytics";
import { MOCK_SALES, MOCK_SALES_PERFORMANCE } from "@/data/mock-sales";
import { MOCK_INVENTORY } from "@/data/mock-inventory";
import { formatCurrency } from "@/lib/utils";

const REPORT_TYPES = [
  { id: "executive", label: "Executive Summary", icon: BarChart3 },
  { id: "sales", label: "Sales Report", icon: TrendingUp },
  { id: "inventory", label: "Inventory Report", icon: Package },
  { id: "team", label: "Team Performance", icon: Users },
] as const;

type ReportType = (typeof REPORT_TYPES)[number]["id"];

const PIE_DATA = [
  { name: "Structural Steel", value: 42, color: "#F76C46" },
  { name: "Alloys", value: 28, color: "#3D55FD" },
  { name: "Fasteners", value: 15, color: "#C6AF88" },
  { name: "Safety", value: 8, color: "#85A1C5" },
  { name: "Other", value: 7, color: "#E9E778" },
];

const MONTHLY_ORDERS = [
  { month: "Jan", orders: 24 }, { month: "Feb", orders: 30 }, { month: "Mar", orders: 28 },
  { month: "Apr", orders: 35 }, { month: "May", orders: 38 }, { month: "Jun", orders: 32 },
  { month: "Jul", orders: 40 }, { month: "Aug", orders: 36 }, { month: "Sep", orders: 44 },
  { month: "Oct", orders: 42 }, { month: "Nov", orders: 48 }, { month: "Dec", orders: 52 },
];

export function ReportsDashboard() {
  const [activeReport, setActiveReport] = useState<ReportType>("executive");
  const [period, setPeriod] = useState("2026");

  const totalRevenue = MOCK_SALES.reduce((s, sale) => s + sale.total, 0);
  const totalSales = MOCK_SALES.length;
  const lowStockItems = MOCK_INVENTORY.filter((i) => i.stockStatus !== "in_stock").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-black">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground">Export and analyze business performance data</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
          >
            {["2026", "2025", "2024"].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 rounded-xl bg-brand-ember px-4 py-2 text-sm font-bold text-white hover:opacity-90">
            <Download className="h-4 w-4" /> Export PDF
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <Download className="h-4 w-4" /> Export Excel
          </button>
        </div>
      </div>

      {/* Report type tabs */}
      <div className="flex gap-2 flex-wrap">
        {REPORT_TYPES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveReport(id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              activeReport === id
                ? "bg-brand-ember text-white shadow-sm"
                : "border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Executive Summary */}
      {activeReport === "executive" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Total Revenue", value: formatCurrency(totalRevenue), change: "+12.4%", up: true, icon: TrendingUp },
              { label: "Total Sales", value: totalSales.toString(), change: "+8.2%", up: true, icon: FileText },
              { label: "Low Stock Alerts", value: lowStockItems.toString(), change: "+2", up: false, icon: Package },
              { label: "Active Leads", value: "4", change: "+1", up: true, icon: Users },
            ].map(({ label, value, change, up, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-ember/10 text-brand-ember">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>
                <p className="font-display text-2xl font-black">{value}</p>
                <div className="mt-2 flex items-center gap-1">
                  {up ? <TrendingUp className="h-3 w-3 text-success" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
                  <span className={`text-xs font-semibold ${up ? "text-success" : "text-destructive"}`}>{change}</span>
                  <span className="text-xs text-muted-foreground">vs last year</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display font-bold">Monthly Revenue — {period}</p>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={MOCK_REVENUE_DATA}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F76C46" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#F76C46" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Area type="monotone" dataKey="revenue" stroke="#F76C46" fill="url(#revenueGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-display font-bold mb-4">Revenue by Category</p>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                    {PIE_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 space-y-2">
                {PIE_DATA.map((entry) => (
                  <div key={entry.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-muted-foreground">{entry.name}</span>
                    </div>
                    <span className="font-semibold">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-display font-bold mb-4">Monthly Orders — {period}</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={MONTHLY_ORDERS}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="orders" fill="#3D55FD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Sales Report */}
      {activeReport === "sales" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border px-5 py-4">
              <p className="font-display font-bold">Sales Report — {period}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {["Sale #", "Customer", "Salesperson", "Products", "Total", "Status", "Date"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {MOCK_SALES.map((sale) => (
                    <tr key={sale.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-brand-ember">{sale.saleNumber}</td>
                      <td className="px-5 py-3 font-display text-sm font-semibold">{sale.customerName}</td>
                      <td className="px-5 py-3 text-sm text-muted-foreground">{sale.salespersonName}</td>
                      <td className="px-5 py-3 text-sm text-muted-foreground">{sale.lineItems.length} items</td>
                      <td className="px-5 py-3 font-display font-bold">{formatCurrency(sale.total)}</td>
                      <td className="px-5 py-3">
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize">{sale.status}</span>
                      </td>
                      <td className="px-5 py-3 text-sm text-muted-foreground">{sale.saleDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-border px-5 py-3">
              <span className="text-xs text-muted-foreground">{MOCK_SALES.length} records</span>
              <span className="font-display font-bold text-sm text-brand-ember">Total: {formatCurrency(totalRevenue)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Team Performance */}
      {activeReport === "team" && (
        <div className="space-y-4">
          {MOCK_SALES_PERFORMANCE.map((sp, i) => (
            <motion.div
              key={sp.salespersonId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-4 mb-5">
                <img src={sp.avatar} alt={sp.salespersonName} className="h-12 w-12 rounded-full" />
                <div className="flex-1">
                  <p className="font-display font-black">{sp.salespersonName}</p>
                  <p className="text-sm text-muted-foreground">{sp.totalSales} sales · {sp.conversionRate}% conversion</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-black text-brand-ember">{sp.achievement}%</p>
                  <p className="text-xs text-muted-foreground">of target</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Revenue", value: formatCurrency(sp.totalRevenue) },
                  { label: "Avg Deal", value: formatCurrency(sp.avgDealSize) },
                  { label: "Target", value: formatCurrency(sp.target) },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-display font-bold text-sm mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-brand-ember transition-all duration-700"
                  style={{ width: `${sp.achievement}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Inventory Report */}
      {activeReport === "inventory" && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="border-b border-border px-5 py-4">
            <p className="font-display font-bold">Inventory Status Report</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Product ID", "Available", "Reserved", "Reorder Point", "Status", "Last Restocked"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MOCK_INVENTORY.map((inv) => (
                  <tr key={inv.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-brand-ember">{inv.productId}</td>
                    <td className="px-5 py-3 font-display font-bold text-sm">{inv.availableQuantity.toLocaleString()}</td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">{inv.reservedQuantity.toLocaleString()}</td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">{inv.reorderPoint.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        inv.stockStatus === "in_stock" ? "bg-success/15 text-success" :
                        inv.stockStatus === "low_stock" ? "bg-warning/15 text-warning" :
                        "bg-destructive/15 text-destructive"
                      }`}>
                        {inv.stockStatus.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">
                      {inv.lastRestockedAt ? new Date(inv.lastRestockedAt).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
