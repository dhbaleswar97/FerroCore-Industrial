export interface MetricCard {
  id: string;
  label: string;
  value: number | string;
  previousValue?: number | string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  unit?: string;
  prefix?: string;
  icon?: string;
  description?: string;
  trend?: TrendPoint[];
}

export interface TrendPoint {
  date: string;
  value: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  [key: string]: string | number | undefined;
}

export interface TimeSeriesData {
  date: string;
  [metric: string]: string | number;
}

export interface RevenueData extends TimeSeriesData {
  revenue: number;
  cost: number;
  profit: number;
  orders: number;
}

export interface SalesData extends TimeSeriesData {
  sales: number;
  target: number;
  lastYear: number;
}

export interface DashboardMetrics {
  revenue: MetricCard;
  orders: MetricCard;
  customers: MetricCard;
  inventory: MetricCard;
  production: MetricCard;
  efficiency: MetricCard;
}

export interface ProductionMetrics {
  throughput: number;
  efficiency: number;
  defectRate: number;
  uptime: number;
  plannedDowntime: number;
  unplannedDowntime: number;
}

export interface GeographyData {
  country: string;
  countryCode: string;
  value: number;
  percentage: number;
}
