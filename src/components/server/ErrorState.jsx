import { AlertCircle } from "lucide-react";

export function ErrorState({ message = "Something went wrong" }) {
  return (
    <div className="error-state">
      <AlertCircle size={40} className="text-danger mb-2" />
      <span className="text-muted">{message}</span>
    </div>
  );
}
