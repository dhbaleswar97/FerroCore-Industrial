import type { Metadata } from "next";
import { ActivityLog } from "@/features/inventory/activity-log";

export const metadata: Metadata = { title: "Inventory Activity — FerroCore" };

export default function ActivityPage() {
  return <ActivityLog />;
}
