"use client";

import { useState, useMemo } from "react";
import { Plus, Building2, Users } from "lucide-react";
import { useClients, useDeleteClient } from "@/features/clients/hooks/useClients";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROLES } from "@/constants/roles";
import {
  PageHeader, Button, SearchInput, Card, CardHeader, CardBody,
  LoadingSpinner, ErrorState, EmptyState, ActionButtons, ConfirmDialog, StatusPill,
} from "@/components/ui";
import { ClientFormModal } from "@/features/clients/components/ClientFormModal";
import { formatDate } from "@/utils/format";
import toast from "react-hot-toast";

export function ClientsList() {
  const { data: clients, isLoading, isError, refetch } = useClients();
  const deleteClient = useDeleteClient();
  const { user } = useAuth();
  const isAdmin = user?.role === ROLES.ADMIN;

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    if (!clients) return [];
    const q = search.toLowerCase().trim();
    if (!q) return clients;
    return clients.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.company?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q)
    );
  }, [clients, search]);

  const handleOpenCreate = () => {
    setEditingClient(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (client) => {
    setEditingClient(client);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteClient.mutateAsync(deleteTarget.id);
      toast.success("Client deleted successfully");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete client");
    }
  };

  if (isLoading) return <LoadingSpinner label="Loading clients..." />;
  if (isError) return <ErrorState message="Failed to load clients." onRetry={() => refetch()} />;

  return (
    <>
      <PageHeader
        title="Clients"
        description="Manage your clients"
        action={isAdmin && <Button icon={Plus} size="sm" onClick={handleOpenCreate}>Add Client</Button>}
      />

      <Card>
        <CardHeader>
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name, company, or email..." />
        </CardHeader>
        <CardBody className="p-0">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Users}
              title={search ? "No clients match your search" : "No clients yet"}
              description={search ? "Try a different search term." : "Get started by adding your first client."}
            />
          ) : (
            <div className="table-responsive">
              <table className="table data-table mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Deliveries</th>
                    <th>Status</th>
                    <th>Created</th>
                    {isAdmin && <th className="text-end">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((client) => (
                    <tr key={client.id}>
                      <td>
                        <div className="cell-with-icon">
                          <Building2 size={16} className="text-muted" />
                          <span className="fw-medium">{client.name}</span>
                        </div>
                      </td>
                      <td>{client.company || "\u2014"}</td>
                      <td>{client.email || "\u2014"}</td>
                      <td>{client.deliveriesCount ?? 0}</td>
                      <td>
                        <StatusPill status={client.isActive ? "active" : "inactive"} />
                      </td>
                      <td>{formatDate(client.createdAt)}</td>
                      {isAdmin && (
                        <td>
                          <ActionButtons
                            onEdit={() => handleOpenEdit(client)}
                            onDelete={() => setDeleteTarget(client)}
                            deleteDisabled={deleteClient.isPending}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>

      {modalOpen && (
        <ClientFormModal
          key={editingClient ? `edit-${editingClient.id}` : "create"}
          client={editingClient}
          onClose={() => setModalOpen(false)}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Client"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleteClient.isPending}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
