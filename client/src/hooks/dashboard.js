import axios from "axios";
import API_BASE_URL from "../api.js";

export async function fetchDashboardProducts(token) {
  const response = await axios.get(`${API_BASE_URL}/dashboard`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  return response.data || { products: [] };
}

export async function createDashboardProduct(token, payload) {
  const response = await axios.post(`${API_BASE_URL}/dashboard`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data || {};
}

export async function updateDashboardProduct(token, productId, payload) {
  const response = await axios.put(
    `${API_BASE_URL}/dashboard/${productId}`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return response.data || {};
}

export async function deleteDashboardProduct(token, productId) {
  const response = await axios.delete(`${API_BASE_URL}/dashboard/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data || {};
}
