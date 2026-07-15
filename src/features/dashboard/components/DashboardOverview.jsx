"use client";

import { TrendingUp, Gauge, Euro } from "lucide-react";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { PageHeader, LoadingSpinner, ErrorState, Card, CardHeader, CardTitle, CardBody } from "@/components/ui";
import { formatCurrency } from "@/utils/format";

function MetricRow({ icon: Icon, label, value, color }) {
  return (
    <div className="metric-row">
      <div className={`metric-icon ${color}`}>
        <Icon size={20} />
      </div>
      <div className="metric-info">
        <span className="metric-label">{label}</span>
        <span className="metric-value">{value}</span>
      </div>
    </div>
  );
}

export function DashboardOverview() {
  const { user } = useAuth();
  const { data, isLoading, isError, refetch } = useDashboardStats();

  const welcomeTitle = `Welcome back${user?.email ? `, ${user.email.split("@")[0]}` : ""}`;
  const welcomeDesc = "Here\u2019s what\u2019s happening with your lead distribution today.";

  if (isLoading) {
    return (
      <>
        <PageHeader title={welcomeTitle} description={welcomeDesc} />
        <LoadingSpinner label="Loading dashboard statistics..." />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <PageHeader title={welcomeTitle} description={welcomeDesc} />
        <ErrorState message="Failed to load dashboard statistics." onRetry={() => refetch()} />
      </>
    );
  }

  const stats = data || {};

  return (
    <>
      <PageHeader title={welcomeTitle} description={welcomeDesc} />

      <StatsGrid data={stats} />

      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <Card>
            <CardHeader>
              <CardTitle>Distribution Metrics</CardTitle>
              <TrendingUp size={18} className="text-muted" />
            </CardHeader>
            <CardBody>
              <div className="metrics-list">
                <MetricRow
                  icon={Gauge}
                  label="Distribution Rate"
                  value={`${(stats.distributionRate ?? 0).toFixed(1)}%`}
                  color="indigo"
                />
                <MetricRow
                  icon={TrendingUp}
                  label="Capacity Fill Rate"
                  value={`${(stats.capacityFillRate ?? 0).toFixed(1)}%`}
                  color="green"
                />
                <MetricRow
                  icon={Euro}
                  label="Average Price"
                  value={formatCurrency(stats.averagePrice)}
                  color="blue"
                />
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="col-12 col-lg-4">
          <Card>
            <CardHeader>
              <CardTitle>Capacity</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="metrics-list">
                <MetricRow
                  icon={TrendingUp}
                  label="Total Capacity"
                  value={stats.totalCapacity ?? 0}
                  color="blue"
                />
                <MetricRow
                  icon={TrendingUp}
                  label="Remaining Capacity"
                  value={stats.remainingCapacity ?? 0}
                  color="amber"
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
