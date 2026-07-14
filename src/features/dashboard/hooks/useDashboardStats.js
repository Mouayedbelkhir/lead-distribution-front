"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "@/constants/query-keys";
import { getStats } from "@/features/dashboard/services/dashboardService";

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats,
    queryFn: getStats,
    staleTime: 30 * 1000,
  });
}
