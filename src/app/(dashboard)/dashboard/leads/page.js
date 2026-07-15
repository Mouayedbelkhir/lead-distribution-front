import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { DashboardShell } from "@/components/client/DashboardShell";
import { LeadsList } from "@/features/leads/components/LeadsList";

export default function LeadsPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <LeadsList />
      </DashboardShell>
    </AuthGuard>
  );
}
