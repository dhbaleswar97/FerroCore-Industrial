import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Boxes,
  BarChart2,
  FileBarChart,
  Settings,
} from "lucide-react";
import type { NavSection } from "@/types/navigation";

export const DASHBOARD_NAV: NavSection[] = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    items: [
      {
        id: "sales",
        label: "Sales",
        href: "/dashboard/sales",
        icon: ShoppingCart,
        children: [
          { id: "sales-overview", label: "Overview", href: "/dashboard/sales" },
          { id: "sales-entry", label: "New Sale", href: "/dashboard/sales/entry" },
          { id: "sales-invoices", label: "Invoices", href: "/dashboard/sales/invoices" },
          { id: "sales-leads", label: "Leads", href: "/dashboard/sales/leads" },
        ],
      },
      {
        id: "crm",
        label: "CRM",
        href: "/dashboard/crm",
        icon: Users,
        children: [
          { id: "crm-contacts", label: "Contacts", href: "/dashboard/crm/contacts" },
          { id: "crm-companies", label: "Companies", href: "/dashboard/crm/companies" },
          { id: "crm-deals", label: "Deals", href: "/dashboard/crm/deals" },
          { id: "crm-activities", label: "Activities", href: "/dashboard/crm/activities" },
        ],
      },
      {
        id: "inventory",
        label: "Inventory",
        href: "/dashboard/inventory",
        icon: Package,
        children: [
          { id: "inv-products", label: "Products", href: "/dashboard/inventory/products" },
          { id: "inv-warehouses", label: "Warehouses", href: "/dashboard/inventory/warehouses" },
          { id: "inv-movement", label: "Movements", href: "/dashboard/inventory/movement" },
          { id: "inv-activity", label: "Activity Log", href: "/dashboard/inventory/activity" },
          { id: "inv-suppliers", label: "Suppliers", href: "/dashboard/inventory/suppliers" },
        ],
      },
      {
        id: "products",
        label: "Product Catalog",
        href: "/dashboard/products",
        icon: Boxes,
        isNew: true,
      },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    items: [
      {
        id: "analytics",
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart2,
      },
      {
        id: "reports",
        label: "Reports",
        href: "/dashboard/reports",
        icon: FileBarChart,
        isNew: true,
      },
    ],
  },
  {
    id: "system",
    label: "System",
    items: [
      {
        id: "settings",
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export const MARKETING_NAV = [
  { id: "about", label: "About", href: "/about" },
  { id: "products", label: "Products", href: "/products" },
  { id: "solutions", label: "Solutions", href: "/solutions" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

export const PRODUCT_CATEGORIES = [
  { id: "plant-machinery", label: "Plant Machinery" },
  { id: "iron-scrap", label: "Iron Scrap" },
  { id: "copper-scrap", label: "Copper Scrap" },
  { id: "aluminium-scrap", label: "Aluminium Scrap" },
  { id: "electrical-equipment", label: "Electrical Equipment" },
  { id: "sponge-iron", label: "Sponge Iron" },
  { id: "coal", label: "Coal" },
  { id: "pellets", label: "Pellets" },
  { id: "fines", label: "Fines" },
  { id: "oil-lubricants", label: "Oil & Lubricants" },
] as const;

export const INDUSTRIES = [
  { id: "steel-manufacturing", label: "Steel Manufacturing", description: "Integrated steel plants and mini-mills" },
  { id: "construction", label: "Construction & Infrastructure", description: "Commercial, residential and civil projects" },
  { id: "automotive", label: "Automotive", description: "OEMs, tier-1 and tier-2 suppliers" },
  { id: "energy", label: "Energy & Power", description: "Oil & gas, renewables and utilities" },
  { id: "aerospace", label: "Aerospace & Defense", description: "Precision alloys for critical applications" },
  { id: "shipbuilding", label: "Shipbuilding & Marine", description: "Structural steel and marine-grade alloys" },
] as const;
