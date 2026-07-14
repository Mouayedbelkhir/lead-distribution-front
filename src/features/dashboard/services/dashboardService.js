import api from "@/lib/api";

export async function getStats() {
  const { data } = await api.get("/dashboard/stats");
  return data.data;
}
