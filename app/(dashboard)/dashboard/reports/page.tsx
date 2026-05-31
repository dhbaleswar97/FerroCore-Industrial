import type { Metadata } from "next";
import { ReportsDashboard } from "@/features/reports/reports-dashboard";

export const metadata: Metadata = { title: "Reports — FerroCore" };

export default function ReportsPage() {
  return <ReportsDashboard />;
}
