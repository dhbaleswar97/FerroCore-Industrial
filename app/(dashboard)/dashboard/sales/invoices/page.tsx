import type { Metadata } from "next";
import { InvoiceTable } from "@/features/sales/invoice-table";

export const metadata: Metadata = { title: "Invoices — FerroCore" };

export default function InvoicesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-black">Invoices</h1>
        <p className="text-sm text-muted-foreground">Track payment status and manage all invoices</p>
      </div>
      <InvoiceTable />
    </div>
  );
}
