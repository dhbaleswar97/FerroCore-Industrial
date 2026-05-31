"use client";

import { Menu, Search, Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useUIStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import { cn, getInitials } from "@/lib/utils";

export function DashboardNavbar() {
  const { sidebarCollapsed, toggleSidebarMobile } = useUIStore();
  const { user } = useAuthStore();
  const { theme, setTheme } = useTheme();

  return (
    <header
      className={cn(
        "navbar",
        "left-0 lg:left-[var(--sidebar-width)]",
        sidebarCollapsed && "lg:left-[var(--sidebar-width-collapsed)]"
      )}
      style={{ right: 0, left: undefined }}
    >
      <div
        className={cn(
          "flex w-full items-center gap-4 px-4 lg:px-6",
          "transition-[padding-left] duration-normal"
        )}
      >
        {/* Mobile menu toggle */}
        <button
          onClick={toggleSidebarMobile}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-muted lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Search */}
        <div className="hidden flex-1 max-w-sm sm:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className={cn(
                "w-full rounded-lg border border-border bg-surface pl-9 pr-4 py-1.5",
                "text-sm text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                "transition-colors"
              )}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
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
