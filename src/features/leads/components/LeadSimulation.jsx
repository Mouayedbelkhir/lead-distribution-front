"use client";

import { useState } from "react";
import { Sparkles, Trophy } from "lucide-react";
import { Modal, Button } from "@/components/ui";
import { useSimulateLead } from "@/features/leads/hooks/useLeads";
import { formatCurrency } from "@/utils/format";
import toast from "react-hot-toast";

export function LeadSimulation({ formData }) {
  const [results, setResults] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const simulateLead = useSimulateLead();

  const handleSimulate = async () => {
    if (!formData) return;

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate,
      postalCode: formData.postalCode,
      verticalId: Number(formData.verticalId),
    };

    if (!payload.firstName || !payload.lastName || !payload.birthDate || !payload.postalCode || !payload.verticalId) {
      toast.error("Please fill in all fields before simulating");
      return;
    }

    try {
      const eligible = await simulateLead.mutateAsync(payload);
      setResults(eligible);
      setIsOpen(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Simulation failed");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="outline-primary"
        size="sm"
        icon={Sparkles}
        onClick={handleSimulate}
        loading={simulateLead.isPending}
        disabled={simulateLead.isPending}
      >
        Simulate
      </Button>

      <Modal
        open={isOpen}
        onClose={handleClose}
        title={<><Trophy size={18} className="me-2" />Simulation Results</>}
        footer={<Button variant="outline-secondary" onClick={handleClose}>Close</Button>}
      >
        <div className="modal-body-custom">
          {results && results.length > 0 ? (
            <div className="simulation-list">
              {results.map((delivery, index) => (
                <div key={delivery.id} className="simulation-card">
                  <div className="simulation-rank">#{index + 1}</div>
                  <div className="simulation-info">
                    <div className="simulation-client">
                      {delivery.client?.name}
                      {delivery.client?.company ? ` \u2014 ${delivery.client.company}` : ""}
                    </div>
                    <div className="simulation-vertical">
                      {delivery.vertical?.name}
                    </div>
                    <div className="simulation-stats">
                      <span className="simulation-stat">
                        Price: <strong>{formatCurrency(delivery.price)}</strong>
                      </span>
                      <span className="simulation-stat">
                        Remaining capacity: <strong>{delivery.remainingCapacity}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center py-3 mb-0">
              No eligible deliveries found for this lead.
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}
