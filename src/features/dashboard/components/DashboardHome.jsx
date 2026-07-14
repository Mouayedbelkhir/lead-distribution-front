"use client";

import { FileText, Users, Target, Truck, TrendingUp } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function DashboardHome() {
  const { user } = useAuth();

  const stats = [
    { label: "Total Leads", value: "—", icon: FileText, color: "indigo" },
    { label: "Active Clients", value: "—", icon: Users, color: "green" },
    { label: "Verticals", value: "—", icon: Target, color: "amber" },
    { label: "Deliveries", value: "—", icon: Truck, color: "blue" },
  ];

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

      <div className="row g-3 mb-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="col-12 col-sm-6 col-xl-3">
              <div className="stat-card">
                <div className="stat-card-top">
                  <div className={`stat-icon ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <div className="card-custom">
            <div className="card-custom-header">
              <h3 className="card-custom-title">Recent Leads</h3>
              <TrendingUp size={18} className="text-muted" />
            </div>
            <div className="card-custom-body">
              <p className="text-muted text-center py-4 mb-0">
                Lead data will appear here once the API is connected.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card-custom">
            <div className="card-custom-header">
              <h3 className="card-custom-title">Distribution Status</h3>
            </div>
            <div className="card-custom-body">
              <p className="text-muted text-center py-4 mb-0">
                Distribution metrics will appear here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
