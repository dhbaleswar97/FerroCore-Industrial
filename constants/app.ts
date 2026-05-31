export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "FerroCore Industrial",
  version: process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api",
  defaultLocale: "en",
  defaultTimezone: "UTC",
  dateFormat: "MMM dd, yyyy",
  dateTimeFormat: "MMM dd, yyyy HH:mm",
  currency: "USD",
  currencySymbol: "$",
} as const;

export const PAGINATION = {
  defaultPageSize: 20,
  pageSizeOptions: [10, 20, 50, 100],
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1400,
} as const;

export const ANIMATION_DURATION = {
  instant: 80,
  fast: 150,
  normal: 250,
  slow: 400,
  slower: 600,
  page: 800,
} as const;

export const STORAGE_KEYS = {
  theme: "ferrocore-theme",
  sidebarCollapsed: "ferrocore-sidebar",
  userPreferences: "ferrocore-prefs",
  recentSearch: "ferrocore-search",
} as const;

export const ROUTES = {
  home: "/home",
  about: "/about",
  products: "/products",
  solutions: "/solutions",
  contact: "/contact",
  login: "/auth/login",
  register: "/auth/register",
  forgotPassword: "/auth/forgot-password",
  dashboard: "/dashboard",
  sales: {
    root: "/dashboard/sales",
    entry: "/dashboard/sales/entry",
    invoices: "/dashboard/sales/invoices",
    leads: "/dashboard/sales/leads",
  },
  crm: {
    root: "/dashboard/crm",
    contacts: "/dashboard/crm/contacts",
    companies: "/dashboard/crm/companies",
    deals: "/dashboard/crm/deals",
    activities: "/dashboard/crm/activities",
  },
  inventory: {
    root: "/dashboard/inventory",
    products: "/dashboard/inventory/products",
    warehouses: "/dashboard/inventory/warehouses",
    movement: "/dashboard/inventory/movement",
    activity: "/dashboard/inventory/activity",
    suppliers: "/dashboard/inventory/suppliers",
  },
  productCatalog: "/dashboard/products",
  analytics: {
    root: "/dashboard/analytics",
  },
  reports: "/dashboard/reports",
  settings: {
    root: "/dashboard/settings",
  },
} as const;
