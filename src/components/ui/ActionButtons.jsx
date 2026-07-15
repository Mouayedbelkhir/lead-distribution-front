"use client";

import { Pencil, Trash2 } from "lucide-react";

export function ActionButtons({ onEdit, onDelete, deleteDisabled = false, editTitle = "Edit", deleteTitle = "Delete" }) {
  return (
    <div className="table-actions">
      {onEdit && (
        <button className="btn-icon" onClick={onEdit} title={editTitle} aria-label={editTitle}>
          <Pencil size={16} />
        </button>
      )}
      {onDelete && (
        <button className="btn-icon danger" onClick={onDelete} title={deleteTitle} aria-label={deleteTitle} disabled={deleteDisabled}>
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
