"use client";

import { TrendingUp, Gauge, Euro } from "lucide-react";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { Loader } from "@/components/server/Loader";
import { ErrorState } from "@/components/server/ErrorState";
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

  if (isLoading) {
    return (
      <>
        <div className="page-header">
          <div>
            <h1 className="page-title">
              Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}
            </h1>
            <p className="page-description">
              Here&apos;s what&apos;s happening with your lead distribution today.
            </p>
          </div>
        </div>
        <Loader label="Loading dashboard statistics..." />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="page-header">
          <div>
            <h1 className="page-title">
              Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}
            </h1>
            <p className="page-description">
              Here&apos;s what&apos;s happening with your lead distribution today.
            </p>
          </div>
        </div>
        <ErrorState message="Failed to load dashboard statistics." />
        <div className="text-center mt-3">
          <button className="btn btn-outline-primary btn-sm" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      </>
    );
  }

  const stats = data || {};

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}
          </h1>
          <p className="page-description">
            Here&apos;s what&apos;s happening with your lead distribution today.
          </p>
        </div>
      </div>

      <StatsGrid data={stats} />

      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <div className="card-custom">
            <div className="card-custom-header">
              <h3 className="card-custom-title">Distribution Metrics</h3>
              <TrendingUp size={18} className="text-muted" />
            </div>
            <div className="card-custom-body">
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
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card-custom">
            <div className="card-custom-header">
              <h3 className="card-custom-title">Capacity</h3>
            </div>
            <div className="card-custom-body">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
