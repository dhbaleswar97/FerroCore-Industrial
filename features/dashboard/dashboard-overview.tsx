"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MetricCard } from "@/components/ui/metric-card";
import { RevenueChart } from "@/components/analytics/revenue-chart";
import { CategoryChart } from "@/components/analytics/category-chart";
import { useDashboardStore } from "@/store/dashboard-store";
import { useAuthStore } from "@/store/auth-store";
import { useUIStore } from "@/store/ui-store";
import { SkeletonCard } from "@/components/ui/skeleton";
import { RecentDeals } from "./recent-deals";
import { ROUTES } from "@/constants/app";
import { Plus, FileText, Users, Package, Search } from "lucide-react";

const QUICK_ACTIONS = [
  { label: "New Sale", icon: Plus, href: ROUTES.sales.entry, color: "text-brand-ember", bg: "bg-brand-ember/10" },
  { label: "New Invoice", icon: FileText, href: ROUTES.sales.invoices, color: "text-brand-cobalt", bg: "bg-brand-cobalt/10" },
  { label: "Add Contact", icon: Users, href: ROUTES.crm.contacts, color: "text-brand-sand", bg: "bg-brand-sand/10" },
  { label: "Stock Entry", icon: Package, href: ROUTES.inventory.movement, color: "text-success", bg: "bg-success/10" },
];

export function DashboardOverview() {
  const { user } = useAuthStore();
  const { metrics, isLoadingMetrics, fetchMetrics } = useDashboardStore();
  const { toggleCommandPalette } = useUIStore();

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold lg:text-3xl">
            {greeting}, {user?.name.split(" ")[0]} 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here&apos;s what&apos;s happening at FerroCore today.
          </p>
        </div>

        {/* Search shortcut */}
        <button
          onClick={toggleCommandPalette}
          className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          <Search className="h-3.5 w-3.5" />
          Quick search...
          <kbd className="ml-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {QUICK_ACTIONS.map(({ label, icon: Icon, href, color, bg }) => (
          <Link
            key={label}
            href={href}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium transition-all hover:shadow-card hover:-translate-y-0.5"
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bg}`}>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </div>

      {/* Metrics grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {isLoadingMetrics
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : metrics.map((metric) => (
              <div key={metric.id} className="xl:col-span-2">
                <MetricCard metric={metric} />
              </div>
            ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <CategoryChart />
        </div>
      </div>

      {/* Recent deals */}
      <RecentDeals />
    </div>
  );
}
