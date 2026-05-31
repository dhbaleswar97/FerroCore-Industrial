"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { MOCK_CATEGORY_DATA } from "@/data/mock-analytics";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function CategoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Category</CardTitle>
        <CardDescription>Product category distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={MOCK_CATEGORY_DATA}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {MOCK_CATEGORY_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value}%`, "Share"]}
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.75rem",
                fontSize: "0.8125rem",
              }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ fontSize: "0.75rem", color: "var(--color-muted-foreground)" }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
