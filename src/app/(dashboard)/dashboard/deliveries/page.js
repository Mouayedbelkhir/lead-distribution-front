import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { DashboardShell } from "@/components/client/DashboardShell";

export default function DeliveriesPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <div className="page-header">
          <div>
            <h1 className="page-title">Deliveries</h1>
            <p className="page-description">Track lead deliveries</p>
          </div>
        </div>
        <div className="card-custom">
          <div className="card-custom-body">
            <p className="text-muted text-center py-4 mb-0">
              Delivery tracking will be available here.
            </p>
          </div>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
