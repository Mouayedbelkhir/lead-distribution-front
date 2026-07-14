import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { DashboardShell } from "@/components/client/DashboardShell";
import { ClientsList } from "@/features/clients/components/ClientsList";

export default function ClientsPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <ClientsList />
      </DashboardShell>
    </AuthGuard>
  );
}
