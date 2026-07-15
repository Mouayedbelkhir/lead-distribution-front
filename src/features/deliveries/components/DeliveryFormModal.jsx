"use client";

import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { Modal, Button } from "@/components/ui";
import { deliveryFormDefaults } from "@/features/deliveries/schemas/deliverySchema";
import { useCreateDelivery, useUpdateDelivery } from "@/features/deliveries/hooks/useDeliveries";
import { useClients } from "@/features/clients/hooks/useClients";
import { useVerticals } from "@/features/verticals/hooks/useVerticals";
import { PostalCodeFields } from "@/features/deliveries/components/PostalCodeFields";
import { TimeSlotFields } from "@/features/deliveries/components/TimeSlotFields";

export function DeliveryFormModal({ delivery, onClose }) {
  const isEdit = !!delivery;
  const createDelivery = useCreateDelivery();
  const updateDelivery = useUpdateDelivery();
  const { data: clients } = useClients();
  const { data: verticals } = useVerticals();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: delivery
      ? {
          clientId: String(delivery.clientId),
          verticalId: String(delivery.verticalId),
          minAge: delivery.minAge,
          maxAge: delivery.maxAge,
          capacity: delivery.capacity,
          price: delivery.price,
          postalCodes: delivery.postalCodes.map((p) => ({ postalCode: p.postalCode })),
          timeSlots: delivery.timeSlots.map((t) => ({ startTime: t.startTime, endTime: t.endTime })),
        }
      : deliveryFormDefaults,
  });

  const {
    fields: postalCodeFields,
    append: appendPostalCode,
    remove: removePostalCode,
  } = useFieldArray({ control, name: "postalCodes" });

  const {
    fields: timeSlotFields,
    append: appendTimeSlot,
    remove: removeTimeSlot,
  } = useFieldArray({ control, name: "timeSlots" });

  const onSubmit = async (values) => {
    const payload = {
      clientId: Number(values.clientId),
      verticalId: Number(values.verticalId),
      minAge: Number(values.minAge),
      maxAge: Number(values.maxAge),
      capacity: Number(values.capacity),
      price: Number(values.price),
      postalCodes: values.postalCodes.map((p) => p.postalCode.trim()).filter(Boolean),
      timeSlots: values.timeSlots.map((t) => ({
        startTime: t.startTime,
        endTime: t.endTime,
      })),
    };

    try {
      if (isEdit) {
        await updateDelivery.mutateAsync({ id: delivery.id, payload });
        toast.success("Delivery updated successfully");
      } else {
        await createDelivery.mutateAsync(payload);
        toast.success("Delivery created successfully");
      }
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to ${isEdit ? "update" : "create"} delivery`);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={isEdit ? "Edit Delivery" : "Add Delivery"}
      size="wide"
      footer={
        <>
          <Button variant="outline-secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form="delivery-form" loading={isSubmitting} disabled={isSubmitting}>
            {isEdit ? "Save Changes" : "Create Delivery"}
          </Button>
        </>
      }
    >
      <form id="delivery-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="modal-body-custom">
          <div className="form-row-two">
            <div className="form-field">
              <label className="form-label" htmlFor="clientId">
                Client <span className="text-danger">*</span>
              </label>
              <select
                id="clientId"
                className={`form-select ${errors.clientId ? "is-invalid" : ""}`}
                {...register("clientId", { required: "Client is required" })}
              >
                <option value="">Select a client</option>
                {clients?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}{c.company ? ` \u2014 ${c.company}` : ""}
                  </option>
                ))}
              </select>
              {errors.clientId && (
                <div className="invalid-feedback d-block">{errors.clientId.message}</div>
              )}
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
          </div>

          <div className="form-row-two">
            <div className="form-field">
              <label className="form-label" htmlFor="minAge">
                Min Age <span className="text-danger">*</span>
              </label>
              <input
                id="minAge"
                type="number"
                min="0"
                className={`form-control ${errors.minAge ? "is-invalid" : ""}`}
                {...register("minAge", {
                  required: "Min age is required",
                  min: { value: 0, message: "Must be 0 or greater" },
                  valueAsNumber: true,
                })}
              />
              {errors.minAge && (
                <div className="invalid-feedback d-block">{errors.minAge.message}</div>
              )}
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="maxAge">
                Max Age <span className="text-danger">*</span>
              </label>
              <input
                id="maxAge"
                type="number"
                min="0"
                className={`form-control ${errors.maxAge ? "is-invalid" : ""}`}
                {...register("maxAge", {
                  required: "Max age is required",
                  min: { value: 0, message: "Must be 0 or greater" },
                  valueAsNumber: true,
                })}
              />
              {errors.maxAge && (
                <div className="invalid-feedback d-block">{errors.maxAge.message}</div>
              )}
            </div>
          </div>

          <div className="form-row-two">
            <div className="form-field">
              <label className="form-label" htmlFor="capacity">
                Capacity <span className="text-danger">*</span>
              </label>
              <input
                id="capacity"
                type="number"
                min="1"
                className={`form-control ${errors.capacity ? "is-invalid" : ""}`}
                {...register("capacity", {
                  required: "Capacity is required",
                  min: { value: 1, message: "Must be at least 1" },
                  valueAsNumber: true,
                })}
              />
              {errors.capacity && (
                <div className="invalid-feedback d-block">{errors.capacity.message}</div>
              )}
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="price">
                Price (&euro;) <span className="text-danger">*</span>
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0.01, message: "Must be greater than 0" },
                  valueAsNumber: true,
                })}
              />
              {errors.price && (
                <div className="invalid-feedback d-block">{errors.price.message}</div>
              )}
            </div>
          </div>

          <PostalCodeFields
            fields={postalCodeFields}
            register={register}
            append={appendPostalCode}
            remove={removePostalCode}
            errors={errors.postalCodes}
          />

          <TimeSlotFields
            fields={timeSlotFields}
            register={register}
            append={appendTimeSlot}
            remove={removeTimeSlot}
            errors={errors.timeSlots}
          />
        </div>
      </form>
    </Modal>
  );
}
