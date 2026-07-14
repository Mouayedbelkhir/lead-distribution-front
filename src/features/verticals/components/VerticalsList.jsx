"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Layers,
} from "lucide-react";
import { useVerticals, useDeleteVertical } from "@/features/verticals/hooks/useVerticals";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROLES } from "@/constants/roles";
import { Loader } from "@/components/server/Loader";
import { ErrorState } from "@/components/server/ErrorState";
import { EmptyState } from "@/components/server/EmptyState";
import { VerticalFormModal } from "@/features/verticals/components/VerticalFormModal";
import { ConfirmDialog } from "@/components/client/ConfirmDialog";
import { formatDate } from "@/utils/format";
import toast from "react-hot-toast";

export function VerticalsList() {
  const { data: verticals, isLoading, isError, refetch } = useVerticals();
  const deleteVertical = useDeleteVertical();
  const { user } = useAuth();
  const isAdmin = user?.role === ROLES.ADMIN;

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVertical, setEditingVertical] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    if (!verticals) return [];
    const q = search.toLowerCase().trim();
    if (!q) return verticals;
    return verticals.filter((v) => v.name?.toLowerCase().includes(q));
  }, [verticals, search]);

  const handleOpenCreate = () => {
    setEditingVertical(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (vertical) => {
    setEditingVertical(vertical);
    setModalOpen(true);
  };

  const handleDelete = (vertical) => {
    setDeleteTarget(vertical);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteVertical.mutateAsync(deleteTarget.id);
      toast.success("Vertical deleted successfully");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete vertical");
    }
  };

  if (isLoading) return <Loader label="Loading verticals..." />;
  if (isError) {
    return (
      <>
        <ErrorState message="Failed to load verticals." />
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
          <h1 className="page-title">Verticals</h1>
          <p className="page-description">Manage business verticals</p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary btn-sm" onClick={handleOpenCreate}>
            <Plus size={16} className="me-1" />
            Add Vertical
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
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="card-custom-body p-0">
          {filtered.length === 0 ? (
            <EmptyState message={search ? "No verticals match your search." : "No verticals yet."} />
          ) : (
            <div className="table-responsive">
              <table className="table data-table mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Deliveries</th>
                    <th>Created</th>
                    {isAdmin && <th className="text-end">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((vertical) => (
                    <tr key={vertical.id}>
                      <td>
                        <div className="cell-with-icon">
                          <Layers size={16} className="text-muted" />
                          <span className="fw-medium">{vertical.name}</span>
                        </div>
                      </td>
                      <td>{vertical.deliveriesCount ?? 0}</td>
                      <td>{formatDate(vertical.createdAt)}</td>
                      {isAdmin && (
                        <td>
                          <div className="table-actions">
                            <button
                              className="btn-icon"
                              onClick={() => handleOpenEdit(vertical)}
                              title="Edit"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className="btn-icon danger"
                              onClick={() => handleDelete(vertical)}
                              title="Delete"
                              disabled={deleteVertical.isPending}
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
        <VerticalFormModal
          key={editingVertical ? `edit-${editingVertical.id}` : "create"}
          vertical={editingVertical}
          onClose={() => setModalOpen(false)}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Vertical"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleteVertical.isPending}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
