import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { DashboardShell } from "@/components/client/DashboardShell";

export default function ClientsPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <div className="page-header">
          <div>
            <h1 className="page-title">Clients</h1>
            <p className="page-description">Manage your clients</p>
          </div>
        </div>
        <div className="card-custom">
          <div className="card-custom-body">
            <p className="text-muted text-center py-4 mb-0">
              Client management will be available here.
            </p>
          </div>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
