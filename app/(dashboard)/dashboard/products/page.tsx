import type { Metadata } from "next";
import { ProductsOverview } from "@/features/products/products-overview";

export const metadata: Metadata = { title: "Product Catalog — FerroCore" };

export default function ProductsPage() {
  return <ProductsOverview />;
}
