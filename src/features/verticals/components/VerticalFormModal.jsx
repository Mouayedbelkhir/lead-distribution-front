"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Modal, Button } from "@/components/ui";
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
    <Modal
      open
      onClose={onClose}
      title={isEdit ? "Edit Vertical" : "Add Vertical"}
      footer={
        <>
          <Button variant="outline-secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form="vertical-form" loading={isSubmitting} disabled={isSubmitting}>
            {isEdit ? "Save Changes" : "Create Vertical"}
          </Button>
        </>
      }
    >
      <form id="vertical-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="modal-body-custom">
          <div className="form-field">
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
      </form>
    </Modal>
  );
}
