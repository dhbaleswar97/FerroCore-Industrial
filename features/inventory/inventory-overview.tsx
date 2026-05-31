"use client";

import Link from "next/link";
import { Package, Warehouse, Truck, AlertTriangle, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_INVENTORY, MOCK_WAREHOUSES, MOCK_PRODUCTS } from "@/data/mock-inventory";
import { formatCurrency } from "@/lib/utils";
import { ROUTES } from "@/constants/app";
import { useState } from "react";

const outOfStock = MOCK_INVENTORY.filter((i) => i.stockStatus === "out_of_stock").length;
const lowStock = MOCK_INVENTORY.filter((i) => i.stockStatus === "low_stock").length;

const STATS = [
  { label: "Total SKUs", value: "4", icon: Package, href: ROUTES.inventory.products, color: "text-brand-ember" },
  { label: "Warehouses", value: String(MOCK_WAREHOUSES.length), icon: Warehouse, href: ROUTES.inventory.warehouses, color: "text-brand-cobalt" },
  { label: "Low Stock", value: String(lowStock), icon: AlertTriangle, href: ROUTES.inventory.products, color: "text-warning" },
  { label: "Out of Stock", value: String(outOfStock), icon: Truck, href: ROUTES.inventory.products, color: "text-destructive" },
];

const LOW_STOCK_ITEMS = MOCK_INVENTORY
  .filter((i) => i.stockStatus === "low_stock" || i.stockStatus === "out_of_stock")
  .map((i) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === i.productId);
    return { ...i, productName: product?.name ?? "Unknown" };
  });

export function InventoryOverview() {
  const [alertDismissed, setAlertDismissed] = useState(false);

  return (
    <div className="space-y-8">
      {/* Low-stock alert */}
      {!alertDismissed && LOW_STOCK_ITEMS.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/8 p-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-warning">
              {LOW_STOCK_ITEMS.filter((i) => i.stockStatus === "out_of_stock").length > 0
                ? `${LOW_STOCK_ITEMS.filter((i) => i.stockStatus === "out_of_stock").length} item(s) out of stock · `
                : ""}
              {LOW_STOCK_ITEMS.filter((i) => i.stockStatus === "low_stock").length} item(s) running low
            </p>
            <p className="mt-0.5 text-xs text-warning/70">
              {LOW_STOCK_ITEMS.map((i) => i.productName).join(" · ")}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={ROUTES.inventory.products}
              className="text-xs font-semibold text-warning hover:underline"
            >
              View
            </Link>
            <button
              onClick={() => setAlertDismissed(true)}
              className="rounded p-0.5 text-warning/60 hover:text-warning"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold lg:text-3xl">Inventory</h1>
          <p className="mt-1 text-muted-foreground">Manage products, stock levels, and suppliers.</p>
        </div>
        <Button>Add Product</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href}>
            <Card className="transition-all hover:shadow-elevated hover:-translate-y-0.5 cursor-pointer">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-xl bg-muted p-3">
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-display text-xl font-bold">{value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Warehouse utilization */}
      <div>
        <h2 className="mb-4 font-display text-lg font-semibold">Warehouse Utilization</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {MOCK_WAREHOUSES.map((wh) => (
            <Card key={wh.id}>
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-medium">{wh.name}</p>
                  <span className="text-sm font-bold">{wh.currentUtilization}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${wh.currentUtilization}%`,
                      background:
                        wh.currentUtilization > 85
                          ? "var(--color-destructive)"
                          : wh.currentUtilization > 70
                            ? "var(--color-warning)"
                            : "var(--color-brand-ember)",
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{wh.address}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
