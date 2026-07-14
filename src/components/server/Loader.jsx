import { Loader2 } from "lucide-react";

export function Loader({ label = "Loading..." }) {
  return (
    <div className="loader">
      <Loader2 size={32} className="text-primary mb-2" style={{ animation: "spin 1s linear infinite" }} />
      <span className="text-muted">{label}</span>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
