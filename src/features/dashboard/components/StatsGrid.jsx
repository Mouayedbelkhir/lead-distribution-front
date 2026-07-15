"use client";

import {
  Users,
  Target,
  Truck,
  FileText,
  CheckCircle2,
  XCircle,
  CalendarCheck,
  Euro,
} from "lucide-react";
import { StatCard } from "@/components/ui";
import { formatCurrency } from "@/utils/format";

export function StatsGrid({ data }) {
  const cards = [
    { title: "Total Clients", value: data.clients ?? 0, icon: Users, color: "indigo" },
    { title: "Verticals", value: data.verticals ?? 0, icon: Target, color: "amber" },
    { title: "Deliveries", value: data.deliveries ?? 0, icon: Truck, color: "blue" },
    { title: "Total Leads", value: data.leads ?? 0, icon: FileText, color: "indigo" },
    { title: "Distributed Leads", value: data.distributedLeads ?? 0, icon: CheckCircle2, color: "green" },
    { title: "Non Distributed", value: data.notDistributedLeads ?? 0, icon: XCircle, color: "amber" },
    { title: "Today's Distributed", value: data.todayDistributed ?? 0, icon: CalendarCheck, color: "green" },
    { title: "Total Revenue", value: formatCurrency(data.totalRevenue), icon: Euro, color: "blue" },
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className="col-6 col-md-4 col-xl-3">
            <StatCard
              icon={Icon}
              title={card.title}
              value={card.value}
              color={card.color}
            />
          </div>
        );
      })}
    </div>
  );
}
