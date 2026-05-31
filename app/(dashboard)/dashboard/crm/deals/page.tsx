import type { Metadata } from "next";
import { DealsPipeline } from "@/features/crm/deals-pipeline";

export const metadata: Metadata = { title: "Deals" };

export default function DealsPage() {
  return <DealsPipeline />;
}
