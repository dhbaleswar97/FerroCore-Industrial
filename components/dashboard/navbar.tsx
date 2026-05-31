"use client";

import { Menu, Bell, Moon, Sun, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useUIStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

function useBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const labelMap: Record<string, string> = {
    dashboard: "Dashboard",
    sales: "Sales",
    entry: "New Entry",
    invoices: "Invoices",
    leads: "Leads",
    crm: "CRM",
    contacts: "Contacts",
    companies: "Companies",
    deals: "Deals",
    activities: "Activities",
    inventory: "Inventory",
    products: "Products",
    warehouses: "Warehouses",
    movement: "Movement",
    activity: "Activity Log",
    suppliers: "Suppliers",
    analytics: "Analytics",
    reports: "Reports",
    settings: "Settings",
  };

  return segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    return { label: labelMap[seg] ?? seg, href };
  });
}

export function DashboardNavbar() {
  const { sidebarCollapsed, toggleSidebarMobile, toggleCommandPalette } = useUIStore();
  const { user } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const breadcrumbs = useBreadcrumbs();

  return (
    <header
      className={cn(
        "navbar",
        "left-0 lg:left-[var(--sidebar-width)]",
        sidebarCollapsed && "lg:left-[var(--sidebar-width-collapsed)]"
      )}
      style={{ right: 0, left: undefined }}
    >
      <div className="flex w-full items-center gap-4 px-4 lg:px-6">
        {/* Mobile menu toggle */}
        <button
          onClick={toggleSidebarMobile}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-muted lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Breadcrumbs (desktop) */}
        <nav className="hidden items-center gap-1 text-sm text-muted-foreground lg:flex">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />}
              {i === breadcrumbs.length - 1 ? (
                <span className="font-medium text-foreground">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-foreground transition-colors">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* Search / Command palette trigger */}
        <button
          onClick={toggleCommandPalette}
          className={cn(
            "hidden flex-1 max-w-xs sm:flex",
            "ml-auto lg:ml-0"
          )}
        >
          <div className="relative w-full">
            <div className="flex w-full cursor-text items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted">
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <span className="flex-1 text-left">Search...</span>
              <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium sm:inline-flex">
                ⌘K
              </kbd>
            </div>
          </div>
        </button>

        <div className="ml-auto flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Command palette (mobile) */}
          <button
            onClick={toggleCommandPalette}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-muted sm:hidden"
            aria-label="Open command palette"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Notifications */}
          <button className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-muted">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-ember" />
          </button>

          {/* Avatar */}
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cobalt text-xs font-bold text-white ring-2 ring-brand-cobalt/20 transition-transform hover:scale-105">
            {user ? getInitials(user.name) : "?"}
          </button>
        </div>
      </div>
    </header>
  );
}
