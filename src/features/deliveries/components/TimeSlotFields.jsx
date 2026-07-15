"use client";

import { Plus, Trash2 } from "lucide-react";

export function TimeSlotFields({ fields, register, append, remove, errors }) {
  return (
    <div className="form-field">
      <label className="form-label">Time Slots <span className="text-danger">*</span></label>
      {fields.map((field, index) => (
        <div key={field.id} className="dynamic-field-row dynamic-field-row-wide">
          <div className="time-slot-inputs">
            <input
              type="time"
              className={`form-control ${errors?.[index]?.startTime ? "is-invalid" : ""}`}
              {...register(`timeSlots.${index}.startTime`, {
                required: "Start time is required",
              })}
            />
            <span className="time-slot-separator">—</span>
            <input
              type="time"
              className={`form-control ${errors?.[index]?.endTime ? "is-invalid" : ""}`}
              {...register(`timeSlots.${index}.endTime`, {
                required: "End time is required",
              })}
            />
          </div>
          {fields.length > 1 && (
            <button
              type="button"
              className="btn-icon danger dynamic-remove-btn"
              onClick={() => remove(index)}
            >
              <Trash2 size={16} />
            </button>
          )}
          {errors?.[index]?.startTime && (
            <div className="invalid-feedback d-block">
              {errors[index].startTime.message}
            </div>
          )}
          {errors?.[index]?.endTime && (
            <div className="invalid-feedback d-block">
              {errors[index].endTime.message}
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline-primary btn-sm dynamic-add-btn"
        onClick={() => append({ startTime: "09:00", endTime: "18:00" })}
      >
        <Plus size={14} className="me-1" />
        Add time slot
      </button>
    </div>
  );
}
