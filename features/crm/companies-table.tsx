"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_COMPANIES } from "@/data/mock-crm";
import { formatCurrency, titleCase } from "@/lib/utils";
import type { Company } from "@/types/crm";
import { Plus } from "lucide-react";

export function CompaniesTable() {
  const columns = useMemo<ColumnDef<Company, unknown>[]>(
    () => [
      {
        id: "name",
        header: "Company",
        accessorKey: "name",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">{row.original.website ?? "—"}</p>
          </div>
        ),
      },
      {
        id: "industry",
        header: "Industry",
        accessorKey: "industry",
        cell: ({ row }) => <span>{titleCase(row.original.industry)}</span>,
      },
      {
        id: "size",
        header: "Size",
        accessorKey: "size",
        cell: ({ row }) => (
          <Badge variant="muted">{row.original.size} employees</Badge>
        ),
      },
      {
        id: "revenue",
        header: "Revenue",
        accessorKey: "revenue",
        cell: ({ row }) =>
          row.original.revenue ? formatCurrency(row.original.revenue) : "—",
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <Badge variant={row.original.status === "active" ? "success" : "muted"}>
            {row.original.status}
          </Badge>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Companies</h1>
          <p className="mt-1 text-muted-foreground">{MOCK_COMPANIES.length} companies total</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Add Company
        </Button>
      </div>
      <DataTable columns={columns} data={MOCK_COMPANIES} />
    </div>
  );
}
