import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { DashboardShell } from "@/components/client/DashboardShell";

export default function LeadsPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <div className="page-header">
          <div>
            <h1 className="page-title">Leads</h1>
            <p className="page-description">Manage incoming leads</p>
          </div>
        </div>
        <div className="card-custom">
          <div className="card-custom-body">
            <p className="text-muted text-center py-4 mb-0">
              Lead management will be available here.
            </p>
          </div>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
