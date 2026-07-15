import api from "@/lib/api";

export async function getLeads(params = {}) {
  const { data } = await api.get("/leads", { params });
  return data;
}

export async function createLead(payload) {
  const { data } = await api.post("/leads", payload);
  return data.data;
}

export async function simulateLead(payload) {
  const { data } = await api.post("/leads/simulate", payload);
  return data.data;
}
