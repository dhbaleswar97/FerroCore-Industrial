"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_DEALS } from "@/data/mock-crm";
import { formatCurrency, formatDate, titleCase } from "@/lib/utils";
import type { Deal } from "@/types/crm";
import { Plus } from "lucide-react";

const STAGE_VARIANT: Record<string, "default" | "secondary" | "success" | "warning" | "destructive" | "muted"> = {
  lead: "muted",
  qualified: "secondary",
  proposal: "default",
  negotiation: "warning",
  closed_won: "success",
  closed_lost: "destructive",
};

export function DealsTable() {
  const columns = useMemo<ColumnDef<Deal, unknown>[]>(
    () => [
      {
        id: "title",
        header: "Deal",
        accessorKey: "title",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.title}</p>
            <p className="text-xs text-muted-foreground">
              {row.original.priority} priority
            </p>
          </div>
        ),
      },
      {
        id: "value",
        header: "Value",
        accessorKey: "value",
        cell: ({ row }) => (
          <span className="font-display font-bold">
            {formatCurrency(row.original.value)}
          </span>
        ),
      },
      {
        id: "stage",
        header: "Stage",
        accessorKey: "stage",
        cell: ({ row }) => (
          <Badge variant={STAGE_VARIANT[row.original.stage] ?? "muted"}>
            {titleCase(row.original.stage)}
          </Badge>
        ),
      },
      {
        id: "probability",
        header: "Probability",
        accessorKey: "probability",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-brand-ember"
                style={{ width: `${row.original.probability}%` }}
              />
            </div>
            <span className="text-sm">{row.original.probability}%</span>
          </div>
        ),
      },
      {
        id: "closeDate",
        header: "Close Date",
        accessorKey: "expectedCloseDate",
        cell: ({ row }) => formatDate(row.original.expectedCloseDate),
      },
    ],
    []
  );

  const totalPipeline = MOCK_DEALS
    .filter((d) => !["closed_won", "closed_lost"].includes(d.stage))
    .reduce((sum, d) => sum + d.value * (d.probability / 100), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Deals</h1>
          <p className="mt-1 text-muted-foreground">
            {MOCK_DEALS.length} deals · Weighted pipeline:{" "}
            <span className="font-semibold text-foreground">
              {formatCurrency(totalPipeline)}
            </span>
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Add Deal
        </Button>
      </div>
      <DataTable columns={columns} data={MOCK_DEALS} />
    </div>
  );
}
