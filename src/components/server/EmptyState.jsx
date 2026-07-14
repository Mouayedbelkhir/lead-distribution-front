import { Inbox } from "lucide-react";

export function EmptyState({ message = "No data available" }) {
  return (
    <div className="empty-state">
      <Inbox size={40} className="text-muted mb-2" />
      <span className="text-muted">{message}</span>
    </div>
  );
}
