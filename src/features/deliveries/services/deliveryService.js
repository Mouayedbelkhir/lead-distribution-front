import api from "@/lib/api";

export async function getDeliveries() {
  const { data } = await api.get("/deliveries");
  return data.data;
}

export async function getDeliveryById(id) {
  const { data } = await api.get(`/deliveries/${id}`);
  return data.data;
}

export async function createDelivery(payload) {
  const { data } = await api.post("/deliveries", payload);
  return data.data;
}

export async function updateDelivery(id, payload) {
  const { data } = await api.put(`/deliveries/${id}`, payload);
  return data.data;
}

export async function deleteDelivery(id) {
  const { data } = await api.delete(`/deliveries/${id}`);
  return data;
}
