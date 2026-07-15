"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Truck,
  Clock,
  MapPin,
} from "lucide-react";
import { useDeliveries, useDeleteDelivery } from "@/features/deliveries/hooks/useDeliveries";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROLES } from "@/constants/roles";
import {
  PageHeader, Button, SearchInput, Card, CardHeader, CardBody,
  LoadingSpinner, ErrorState, EmptyState, ActionButtons, ConfirmDialog,
} from "@/components/ui";
import { DeliveryFormModal } from "@/features/deliveries/components/DeliveryFormModal";
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

  if (isLoading) return <LoadingSpinner label="Loading deliveries..." />;
  if (isError) return <ErrorState message="Failed to load deliveries." onRetry={() => refetch()} />;

  return (
    <>
      <PageHeader
        title="Deliveries"
        description="Manage lead delivery configurations"
        action={isAdmin && <Button icon={Plus} size="sm" onClick={handleOpenCreate}>Add Delivery</Button>}
      />

      <Card>
        <CardHeader>
          <SearchInput value={search} onChange={setSearch} placeholder="Search by client or vertical..." />
        </CardHeader>
        <CardBody className="p-0">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Truck}
              title={search ? "No deliveries match your search" : "No deliveries yet"}
              description={search ? "Try a different search term." : "Get started by adding your first delivery."}
            />
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
                          <span className="fw-medium">{delivery.client?.name || "\u2014"}</span>
                        </div>
                      </td>
                      <td>{delivery.vertical?.name || "\u2014"}</td>
                      <td>{delivery.minAge}&ndash;{delivery.maxAge}</td>
                      <td>{delivery.capacity}</td>
                      <td>{Number(delivery.price).toFixed(2)} &euro;</td>
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
                              {t.startTime}&ndash;{t.endTime}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>{delivery.leadsCount ?? 0}</td>
                      {isAdmin && (
                        <td>
                          <ActionButtons
                            onEdit={() => handleOpenEdit(delivery)}
                            onDelete={() => setDeleteTarget(delivery)}
                            deleteDisabled={deleteDelivery.isPending}
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
