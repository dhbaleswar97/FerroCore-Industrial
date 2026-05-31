import type { Metadata } from "next";
import { SalesEntryForm } from "@/features/sales/sales-entry-form";

export const metadata: Metadata = { title: "New Sale — FerroCore" };

export default function SalesEntryPage() {
  return <SalesEntryForm />;
}
