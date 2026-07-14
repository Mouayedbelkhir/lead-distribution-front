import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { DashboardShell } from "@/components/client/DashboardShell";
import { DashboardHome } from "@/features/dashboard/components/DashboardHome";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <DashboardHome />
      </DashboardShell>
    </AuthGuard>
  );
}
