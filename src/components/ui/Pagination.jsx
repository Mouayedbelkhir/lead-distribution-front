"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ page, totalPages, total, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="pagination-bar">
      <button
        className="btn-icon"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="pagination-info" aria-live="polite">
        Page {page} of {totalPages} ({total} items)
      </span>
      <button
        className="btn-icon"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
