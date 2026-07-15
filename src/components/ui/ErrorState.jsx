"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ErrorState({
  message = "Something went wrong",
  onRetry,
}) {
  return (
    <div className="error-state">
      <div className="error-state-icon">
        <AlertCircle size={32} />
      </div>
      <h4 className="error-state-title">Oops!</h4>
      <p className="error-state-description">{message}</p>
      {onRetry && (
        <Button variant="outline-primary" size="sm" icon={RefreshCw} onClick={onRetry} className="mt-3">
          Retry
        </Button>
      )}
    </div>
  );
}
