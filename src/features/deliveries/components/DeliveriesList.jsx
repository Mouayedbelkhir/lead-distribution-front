"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Truck,
  Clock,
  MapPin,
} from "lucide-react";
import { useDeliveries, useDeleteDelivery } from "@/features/deliveries/hooks/useDeliveries";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROLES } from "@/constants/roles";
import { Loader } from "@/components/server/Loader";
import { ErrorState } from "@/components/server/ErrorState";
import { EmptyState } from "@/components/server/EmptyState";
import { DeliveryFormModal } from "@/features/deliveries/components/DeliveryFormModal";
import { ConfirmDialog } from "@/components/client/ConfirmDialog";
import { formatDate } from "@/utils/format";
import toast from "react-hot-toast";

export function DeliveriesList() {
  const { data: deliveries, isLoading, isError, refetch } = useDeliveries();
  const deleteDelivery = useDeleteDelivery();
  const { user } = useAuth();
  const isAdmin = user?.role === ROLES.ADMIN;

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    if (!deliveries) return [];
    const q = search.toLowerCase().trim();
    if (!q) return deliveries;
    return deliveries.filter(
      (d) =>
        d.client?.name?.toLowerCase().includes(q) ||
        d.vertical?.name?.toLowerCase().includes(q)
    );
  }, [deliveries, search]);

  const handleOpenCreate = () => {
    setEditingDelivery(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (delivery) => {
    setEditingDelivery(delivery);
    setModalOpen(true);
  };

  const handleDelete = (delivery) => {
    setDeleteTarget(delivery);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteDelivery.mutateAsync(deleteTarget.id);
      toast.success("Delivery deleted successfully");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete delivery");
    }
  };

  if (isLoading) return <Loader label="Loading deliveries..." />;
  if (isError) {
    return (
      <>
        <ErrorState message="Failed to load deliveries." />
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
          <h1 className="page-title">Deliveries</h1>
          <p className="page-description">Manage lead delivery configurations</p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary btn-sm" onClick={handleOpenCreate}>
            <Plus size={16} className="me-1" />
            Add Delivery
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
              placeholder="Search by client or vertical..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="card-custom-body p-0">
          {filtered.length === 0 ? (
            <EmptyState message={search ? "No deliveries match your search." : "No deliveries yet."} />
          ) : (
            <div className="table-responsive">
              <table className="table data-table mb-0">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Vertical</th>
                    <th>Age Range</th>
                    <th>Capacity</th>
                    <th>Price</th>
                    <th>Postal Codes</th>
                    <th>Time Slots</th>
                    <th>Leads</th>
                    {isAdmin && <th className="text-end">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((delivery) => (
                    <tr key={delivery.id}>
                      <td>
                        <div className="cell-with-icon">
                          <Truck size={16} className="text-muted" />
                          <span className="fw-medium">{delivery.client?.name || "—"}</span>
                        </div>
                      </td>
                      <td>{delivery.vertical?.name || "—"}</td>
                      <td>{delivery.minAge}–{delivery.maxAge}</td>
                      <td>{delivery.capacity}</td>
                      <td>{Number(delivery.price).toFixed(2)} €</td>
                      <td>
                        <div className="badge-list">
                          {delivery.postalCodes?.map((p, i) => (
                            <span key={i} className="badge-item">
                              <MapPin size={11} />
                              {p.postalCode}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="badge-list">
                          {delivery.timeSlots?.map((t, i) => (
                            <span key={i} className="badge-item badge-item-time">
                              <Clock size={11} />
                              {t.startTime}–{t.endTime}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>{delivery.leadsCount ?? 0}</td>
                      {isAdmin && (
                        <td>
                          <div className="table-actions">
                            <button
                              className="btn-icon"
                              onClick={() => handleOpenEdit(delivery)}
                              title="Edit"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className="btn-icon danger"
                              onClick={() => handleDelete(delivery)}
                              title="Delete"
                              disabled={deleteDelivery.isPending}
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
        <DeliveryFormModal
          key={editingDelivery ? `edit-${editingDelivery.id}` : "create"}
          delivery={editingDelivery}
          onClose={() => setModalOpen(false)}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Delivery"
        message={`Are you sure you want to delete the delivery for "${deleteTarget?.client?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleteDelivery.isPending}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
