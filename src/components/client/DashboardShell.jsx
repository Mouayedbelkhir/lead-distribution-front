"use client";

import { useAppSelector } from "@/store/hooks";
import { Sidebar } from "@/components/client/Sidebar";
import { Navbar } from "@/components/client/Navbar";

export function DashboardShell({ children }) {
  const sidebarCollapsed = useAppSelector((s) => s.ui.sidebarCollapsed);

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className={`dashboard-body ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <Navbar />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
