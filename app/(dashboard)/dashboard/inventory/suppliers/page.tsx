import type { Metadata } from "next";
import { SuppliersTable } from "@/features/inventory/suppliers-table";

export const metadata: Metadata = { title: "Suppliers" };

export default function SuppliersPage() {
  return <SuppliersTable />;
}
