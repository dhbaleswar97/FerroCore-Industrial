"use client";

import { useEffect } from "react";
import { MetricCard } from "@/components/ui/metric-card";
import { RevenueChart } from "@/components/analytics/revenue-chart";
import { CategoryChart } from "@/components/analytics/category-chart";
import { useDashboardStore } from "@/store/dashboard-store";
import { useAuthStore } from "@/store/auth-store";
import { SkeletonCard } from "@/components/ui/skeleton";
import { RecentDeals } from "./recent-deals";

export function DashboardOverview() {
  const { user } = useAuthStore();
  const { metrics, isLoadingMetrics, fetchMetrics } = useDashboardStore();

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold lg:text-3xl">
          {greeting}, {user?.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s what&apos;s happening at FerroCore today.
        </p>
      </div>

      {/* Metrics grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {isLoadingMetrics
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : metrics.map((metric) => (
              <div
                key={metric.id}
                className={
                  metric.id === "revenue" || metric.id === "orders"
                    ? "xl:col-span-2"
                    : "xl:col-span-2"
                }
              >
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
