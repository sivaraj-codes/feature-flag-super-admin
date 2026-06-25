import { api } from "../lib/axiosInstance.js";

export const getOrganizations = async () => {
  const { data } = await api.get("/organizations");
  return data.data;
};

export const createOrganization = async (payload) => {
  const { data } = await api.post("/organizations", payload);
  return data.data;
};

export const updateOrganization = async ({ id, payload }) => {
  const { data } = await api.put(`/organizations/${id}`, payload);
  return data.data;
};
