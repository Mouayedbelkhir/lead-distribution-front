"use client";

import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={32} />
      </div>
      <h4 className="empty-state-title">{title}</h4>
      {description && <p className="empty-state-description">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction} className="mt-3">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
