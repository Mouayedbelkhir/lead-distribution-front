"use client";

import { usePathname } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/actions/uiActions";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROLES } from "@/constants/roles";

const pageTitles = {
  "/dashboard": { title: "Dashboard", subtitle: "Overview of your lead distribution system" },
  "/dashboard/leads": { title: "Leads", subtitle: "Manage incoming leads" },
  "/dashboard/clients": { title: "Clients", subtitle: "Manage your clients" },
  "/dashboard/verticals": { title: "Verticals", subtitle: "Manage business verticals" },
  "/dashboard/deliveries": { title: "Deliveries", subtitle: "Track lead deliveries" },
};

function getInitials(email) {
  if (!email) return "?";
  const name = email.split("@")[0];
  return name.slice(0, 2).toUpperCase();
}

function getRoleClass(role) {
  if (role === ROLES.ADMIN) return "admin";
  if (role === ROLES.MANAGER) return "manager";
  return "user";
}

export function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user, logout } = useAuth();

  const pageInfo = pageTitles[pathname] || { title: "Dashboard", subtitle: "" };

  return (
    <nav className="navbar-dashboard">
      <div className="navbar-left">
        <button
          className="navbar-toggle d-lg-none"
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>
        <span className="navbar-page-title">{pageInfo.title}</span>
      </div>

      <div className="navbar-right">
        <div className="navbar-user">
          <div className="navbar-avatar">{getInitials(user?.email)}</div>
          <div className="navbar-user-info">
            <span className="navbar-user-email">{user?.email}</span>
            <span className={`role-badge ${getRoleClass(user?.role)}`}>{user?.role}</span>
          </div>
        </div>
        <button className="navbar-logout" onClick={logout} aria-label="Logout">
          <LogOut size={16} />
          <span className="d-none d-sm-inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}
