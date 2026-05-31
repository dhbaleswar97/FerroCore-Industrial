"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_SUPPLIERS } from "@/data/mock-inventory";
import type { Supplier } from "@/types/inventory";
import { Plus, Star, Globe, Mail, Phone, Package } from "lucide-react";
import { cn } from "@/lib/utils";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-3.5 w-3.5 fill-warning text-warning" />
      <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
    </div>
  );
}

export function SuppliersTable() {
  const columns = useMemo<ColumnDef<Supplier, unknown>[]>(
    () => [
      {
        id: "name",
        header: "Supplier",
        accessorKey: "name",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted-foreground font-mono">{row.original.code}</p>
          </div>
        ),
      },
      {
        id: "contact",
        header: "Contact",
        cell: ({ row }) => (
          <div className="space-y-0.5">
            {row.original.contactEmail && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Mail className="h-3 w-3 shrink-0" />
                {row.original.contactEmail}
              </div>
            )}
            {row.original.contactPhone && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Phone className="h-3 w-3 shrink-0" />
                {row.original.contactPhone}
              </div>
            )}
          </div>
        ),
      },
      {
        id: "country",
        header: "Country",
        accessorKey: "country",
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{row.original.country}</span>
          </div>
        ),
      },
      {
        id: "categories",
        header: "Categories",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.categories.slice(0, 2).map((cat) => (
              <span key={cat} className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium capitalize">
                {cat.replace("_", " ")}
              </span>
            ))}
            {row.original.categories.length > 2 && (
              <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                +{row.original.categories.length - 2}
              </span>
            )}
          </div>
        ),
      },
      {
        id: "leadTime",
        header: "Lead Time",
        accessorKey: "leadTimeDays",
        cell: ({ row }) => (
          <span className="text-sm">{row.original.leadTimeDays} days</span>
        ),
      },
      {
        id: "paymentTerms",
        header: "Payment",
        accessorKey: "paymentTerms",
        cell: ({ row }) => (
          <span className="text-sm">{row.original.paymentTerms}</span>
        ),
      },
      {
        id: "rating",
        header: "Rating",
        accessorKey: "rating",
        cell: ({ row }) => <RatingStars rating={row.original.rating} />,
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

  const stats = [
    { label: "Total Suppliers", value: MOCK_SUPPLIERS.length, icon: Package, color: "text-brand-ember" },
    { label: "Active", value: MOCK_SUPPLIERS.filter((s) => s.status === "active").length, icon: Globe, color: "text-success" },
    { label: "Avg Rating", value: (MOCK_SUPPLIERS.reduce((s, x) => s + x.rating, 0) / MOCK_SUPPLIERS.length).toFixed(1), icon: Star, color: "text-warning" },
    { label: "Avg Lead Time", value: `${Math.round(MOCK_SUPPLIERS.reduce((s, x) => s + x.leadTimeDays, 0) / MOCK_SUPPLIERS.length)} days`, icon: Package, color: "text-brand-cobalt" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold lg:text-3xl">Suppliers</h1>
          <p className="mt-1 text-muted-foreground">
            {MOCK_SUPPLIERS.length} suppliers · Manage vendor relationships and performance
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Add Supplier
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted p-2.5">
                <Icon className={cn("h-4 w-4", color)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-display text-xl font-bold">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <DataTable columns={columns} data={MOCK_SUPPLIERS} searchKey="name" />
      </div>
    </div>
  );
}
