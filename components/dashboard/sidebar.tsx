"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import { DASHBOARD_NAV } from "@/constants/navigation";
import { BRAND } from "@/constants/brand";
import { ChevronLeft, ChevronRight, LogOut, Settings } from "lucide-react";
import { getInitials } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";
import { useState } from "react";

function NavItemRow({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpen((p) => !p)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            isActive && "text-sidebar-primary bg-sidebar-accent"
          )}
        >
          {Icon && <Icon className={cn("h-4 w-4 shrink-0", collapsed ? "mx-auto" : "")} />}
          <span className={cn("flex-1 text-left", collapsed && "sr-only")}>{item.label}</span>
          {item.isNew && !collapsed && (
            <span className="rounded-full bg-brand-ember px-1.5 py-0.5 text-[10px] font-semibold text-white">
              NEW
            </span>
          )}
          {!collapsed && (
            <ChevronRight
              className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-90")}
            />
          )}
        </button>
        {open && !collapsed && (
          <div className="ml-3 mt-1 space-y-1 border-l border-sidebar-border pl-3">
            {item.children!.map((child) => (
              <Link
                key={child.id}
                href={child.href ?? "#"}
                className={cn(
                  "block rounded-md px-2 py-1.5 text-sm transition-colors",
                  "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                  pathname === child.href && "text-sidebar-primary font-medium"
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href ?? "#"}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
        isActive && "text-sidebar-primary bg-sidebar-accent font-semibold"
      )}
    >
      {Icon && <Icon className={cn("h-4 w-4 shrink-0", collapsed ? "mx-auto" : "")} />}
      <span className={cn(collapsed && "sr-only")}>{item.label}</span>
      {item.isNew && !collapsed && (
        <span className="ml-auto rounded-full bg-brand-ember px-1.5 py-0.5 text-[10px] font-semibold text-white">
          NEW
        </span>
      )}
      {item.badge !== undefined && !collapsed && (
        <span className="ml-auto rounded-full bg-brand-cobalt px-1.5 py-0.5 text-[10px] font-semibold text-white">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { user, logout } = useAuthStore();

  return (
    <aside
      className={cn(
        "sidebar",
        sidebarCollapsed && "collapsed"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-ember">
          <span className="text-sm font-black text-white">FC</span>
        </div>
        {!sidebarCollapsed && (
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold text-sidebar-foreground">
              {BRAND.shortName}
            </p>
            <p className="truncate text-[10px] text-sidebar-foreground/40 uppercase tracking-wider">
              Industrial
            </p>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-sidebar-foreground/40 transition-colors hover:text-sidebar-foreground hover:bg-sidebar-accent"
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {DASHBOARD_NAV.map((section) => (
          <div key={section.id}>
            {section.label && !sidebarCollapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/30">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavItemRow key={item.id} item={item} collapsed={sidebarCollapsed} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className="border-t border-sidebar-border p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg p-2",
            !sidebarCollapsed && "hover:bg-sidebar-accent transition-colors"
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-cobalt text-xs font-bold text-white">
            {user ? getInitials(user.name) : "?"}
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {user?.name ?? "User"}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/40">{user?.email ?? ""}</p>
            </div>
          )}
          {!sidebarCollapsed && (
            <div className="flex gap-1">
              <Link
                href="/dashboard/settings"
                className="rounded p-1 text-sidebar-foreground/40 transition-colors hover:text-sidebar-foreground"
              >
                <Settings className="h-3.5 w-3.5" />
              </Link>
              <button
                onClick={logout}
                className="rounded p-1 text-sidebar-foreground/40 transition-colors hover:text-destructive"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
