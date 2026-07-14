"use client";

import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { clientFormDefaults } from "@/features/clients/schemas/clientSchema";
import { useCreateClient, useUpdateClient } from "@/features/clients/hooks/useClients";

export function ClientFormModal({ client, onClose }) {
  const isEdit = !!client;
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: client
      ? {
          name: client.name || "",
          company: client.company || "",
          email: client.email || "",
          isActive: client.isActive,
        }
      : clientFormDefaults,
  });

  const onSubmit = async (values) => {
    const payload = {
      name: values.name,
      company: values.company || null,
      email: values.email || null,
      isActive: values.isActive,
    };

    try {
      if (isEdit) {
        await updateClient.mutateAsync({ id: client.id, payload });
        toast.success("Client updated successfully");
      } else {
        await createClient.mutateAsync(payload);
        toast.success("Client created successfully");
      }
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to ${isEdit ? "update" : "create"} client`);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-custom">
          <h3 className="modal-title-custom">
            {isEdit ? "Edit Client" : "Add Client"}
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
                placeholder="Client name"
                {...register("name", {
                  required: "Name is required",
                  maxLength: { value: 100, message: "Name is too long" },
                })}
              />
              {errors.name && (
                <div className="invalid-feedback d-block">{errors.name.message}</div>
              )}
            </div>

            <div className="auth-field">
              <label className="form-label" htmlFor="company">
                Company
              </label>
              <input
                id="company"
                className={`form-control ${errors.company ? "is-invalid" : ""}`}
                placeholder="Company name (optional)"
                {...register("company", {
                  maxLength: { value: 100, message: "Company name is too long" },
                })}
              />
              {errors.company && (
                <div className="invalid-feedback d-block">{errors.company.message}</div>
              )}
            </div>

            <div className="auth-field">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="contact@company.com (optional)"
                {...register("email", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback d-block">{errors.email.message}</div>
              )}
            </div>

            <div className="auth-field">
              <div className="form-check form-switch">
                <input
                  id="isActive"
                  className="form-check-input"
                  type="checkbox"
                  {...register("isActive")}
                />
                <label className="form-check-label" htmlFor="isActive">
                  Active
                </label>
              </div>
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
                isEdit ? "Save Changes" : "Create Client"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
