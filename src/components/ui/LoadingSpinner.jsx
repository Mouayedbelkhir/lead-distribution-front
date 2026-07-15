"use client";

import { Loader2 } from "lucide-react";

export function LoadingSpinner({ label = "Loading...", size = 32 }) {
  return (
    <div className="loader">
      <Loader2 size={size} className="text-primary mb-2 loader-spin" />
      <span className="text-muted">{label}</span>
    </div>
  );
}
