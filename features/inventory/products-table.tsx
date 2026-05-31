"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_PRODUCTS, MOCK_INVENTORY } from "@/data/mock-inventory";
import { formatCurrency, titleCase } from "@/lib/utils";
import type { Product } from "@/types/inventory";
import { Plus } from "lucide-react";

const STOCK_VARIANT: Record<string, "success" | "warning" | "destructive" | "muted"> = {
  in_stock: "success",
  low_stock: "warning",
  out_of_stock: "destructive",
  discontinued: "muted",
};

export function ProductsTable() {
  const enrichedProducts = MOCK_PRODUCTS.map((p) => ({
    ...p,
    inventory: MOCK_INVENTORY.find((i) => i.productId === p.id),
  }));

  const columns = useMemo<ColumnDef<(typeof enrichedProducts)[number], unknown>[]>(
    () => [
      {
        id: "product",
        header: "Product",
        accessorKey: "name",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted-foreground font-mono">{row.original.sku}</p>
          </div>
        ),
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category",
        cell: ({ row }) => (
          <Badge variant="muted">{titleCase(row.original.category)}</Badge>
        ),
      },
      {
        id: "price",
        header: "Unit Price",
        accessorKey: "unitPrice",
        cell: ({ row }) => (
          <span>
            {formatCurrency(row.original.unitPrice)} / {row.original.unit}
          </span>
        ),
      },
      {
        id: "stock",
        header: "Stock",
        cell: ({ row }) => {
          const inv = row.original.inventory;
          return inv ? (
            <span className="font-medium">
              {inv.availableQuantity.toLocaleString()} {row.original.unit}
            </span>
          ) : (
            "—"
          );
        },
      },
      {
        id: "stockStatus",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.inventory?.stockStatus ?? "out_of_stock";
          return (
            <Badge variant={STOCK_VARIANT[status]}>
              {titleCase(status)}
            </Badge>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Products</h1>
          <p className="mt-1 text-muted-foreground">{MOCK_PRODUCTS.length} products in catalog</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>
      <DataTable columns={columns} data={enrichedProducts} searchKey="name" />
    </div>
  );
}
