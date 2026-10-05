import axios from "axios";
import API_BASE_URL from "../api.js";

export async function login({ email, password }) {
    try {
        const payload = {
        email: String(email).trim().toLowerCase(),
        password,
        };

    const res = await axios.post(`${API_BASE_URL}/auth/login`, payload);
    const token = res.data?.token;
    if (!token) {
        throw new Error("No token received");
    }
    return { response: res.data, token };
    } catch (err) {
        const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please check your credentials.";
        throw new Error(message);
    }
}

export async function register({ username, email, password }) {
  try {
    const payload = {
      username: String(username).trim(),
      email: String(email).trim().toLowerCase(),
      password,
    };

    const res = await axios.post(`${API_BASE_URL}/auth/register`, payload);

    const token = res.data?.token;
    if (!token) {
      throw new Error("No token received");
    }

    return { response: res.data, token };
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Registration failed. Please try again.";
    throw new Error(message);
  }
}
