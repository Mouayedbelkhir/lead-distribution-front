"use client";

import { forwardRef } from "react";

export const Input = forwardRef(function Input(
  { label, required, error, icon: Icon, id, className = "", ...props },
  ref
) {
  const inputId = id || props.name;
  const classes = [
    "form-control",
    error ? "is-invalid" : "",
    Icon ? "has-icon" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className="form-field">
      {label && (
        <label className="form-label" htmlFor={inputId}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="form-field-control">
        {Icon && <Icon size={16} className="form-field-icon" />}
        <input id={inputId} ref={ref} className={classes} {...props} />
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
});
