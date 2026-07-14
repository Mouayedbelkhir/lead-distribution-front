import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { DashboardShell } from "@/components/client/DashboardShell";
import { DeliveriesList } from "@/features/deliveries/components/DeliveriesList";

export default function DeliveriesPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <DeliveriesList />
      </DashboardShell>
    </AuthGuard>
  );
}
