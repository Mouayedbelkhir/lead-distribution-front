import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { DashboardShell } from "@/components/client/DashboardShell";
import { DashboardOverview } from "@/features/dashboard/components/DashboardOverview";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <DashboardOverview />
      </DashboardShell>
    </AuthGuard>
  );
}
