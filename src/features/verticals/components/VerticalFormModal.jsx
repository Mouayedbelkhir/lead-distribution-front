"use client";

import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { verticalFormDefaults } from "@/features/verticals/schemas/verticalSchema";
import { useCreateVertical, useUpdateVertical } from "@/features/verticals/hooks/useVerticals";

export function VerticalFormModal({ vertical, onClose }) {
  const isEdit = !!vertical;
  const createVertical = useCreateVertical();
  const updateVertical = useUpdateVertical();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: vertical
      ? { name: vertical.name || "" }
      : verticalFormDefaults,
  });

  const onSubmit = async (values) => {
    const payload = { name: values.name };

    try {
      if (isEdit) {
        await updateVertical.mutateAsync({ id: vertical.id, payload });
        toast.success("Vertical updated successfully");
      } else {
        await createVertical.mutateAsync(payload);
        toast.success("Vertical created successfully");
      }
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to ${isEdit ? "update" : "create"} vertical`);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-custom">
          <h3 className="modal-title-custom">
            {isEdit ? "Edit Vertical" : "Add Vertical"}
          </h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="modal-body-custom">
            <div className="auth-field">
              <label className="form-label" htmlFor="name">
                Name <span className="text-danger">*</span>
              </label>
              <input
                id="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Vertical name (e.g. Assurance Auto)"
                {...register("name", {
                  required: "Name is required",
                  maxLength: { value: 100, message: "Name is too long" },
                })}
              />
              {errors.name && (
                <div className="invalid-feedback d-block">{errors.name.message}</div>
              )}
            </div>
          </div>

          <div className="modal-footer-custom">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Saving...
                </>
              ) : (
                isEdit ? "Save Changes" : "Create Vertical"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
