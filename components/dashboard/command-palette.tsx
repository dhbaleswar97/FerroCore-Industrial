"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard, ShoppingCart, Users, Package, BarChart3,
  FileBarChart, Settings, Plus, Search, ArrowRight, Handshake,
  Warehouse, Truck, FileText, Building2, Activity,
} from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { ROUTES } from "@/constants/app";

interface CommandItem {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  href?: string;
  action?: () => void;
  group: string;
  keywords?: string[];
}

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, toggleCommandPalette } = useUIStore();

  const open = commandPaletteOpen ?? false;

  const close = useCallback(() => {
    if (toggleCommandPalette) toggleCommandPalette();
  }, [toggleCommandPalette]);

  // Global keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        if (toggleCommandPalette) toggleCommandPalette();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggleCommandPalette]);

  const navigate = (href: string) => {
    router.push(href);
    close();
  };

  const ITEMS: CommandItem[] = [
    // Navigation
    { id: "nav-dashboard", label: "Dashboard", icon: LayoutDashboard, href: ROUTES.dashboard, group: "Navigate" },
    { id: "nav-sales", label: "Sales", icon: ShoppingCart, href: ROUTES.sales.root, group: "Navigate" },
    { id: "nav-crm", label: "CRM", icon: Users, href: ROUTES.crm.root, group: "Navigate" },
    { id: "nav-inventory", label: "Inventory", icon: Package, href: ROUTES.inventory.root, group: "Navigate" },
    { id: "nav-analytics", label: "Analytics", icon: BarChart3, href: ROUTES.analytics.root, group: "Navigate" },
    { id: "nav-reports", label: "Reports", icon: FileBarChart, href: ROUTES.reports, group: "Navigate" },
    { id: "nav-settings", label: "Settings", icon: Settings, href: ROUTES.settings.root, group: "Navigate" },
    // CRM sub-pages
    { id: "crm-contacts", label: "Contacts", icon: Users, href: ROUTES.crm.contacts, group: "CRM", keywords: ["contact", "people"] },
    { id: "crm-companies", label: "Companies", icon: Building2, href: ROUTES.crm.companies, group: "CRM", keywords: ["company", "org"] },
    { id: "crm-deals", label: "Deals Pipeline", icon: Handshake, href: ROUTES.crm.deals, group: "CRM", keywords: ["deal", "pipeline", "kanban"] },
    { id: "crm-activities", label: "Activities", icon: Activity, href: ROUTES.crm.activities, group: "CRM", keywords: ["activity", "call", "email", "meeting"] },
    // Inventory sub-pages
    { id: "inv-products", label: "Products", icon: Package, href: ROUTES.inventory.products, group: "Inventory" },
    { id: "inv-warehouses", label: "Warehouses", icon: Warehouse, href: ROUTES.inventory.warehouses, group: "Inventory" },
    { id: "inv-movement", label: "Stock Movement", icon: Truck, href: ROUTES.inventory.movement, group: "Inventory" },
    { id: "inv-suppliers", label: "Suppliers", icon: Building2, href: ROUTES.inventory.suppliers, group: "Inventory" },
    // Sales sub-pages
    { id: "sales-invoices", label: "Invoices", icon: FileText, href: ROUTES.sales.invoices, group: "Sales" },
    { id: "sales-leads", label: "Leads", icon: Users, href: ROUTES.sales.leads, group: "Sales" },
    // Quick actions
    { id: "new-sale", label: "New Sale Entry", icon: Plus, href: ROUTES.sales.entry, group: "Quick Actions", keywords: ["add", "create", "new"] },
  ];

  const groups = [...new Set(ITEMS.map((i) => i.group))];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[500] bg-black/50 backdrop-blur-sm"
            onClick={close}
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-[15%] z-[501] w-full max-w-lg -translate-x-1/2"
          >
            <Command
              className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
              loop
            >
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  placeholder="Search pages, actions, contacts..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[400px] overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                {groups.map((group) => {
                  const groupItems = ITEMS.filter((i) => i.group === group);
                  return (
                    <Command.Group key={group} heading={group} className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground">
                      {groupItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Command.Item
                            key={item.id}
                            value={`${item.label} ${item.keywords?.join(" ") ?? ""} ${item.group}`}
                            onSelect={() => item.href ? navigate(item.href) : item.action?.()}
                            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-muted data-[selected=true]:bg-muted"
                          >
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted">
                              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                            <span className="flex-1">{item.label}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-aria-selected:opacity-100" />
                          </Command.Item>
                        );
                      })}
                    </Command.Group>
                  );
                })}
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
