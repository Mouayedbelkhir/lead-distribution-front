"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { Modal, Button } from "@/components/ui";
import { leadFormDefaults } from "@/features/leads/schemas/leadSchema";
import { useCreateLead } from "@/features/leads/hooks/useLeads";
import { useVerticals } from "@/features/verticals/hooks/useVerticals";
import { LeadResultCard } from "@/features/leads/components/LeadResultCard";
import { LeadSimulation } from "@/features/leads/components/LeadSimulation";

export function LeadForm({ onClose }) {
  const createLead = useCreateLead();
  const { data: verticals } = useVerticals();
  const [result, setResult] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: leadFormDefaults,
  });

  const watchedValues = useWatch({ control });

  const onSubmit = async (values) => {
    const payload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      birthDate: values.birthDate,
      postalCode: values.postalCode.trim(),
      verticalId: Number(values.verticalId),
    };

    try {
      const lead = await createLead.mutateAsync(payload);
      setResult(lead);
      if (lead.status === "DISTRIBUTED") {
        toast.success("Lead created and distributed successfully");
      } else {
        toast.success("Lead created \u2014 no eligible delivery found");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create lead");
    }
  };

  const handleClose = () => {
    setResult(null);
    onClose();
  };

  return (
    <Modal
      open
      onClose={handleClose}
      title={<><UserPlus size={18} className="me-2" />New Lead</>}
      footer={
        <>
          <div>
            <LeadSimulation formData={watchedValues} />
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" onClick={handleClose}>
              {result ? "Close" : "Cancel"}
            </Button>
            {!result && (
              <Button variant="primary" type="submit" form="lead-form" loading={isSubmitting} disabled={isSubmitting}>
                Create &amp; Distribute
              </Button>
            )}
          </div>
        </>
      }
    >
      <form id="lead-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="modal-body-custom">
          <div className="form-row-two">
            <div className="form-field">
              <label className="form-label" htmlFor="firstName">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                id="firstName"
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                placeholder="Jean"
                {...register("firstName", { required: "First name is required" })}
              />
              {errors.firstName && (
                <div className="invalid-feedback d-block">{errors.firstName.message}</div>
              )}
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="lastName">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                id="lastName"
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                placeholder="Dupont"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <div className="invalid-feedback d-block">{errors.lastName.message}</div>
              )}
            </div>
          </div>

          <div className="form-row-two">
            <div className="form-field">
              <label className="form-label" htmlFor="birthDate">
                Birth Date <span className="text-danger">*</span>
              </label>
              <input
                id="birthDate"
                type="date"
                className={`form-control ${errors.birthDate ? "is-invalid" : ""}`}
                {...register("birthDate", { required: "Birth date is required" })}
              />
              {errors.birthDate && (
                <div className="invalid-feedback d-block">{errors.birthDate.message}</div>
              )}
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="postalCode">
                Postal Code <span className="text-danger">*</span>
              </label>
              <input
                id="postalCode"
                className={`form-control ${errors.postalCode ? "is-invalid" : ""}`}
                placeholder="75001"
                {...register("postalCode", { required: "Postal code is required" })}
              />
              {errors.postalCode && (
                <div className="invalid-feedback d-block">{errors.postalCode.message}</div>
              )}
            </div>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="verticalId">
              Vertical <span className="text-danger">*</span>
            </label>
            <select
              id="verticalId"
              className={`form-select ${errors.verticalId ? "is-invalid" : ""}`}
              {...register("verticalId", { required: "Vertical is required" })}
            >
              <option value="">Select a vertical</option>
              {verticals?.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
            {errors.verticalId && (
              <div className="invalid-feedback d-block">{errors.verticalId.message}</div>
            )}
          </div>

          {result && <LeadResultCard result={result} />}
        </div>
      </form>
    </Modal>
  );
}
