"use client";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { leadKeys } from "@/constants/query-keys";
import { getLeads, createLead, simulateLead } from "@/features/leads/services/leadService";

export function useLeads(params = {}) {
  return useQuery({
    queryKey: leadKeys.list(params),
    queryFn: () => getLeads(params),
    placeholderData: keepPreviousData,
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useSimulateLead() {
  return useMutation({
    mutationFn: simulateLead,
  });
}
