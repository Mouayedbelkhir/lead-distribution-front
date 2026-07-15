"use client";

import { forwardRef } from "react";

export const Select = forwardRef(function Select(
  { label, required, error, id, children, className = "", ...props },
  ref
) {
  const selectId = id || props.name;
  const classes = [
    "form-select",
    error ? "is-invalid" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className="form-field">
      {label && (
        <label className="form-label" htmlFor={selectId}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <select id={selectId} ref={ref} className={classes} {...props}>
        {children}
      </select>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
});
