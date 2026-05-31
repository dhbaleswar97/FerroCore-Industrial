"use client";

import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { Sidebar } from "./sidebar";
import { DashboardNavbar } from "./navbar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { sidebarCollapsed, sidebarMobileOpen, setSidebarMobileOpen } = useUIStore();

  return (
    <div className="dashboard-layout">
      {/* Mobile overlay */}
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "hidden lg:block",
          sidebarMobileOpen && "!block"
        )}
      >
        <Sidebar />
      </div>

      {/* Main */}
      <main
        className={cn(
          "main-content w-full transition-[margin-left] duration-normal ease-cinematic",
          sidebarCollapsed
            ? "lg:ml-[var(--sidebar-width-collapsed)]"
            : "lg:ml-[var(--sidebar-width)]"
        )}
      >
        <DashboardNavbar />
        <div className="px-4 py-6 lg:px-6 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
