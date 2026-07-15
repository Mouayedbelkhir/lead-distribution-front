"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ConfirmDialog({
  open,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
  loadingLabel = "Deleting...",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onCancel} role="presentation">
      <div
        className="modal-dialog-custom modal-dialog-sm"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <div className="modal-body-custom text-center">
          <div className={`confirm-icon ${variant}`}>
            <AlertTriangle size={28} />
          </div>
          <h3 className="confirm-title" id="confirm-title">{title}</h3>
          <p className="confirm-message" id="confirm-message">{message}</p>
        </div>
        <div className="modal-footer-custom">
          <Button variant="outline-secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm} loading={loading} disabled={loading}>
            {loading ? loadingLabel : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
