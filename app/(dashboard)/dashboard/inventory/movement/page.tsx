import type { Metadata } from "next";
import { MovementTable } from "@/features/inventory/movement-table";

export const metadata: Metadata = { title: "Stock Movements — FerroCore" };

export default function MovementPage() {
  return <MovementTable />;
}
