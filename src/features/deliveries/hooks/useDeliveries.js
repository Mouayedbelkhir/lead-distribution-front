"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deliveryKeys } from "@/constants/query-keys";
import {
  getDeliveries,
  createDelivery,
  updateDelivery,
  deleteDelivery,
} from "@/features/deliveries/services/deliveryService";

export function useDeliveries() {
  return useQuery({
    queryKey: deliveryKeys.lists,
    queryFn: getDeliveries,
  });
}

export function useCreateDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDelivery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deliveryKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useUpdateDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateDelivery(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: deliveryKeys.all });
      queryClient.invalidateQueries({ queryKey: deliveryKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}

export function useDeleteDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDelivery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deliveryKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}
