import type { MetricCard, RevenueData, SalesData, GeographyData } from "@/types/analytics";

export const MOCK_METRICS: MetricCard[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: 12847000,
    previousValue: 10920000,
    change: 17.6,
    changeType: "increase",
    prefix: "$",
    description: "YTD total revenue",
    trend: [
      { date: "2026-01", value: 1800000 },
      { date: "2026-02", value: 2100000 },
      { date: "2026-03", value: 1950000 },
      { date: "2026-04", value: 2300000 },
      { date: "2026-05", value: 2697000 },
    ],
  },
  {
    id: "orders",
    label: "Active Orders",
    value: 284,
    previousValue: 231,
    change: 22.9,
    changeType: "increase",
    description: "Current open orders",
    trend: [
      { date: "2026-01", value: 210 },
      { date: "2026-02", value: 235 },
      { date: "2026-03", value: 248 },
      { date: "2026-04", value: 261 },
      { date: "2026-05", value: 284 },
    ],
  },
  {
    id: "customers",
    label: "Enterprise Clients",
    value: 147,
    previousValue: 132,
    change: 11.4,
    changeType: "increase",
    description: "Active enterprise accounts",
  },
  {
    id: "inventory",
    label: "Inventory Value",
    value: 8320000,
    previousValue: 8750000,
    change: -4.9,
    changeType: "decrease",
    prefix: "$",
    description: "Total stock valuation",
  },
  {
    id: "production",
    label: "Production Efficiency",
    value: 94.2,
    previousValue: 91.8,
    change: 2.6,
    changeType: "increase",
    unit: "%",
    description: "OEE this month",
  },
  {
    id: "uptime",
    label: "Plant Uptime",
    value: 98.7,
    previousValue: 97.3,
    change: 1.4,
    changeType: "increase",
    unit: "%",
    description: "Avg equipment availability",
  },
];

export const MOCK_REVENUE_DATA: RevenueData[] = [
  { date: "Jan", revenue: 1800000, cost: 1200000, profit: 600000, orders: 42 },
  { date: "Feb", revenue: 2100000, cost: 1380000, profit: 720000, orders: 51 },
  { date: "Mar", revenue: 1950000, cost: 1260000, profit: 690000, orders: 47 },
  { date: "Apr", revenue: 2300000, cost: 1450000, profit: 850000, orders: 58 },
  { date: "May", revenue: 2697000, cost: 1620000, profit: 1077000, orders: 67 },
  { date: "Jun", revenue: 2450000, cost: 1510000, profit: 940000, orders: 61 },
  { date: "Jul", revenue: 2680000, cost: 1580000, profit: 1100000, orders: 65 },
  { date: "Aug", revenue: 2890000, cost: 1700000, profit: 1190000, orders: 72 },
  { date: "Sep", revenue: 2720000, cost: 1620000, profit: 1100000, orders: 68 },
  { date: "Oct", revenue: 3100000, cost: 1850000, profit: 1250000, orders: 78 },
  { date: "Nov", revenue: 3350000, cost: 1970000, profit: 1380000, orders: 84 },
  { date: "Dec", revenue: 3600000, cost: 2100000, profit: 1500000, orders: 90 },
];

export const MOCK_SALES_DATA: SalesData[] = [
  { date: "Jan", sales: 1800000, target: 1700000, lastYear: 1500000 },
  { date: "Feb", sales: 2100000, target: 2000000, lastYear: 1750000 },
  { date: "Mar", sales: 1950000, target: 2100000, lastYear: 1620000 },
  { date: "Apr", sales: 2300000, target: 2200000, lastYear: 1900000 },
  { date: "May", sales: 2697000, target: 2400000, lastYear: 2100000 },
  { date: "Jun", sales: 2450000, target: 2500000, lastYear: 2200000 },
];

export const MOCK_CATEGORY_DATA = [
  { label: "Structural Steel", value: 38, color: "#F76C46" },
  { label: "Raw Materials", value: 24, color: "#3D55FD" },
  { label: "Alloys", value: 18, color: "#C6AF88" },
  { label: "Machinery", value: 12, color: "#85A1C5" },
  { label: "Fasteners", value: 8, color: "#E9E778" },
];

export const MOCK_GEOGRAPHY_DATA: GeographyData[] = [
  { country: "United States", countryCode: "US", value: 4850000, percentage: 37.8 },
  { country: "Germany", countryCode: "DE", value: 2100000, percentage: 16.3 },
  { country: "Japan", countryCode: "JP", value: 1650000, percentage: 12.8 },
  { country: "Canada", countryCode: "CA", value: 1200000, percentage: 9.3 },
  { country: "Brazil", countryCode: "BR", value: 980000, percentage: 7.6 },
  { country: "Others", countryCode: "XX", value: 2067000, percentage: 16.2 },
];
