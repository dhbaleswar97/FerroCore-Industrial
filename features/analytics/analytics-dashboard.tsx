"use client";

import { RevenueChart } from "@/components/analytics/revenue-chart";
import { CategoryChart } from "@/components/analytics/category-chart";
import { MetricCard } from "@/components/ui/metric-card";
import { MOCK_METRICS, MOCK_GEOGRAPHY_DATA } from "@/data/mock-analytics";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MOCK_REVENUE_DATA } from "@/data/mock-analytics";

export function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold lg:text-3xl">Analytics</h1>
        <p className="mt-1 text-muted-foreground">
          Full-picture performance analytics and operational KPIs.
        </p>
      </div>

      {/* KPI Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_METRICS.slice(0, 6).map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <CategoryChart />
      </div>

      {/* Monthly orders bar chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Orders</CardTitle>
          <CardDescription>Total orders processed per month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={MOCK_REVENUE_DATA} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.75rem",
                  fontSize: "0.8125rem",
                }}
              />
              <Bar dataKey="orders" fill="#3D55FD" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Geography */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Geography</CardTitle>
          <CardDescription>Top markets by revenue contribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_GEOGRAPHY_DATA.map(({ country, value, percentage }) => (
              <div key={country} className="flex items-center gap-4">
                <span className="w-32 shrink-0 text-sm font-medium">{country}</span>
                <div className="flex-1 overflow-hidden rounded-full bg-muted h-2">
                  <div
                    className="h-full rounded-full bg-brand-ember transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex w-28 shrink-0 items-center justify-between gap-2">
                  <span className="text-sm font-bold">{formatCurrency(value)}</span>
                  <span className="text-xs text-muted-foreground">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
