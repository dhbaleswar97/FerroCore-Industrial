import type { Metadata } from "next";
import { SalesOverview } from "@/features/sales/sales-overview";
import { SalesTable } from "@/features/sales/sales-table";

export const metadata: Metadata = { title: "Sales — FerroCore" };

export default function SalesPage() {
  return (
    <div className="space-y-8">
      <SalesOverview />
      <SalesTable />
    </div>
  );
}
