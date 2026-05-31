import type { Metadata } from "next";
import { WarehouseOverview } from "@/features/inventory/warehouse-overview";

export const metadata: Metadata = { title: "Warehouses — FerroCore" };

export default function WarehousesPage() {
  return <WarehouseOverview />;
}
