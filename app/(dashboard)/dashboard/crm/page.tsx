import type { Metadata } from "next";
import { CRMOverview } from "@/features/crm/crm-overview";

export const metadata: Metadata = { title: "CRM" };

export default function CRMPage() {
  return <CRMOverview />;
}
