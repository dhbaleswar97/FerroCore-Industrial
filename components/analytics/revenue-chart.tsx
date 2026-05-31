"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MOCK_REVENUE_DATA } from "@/data/mock-analytics";
import { formatCurrency } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue, cost, and profit — current year</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={MOCK_REVENUE_DATA} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F76C46" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#F76C46" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3D55FD" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3D55FD" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                formatCurrency(value),
                name.charAt(0).toUpperCase() + name.slice(1),
              ]}
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.75rem",
                boxShadow: "var(--shadow-card)",
                fontSize: "0.8125rem",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "0.75rem", paddingTop: "1rem" }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#F76C46"
              strokeWidth={2}
              fill="url(#gradRevenue)"
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#3D55FD"
              strokeWidth={2}
              fill="url(#gradProfit)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
