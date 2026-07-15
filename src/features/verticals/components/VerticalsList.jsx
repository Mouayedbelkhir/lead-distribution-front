"use client";

import { useState, useMemo } from "react";
import { Plus, Layers, Target } from "lucide-react";
import { useVerticals, useDeleteVertical } from "@/features/verticals/hooks/useVerticals";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROLES } from "@/constants/roles";
import {
  PageHeader, Button, SearchInput, Card, CardHeader, CardBody,
  LoadingSpinner, ErrorState, EmptyState, ActionButtons, ConfirmDialog,
} from "@/components/ui";
import { VerticalFormModal } from "@/features/verticals/components/VerticalFormModal";
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

  if (isLoading) return <LoadingSpinner label="Loading verticals..." />;
  if (isError) return <ErrorState message="Failed to load verticals." onRetry={() => refetch()} />;

  return (
    <>
      <PageHeader
        title="Verticals"
        description="Manage business verticals"
        action={isAdmin && <Button icon={Plus} size="sm" onClick={handleOpenCreate}>Add Vertical</Button>}
      />

      <Card>
        <CardHeader>
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name..." />
        </CardHeader>
        <CardBody className="p-0">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Target}
              title={search ? "No verticals match your search" : "No verticals yet"}
              description={search ? "Try a different search term." : "Get started by adding your first vertical."}
            />
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
                          <ActionButtons
                            onEdit={() => handleOpenEdit(vertical)}
                            onDelete={() => setDeleteTarget(vertical)}
                            deleteDisabled={deleteVertical.isPending}
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
