"use client";

import { useState, useMemo } from "react";
import { Plus, User, FileText } from "lucide-react";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { useVerticals } from "@/features/verticals/hooks/useVerticals";
import {
  PageHeader, Button, Card, CardHeader, CardBody,
  LoadingSpinner, ErrorState, EmptyState, Pagination, StatusPill,
} from "@/components/ui";
import { LeadForm } from "@/features/leads/components/LeadForm";
import { formatDate, formatCurrency } from "@/utils/format";

const PAGE_SIZE = 10;

export function LeadsList() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [verticalFilter, setVerticalFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { data: verticals } = useVerticals();

  const params = useMemo(() => {
    const p = { page, limit: PAGE_SIZE };
    if (statusFilter) p.status = statusFilter;
    if (verticalFilter) p.verticalId = verticalFilter;
    return p;
  }, [page, statusFilter, verticalFilter]);

  const { data, isLoading, isError, refetch } = useLeads(params);

  const leads = data?.data || [];
  const pagination = data?.pagination;

  const handleFilterChange = () => {
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || (pagination && newPage > pagination.totalPages)) return;
    setPage(newPage);
  };

  if (isLoading) return <LoadingSpinner label="Loading leads..." />;
  if (isError) return <ErrorState message="Failed to load leads." onRetry={() => refetch()} />;

  return (
    <>
      <PageHeader
        title="Leads"
        description="Create and track lead distributions"
        action={<Button icon={Plus} size="sm" onClick={() => setModalOpen(true)}>New Lead</Button>}
      />

      <Card>
        <CardHeader>
          <div className="lead-filters">
            <select
              className="form-select form-select-sm"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                handleFilterChange();
              }}
            >
              <option value="">All statuses</option>
              <option value="DISTRIBUTED">Distributed</option>
              <option value="NOT_DISTRIBUTED">Not distributed</option>
            </select>

            <select
              className="form-select form-select-sm"
              value={verticalFilter}
              onChange={(e) => {
                setVerticalFilter(e.target.value);
                handleFilterChange();
              }}
            >
              <option value="">All verticals</option>
              {verticals?.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>

        <CardBody className="p-0">
          {leads.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No leads found"
              description="Create a new lead to start distributing."
            />
          ) : (
            <div className="table-responsive">
              <table className="table data-table mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Vertical</th>
                    <th>Postal Code</th>
                    <th>Status</th>
                    <th>Assigned Client</th>
                    <th>Price Paid</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <div className="cell-with-icon">
                          <User size={16} className="text-muted" />
                          <span className="fw-medium">{lead.firstName} {lead.lastName}</span>
                        </div>
                      </td>
                      <td>{lead.vertical?.name || "\u2014"}</td>
                      <td>{lead.postalCode}</td>
                      <td>
                        <StatusPill status={lead.status} />
                      </td>
                      <td>
                        {lead.delivery?.client?.name || "\u2014"}
                      </td>
                      <td>
                        {lead.pricePaid != null ? formatCurrency(lead.pricePaid) : "\u2014"}
                      </td>
                      <td>{formatDate(lead.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>

        <Pagination
          page={pagination?.page || page}
          totalPages={pagination?.totalPages}
          total={pagination?.total}
          onPageChange={handlePageChange}
        />
      </Card>

      {modalOpen && <LeadForm onClose={() => setModalOpen(false)} />}
    </>
  );
}
