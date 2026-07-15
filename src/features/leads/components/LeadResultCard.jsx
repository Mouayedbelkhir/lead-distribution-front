"use client";

import { CheckCircle2, XCircle, Building2, Truck, Euro, Calendar } from "lucide-react";
import { formatCurrency, formatDateTime } from "@/utils/format";

export function LeadResultCard({ result }) {
  if (!result) return null;

  const isDistributed = result.status === "DISTRIBUTED";

  return (
    <div className={`lead-result-card ${isDistributed ? "lead-result-success" : "lead-result-fail"}`}>
      <div className="lead-result-header">
        {isDistributed ? (
          <CheckCircle2 size={24} className="lead-result-icon-success" />
        ) : (
          <XCircle size={24} className="lead-result-icon-fail" />
        )}
        <h4 className="lead-result-title">
          {isDistributed ? "Lead Distributed" : "No Eligible Delivery Found"}
        </h4>
      </div>

      {isDistributed ? (
        <div className="lead-result-body">
          <div className="lead-result-row">
            <Building2 size={16} className="text-muted" />
            <span className="lead-result-label">Client:</span>
            <span className="lead-result-value">
              {result.delivery?.client?.name}
              {result.delivery?.client?.company ? ` (${result.delivery.client.company})` : ""}
            </span>
          </div>
          <div className="lead-result-row">
            <Truck size={16} className="text-muted" />
            <span className="lead-result-label">Delivery ID:</span>
            <span className="lead-result-value">#{result.delivery?.id}</span>
          </div>
          <div className="lead-result-row">
            <Euro size={16} className="text-muted" />
            <span className="lead-result-label">Price:</span>
            <span className="lead-result-value">{formatCurrency(result.pricePaid)}</span>
          </div>
          <div className="lead-result-row">
            <Calendar size={16} className="text-muted" />
            <span className="lead-result-label">Distributed at:</span>
            <span className="lead-result-value">{formatDateTime(result.distributedAt)}</span>
          </div>
        </div>
      ) : (
        <p className="lead-result-message">
          No delivery matched this lead&apos;s criteria (age, postal code, vertical, capacity, or time slot).
        </p>
      )}
    </div>
  );
}
