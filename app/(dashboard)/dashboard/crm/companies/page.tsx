import type { Metadata } from "next";
import { CompaniesTable } from "@/features/crm/companies-table";

export const metadata: Metadata = { title: "Companies" };

export default function CompaniesPage() {
  return <CompaniesTable />;
}
