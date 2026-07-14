"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";
import { useClients, useDeleteClient } from "@/features/clients/hooks/useClients";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROLES } from "@/constants/roles";
import { Loader } from "@/components/server/Loader";
import { ErrorState } from "@/components/server/ErrorState";
import { EmptyState } from "@/components/server/EmptyState";
import { ClientFormModal } from "@/features/clients/components/ClientFormModal";
import { ConfirmDialog } from "@/components/client/ConfirmDialog";
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

  const handleDelete = (client) => {
    setDeleteTarget(client);
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

  if (isLoading) return <Loader label="Loading clients..." />;
  if (isError) {
    return (
      <>
        <ErrorState message="Failed to load clients." />
        <div className="text-center mt-3">
          <button className="btn btn-outline-primary btn-sm" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Clients</h1>
          <p className="page-description">Manage your clients</p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary btn-sm" onClick={handleOpenCreate}>
            <Plus size={16} className="me-1" />
            Add Client
          </button>
        )}
      </div>

      <div className="card-custom">
        <div className="card-custom-header">
          <div className="search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by name, company, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="card-custom-body p-0">
          {filtered.length === 0 ? (
            <EmptyState message={search ? "No clients match your search." : "No clients yet."} />
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
                      <td>{client.company || "—"}</td>
                      <td>{client.email || "—"}</td>
                      <td>{client.deliveriesCount ?? 0}</td>
                      <td>
                        <span className={`status-pill ${client.isActive ? "success" : "danger"}`}>
                          {client.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>{formatDate(client.createdAt)}</td>
                      {isAdmin && (
                        <td>
                          <div className="table-actions">
                            <button
                              className="btn-icon"
                              onClick={() => handleOpenEdit(client)}
                              title="Edit"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className="btn-icon danger"
                              onClick={() => handleDelete(client)}
                              title="Delete"
                              disabled={deleteClient.isPending}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

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
