"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import CountUp from "react-countup";
import { cn, formatPercentage } from "@/lib/utils";
import { Card, CardContent } from "./card";
import type { MetricCard as MetricCardType } from "@/types/analytics";

interface MetricCardProps {
  metric: MetricCardType;
  className?: string;
}

export function MetricCard({ metric, className }: MetricCardProps) {
  const { label, value, change, changeType, prefix, unit, description } = metric;

  const numericValue = typeof value === "number" ? value : parseFloat(String(value));

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              {prefix && (
                <span className="font-display text-2xl font-bold text-foreground">{prefix}</span>
              )}
              <CountUp
                end={numericValue}
                duration={1.5}
                separator=","
                decimals={unit === "%" ? 1 : 0}
                className="font-display text-3xl font-black tracking-tight text-foreground"
              />
              {unit && (
                <span className="font-display text-xl font-bold text-muted-foreground">{unit}</span>
              )}
            </div>
            {description && (
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            )}
          </div>

          {change !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                changeType === "increase" && "bg-success/15 text-success",
                changeType === "decrease" && "bg-destructive/15 text-destructive",
                changeType === "neutral" && "bg-muted text-muted-foreground"
              )}
            >
              {changeType === "increase" && <TrendingUp className="h-3 w-3" />}
              {changeType === "decrease" && <TrendingDown className="h-3 w-3" />}
              {changeType === "neutral" && <Minus className="h-3 w-3" />}
              <span>{formatPercentage(Math.abs(change))}</span>
            </div>
          )}
        </div>

        {/* Mini sparkline bar */}
        {metric.trend && metric.trend.length > 0 && (
          <div className="mt-4 flex items-end gap-0.5 h-8">
            {metric.trend.map((point, i) => {
              const max = Math.max(...metric.trend!.map((p) => p.value));
              const height = Math.max(20, (point.value / max) * 100);
              return (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-sm transition-all",
                    i === metric.trend!.length - 1
                      ? "bg-brand-ember"
                      : "bg-brand-ember/20"
                  )}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
        )}
      </CardContent>

      {/* Brand accent */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-brand-ember/50 to-transparent" />
    </Card>
  );
}
