"use client";

import { Badge } from "@/components/ui/Badge";

const statusMap = {
  DISTRIBUTED: { variant: "success", label: "Distributed" },
  NOT_DISTRIBUTED: { variant: "warning", label: "Not Distributed" },
  active: { variant: "success", label: "Active" },
  inactive: { variant: "danger", label: "Inactive" },
};

export function StatusPill({ status }) {
  const config = statusMap[status];
  if (!config) return <Badge variant="default">{status}</Badge>;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
