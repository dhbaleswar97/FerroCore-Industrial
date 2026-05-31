import type { Metadata } from "next";
import { DealsTable } from "@/features/crm/deals-table";

export const metadata: Metadata = { title: "Deals" };

export default function DealsPage() {
  return <DealsTable />;
}
