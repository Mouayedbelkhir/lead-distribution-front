import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { DashboardShell } from "@/components/client/DashboardShell";
import { VerticalsList } from "@/features/verticals/components/VerticalsList";

export default function VerticalsPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <VerticalsList />
      </DashboardShell>
    </AuthGuard>
  );
}
