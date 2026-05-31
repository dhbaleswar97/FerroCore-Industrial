import { create } from "zustand";
import type { MetricCard } from "@/types/analytics";
import { MOCK_METRICS } from "@/data/mock-analytics";

interface DashboardState {
  metrics: MetricCard[];
  isLoadingMetrics: boolean;
  dateRange: { from: Date; to: Date };
  selectedPeriod: "7d" | "30d" | "90d" | "1y" | "custom";

  setMetrics: (metrics: MetricCard[]) => void;
  setIsLoadingMetrics: (loading: boolean) => void;
  setDateRange: (range: { from: Date; to: Date }) => void;
  setSelectedPeriod: (period: DashboardState["selectedPeriod"]) => void;
  fetchMetrics: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  metrics: MOCK_METRICS,
  isLoadingMetrics: false,
  dateRange: {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  },
  selectedPeriod: "30d",

  setMetrics: (metrics) => set({ metrics }),
  setIsLoadingMetrics: (loading) => set({ isLoadingMetrics: loading }),
  setDateRange: (range) => set({ dateRange: range }),
  setSelectedPeriod: (period) => set({ selectedPeriod: period }),

  fetchMetrics: async () => {
    set({ isLoadingMetrics: true });
    await new Promise((r) => setTimeout(r, 600));
    set({ metrics: MOCK_METRICS, isLoadingMetrics: false });
  },
}));
