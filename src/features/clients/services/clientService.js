import api from "@/lib/api";

export async function getClients() {
  const { data } = await api.get("/clients");
  return data.data;
}

export async function getClientById(id) {
  const { data } = await api.get(`/clients/${id}`);
  return data.data;
}

export async function createClient(payload) {
  const { data } = await api.post("/clients", payload);
  return data.data;
}

export async function updateClient(id, payload) {
  const { data } = await api.put(`/clients/${id}`, payload);
  return data.data;
}

export async function deleteClient(id) {
  const { data } = await api.delete(`/clients/${id}`);
  return data;
}
