"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_DEALS } from "@/data/mock-crm";
import { formatCurrency, formatDate } from "@/lib/utils";

const STAGE_VARIANT: Record<string, "default" | "secondary" | "success" | "warning" | "destructive" | "muted"> = {
  lead: "muted",
  qualified: "secondary",
  proposal: "default",
  negotiation: "warning",
  closed_won: "success",
  closed_lost: "destructive",
};

export function RecentDeals() {
  const deals = MOCK_DEALS.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent Deals</CardTitle>
        <Link
          href="/dashboard/crm/deals"
          className="flex items-center gap-1 text-sm font-medium text-brand-ember hover:underline"
        >
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-border/50 p-4 transition-colors hover:bg-muted/30"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{deal.title}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(deal.expectedCloseDate)} · {deal.probability}% probability
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Badge variant={STAGE_VARIANT[deal.stage] ?? "muted"}>
                  {deal.stage.replace(/_/g, " ")}
                </Badge>
                <span className="font-display font-bold text-foreground">
                  {formatCurrency(deal.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
