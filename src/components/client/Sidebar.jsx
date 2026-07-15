"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Target,
  Truck,
  ChevronLeft,
  Layers,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleSidebarCollapse, toggleSidebar } from "@/store/actions/uiActions";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/leads", label: "Leads", icon: FileText },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  { href: "/dashboard/verticals", label: "Verticals", icon: Target },
  { href: "/dashboard/deliveries", label: "Deliveries", icon: Truck },
];

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);
  const sidebarCollapsed = useAppSelector((s) => s.ui.sidebarCollapsed);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 992;

  const handleToggle = () => {
    if (isMobile) {
      dispatch(toggleSidebar());
    } else {
      dispatch(toggleSidebarCollapse());
    }
  };

  const isActive = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay show d-lg-none"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}
      <aside
        className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${sidebarOpen ? "open" : ""}`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo-icon">
            <Layers size={20} />
          </div>
          <span className="sidebar-logo-text">LeadFlow</span>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Main</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive(item.href) ? "active" : ""}`}
                onClick={() => {
                  if (isMobile) dispatch(toggleSidebar());
                }}
              >
                <Icon size={20} />
                <span className="sidebar-link-text">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-collapse-btn" onClick={handleToggle} aria-label="Toggle sidebar">
            <ChevronLeft size={18} className="chevron-icon" />
            <span className="sidebar-link-text">Collapse</span>
          </button>
        </div>
      </aside>
    </>
  );
}
