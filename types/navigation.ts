import type { LucideIcon } from "lucide-react";
import type { UserRole } from "./auth";

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: LucideIcon;
  badge?: string | number;
  badgeVariant?: "default" | "destructive" | "outline" | "secondary";
  children?: NavItem[];
  isActive?: boolean;
  requiredRole?: UserRole[];
  isExternal?: boolean;
  isNew?: boolean;
}

export interface NavSection {
  id: string;
  label?: string;
  items: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageMeta {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}
