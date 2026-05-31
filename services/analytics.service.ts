import {
  MOCK_METRICS,
  MOCK_REVENUE_DATA,
  MOCK_SALES_DATA,
  MOCK_CATEGORY_DATA,
  MOCK_GEOGRAPHY_DATA,
} from "@/data/mock-analytics";
import type {
  MetricCard,
  RevenueData,
  SalesData,
  ChartDataPoint,
  GeographyData,
} from "@/types/analytics";
import { sleep } from "@/lib/utils";

export const analyticsService = {
  async getMetrics(): Promise<MetricCard[]> {
    await sleep(400);
    return MOCK_METRICS;
  },

  async getRevenueData(period?: "6m" | "12m"): Promise<RevenueData[]> {
    await sleep(350);
    return period === "6m"
      ? MOCK_REVENUE_DATA.slice(-6)
      : MOCK_REVENUE_DATA;
  },

  async getSalesData(): Promise<SalesData[]> {
    await sleep(300);
    return MOCK_SALES_DATA;
  },

  async getCategoryData(): Promise<ChartDataPoint[]> {
    await sleep(250);
    return MOCK_CATEGORY_DATA;
  },

  async getGeographyData(): Promise<GeographyData[]> {
    await sleep(300);
    return MOCK_GEOGRAPHY_DATA;
  },
};
