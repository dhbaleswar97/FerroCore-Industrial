import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | FerroCore Dashboard",
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
