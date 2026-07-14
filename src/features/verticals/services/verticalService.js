import api from "@/lib/api";

export async function getVerticals() {
  const { data } = await api.get("/verticals");
  return data.data;
}

export async function getVerticalById(id) {
  const { data } = await api.get(`/verticals/${id}`);
  return data.data;
}

export async function createVertical(payload) {
  const { data } = await api.post("/verticals", payload);
  return data.data;
}

export async function updateVertical(id, payload) {
  const { data } = await api.put(`/verticals/${id}`, payload);
  return data.data;
}

export async function deleteVertical(id) {
  const { data } = await api.delete(`/verticals/${id}`);
  return data;
}
