import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../api.js";

export function useProducts(endpoint) {
  const [state, setState] = useState({ products: [], loading: true, error: "" });

  useEffect(() => {
    const fetchProduct = async ()=>{

      setState((prev) => ({ ...prev, loading: true, error: "" }));
      try {
        const res = await axios.get(`${API_BASE_URL}${endpoint}`)
        const list = res.data?.products;
        setState({ products: Array.isArray(list) ? list : [], loading: false, error: "" });
      } catch (err) {
        if (axios.isCancel(err)) return;
        setState({
          products: [],
          loading: false,
          error: err.response?.data?.message || err.message || "Failed to fetch products",
        });
      };
    }
    fetchProduct()
  }, [endpoint]);
  return state;
}
