"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { verticalKeys } from "@/constants/query-keys";
import {
  getVerticals,
  createVertical,
  updateVertical,
  deleteVertical,
} from "@/features/verticals/services/verticalService";

export function useVerticals() {
  return useQuery({
    queryKey: verticalKeys.lists,
    queryFn: getVerticals,
  });
}

export function useCreateVertical() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVertical,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: verticalKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useUpdateVertical() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateVertical(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: verticalKeys.all });
      queryClient.invalidateQueries({ queryKey: verticalKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useDeleteVertical() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVertical,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: verticalKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}
