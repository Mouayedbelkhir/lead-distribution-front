"use client";

import { Plus, Trash2 } from "lucide-react";

export function PostalCodeFields({ fields, register, append, remove, errors }) {
  return (
    <div className="auth-field">
      <label className="form-label">Postal Codes <span className="text-danger">*</span></label>
      {fields.map((field, index) => (
        <div key={field.id} className="dynamic-field-row">
          <input
            className={`form-control ${errors?.[index]?.postalCode ? "is-invalid" : ""}`}
            placeholder="e.g. 75001"
            {...register(`postalCodes.${index}.postalCode`, {
              required: "Postal code is required",
            })}
          />
          {fields.length > 1 && (
            <button
              type="button"
              className="btn-icon danger dynamic-remove-btn"
              onClick={() => remove(index)}
            >
              <Trash2 size={16} />
            </button>
          )}
          {errors?.[index]?.postalCode && (
            <div className="invalid-feedback d-block">
              {errors[index].postalCode.message}
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline-primary btn-sm dynamic-add-btn"
        onClick={() => append({ postalCode: "" })}
      >
        <Plus size={14} className="me-1" />
        Add postal code
      </button>
    </div>
  );
}
