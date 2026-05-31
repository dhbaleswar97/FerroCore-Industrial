import type { Metadata } from "next";
import { ProductsTable } from "@/features/inventory/products-table";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return <ProductsTable />;
}
