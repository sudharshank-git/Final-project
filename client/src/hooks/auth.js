import axios from "axios";
import API_BASE_URL from "../api.js";
import { useAuth } from "../Contexts/ContextProviders.jsx"; 

export async function login({email, password}) {
    const { setError} = useAuth();
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
        });
        console.log("Response from server:", res.data);
        const token = res.data?.token; 
        return { response: res.data, token };
    }catch (err) {
        console.error("Error during login:", err);
        setError("Login failed. Please check your credentials.");
        throw err.message || "Login failed. Please check your credentials."; 
    }
}
export async function register({username, email, password}) {
    const { setError} = useAuth();
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        email,
        password,
        });
        const token = res.data?.token; 
        return { response: res.data, token };
    }catch (err) {
        setError("Registration failed. Please try again.");
        throw err.message || "Registration failed. Please try again.";
    }
}