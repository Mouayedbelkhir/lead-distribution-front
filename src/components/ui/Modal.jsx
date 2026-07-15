"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({ open, onClose, title, children, footer, size = "md" }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const sizeClass =
    size === "sm" ? "modal-dialog-sm" :
    size === "wide" ? "modal-dialog-wide" : "";

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className={`modal-dialog-custom ${sizeClass}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : "Dialog"}
      >
        <div className="modal-header-custom">
          <h3 className="modal-title-custom">{title}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>
        {children}
        {footer && <div className="modal-footer-custom">{footer}</div>}
      </div>
    </div>
  );
}
