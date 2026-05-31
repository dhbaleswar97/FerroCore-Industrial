import type { Metadata } from "next";
import { LeadsTable } from "@/features/sales/leads-table";

export const metadata: Metadata = { title: "Leads — FerroCore" };

export default function LeadsPage() {
  return <LeadsTable />;
}
