import axios from "axios";
import { createContext, useEffect, useState } from "react";
import API_BASE_URL from "../api.js";

const CartContext = createContext();
const CART_URL = `${API_BASE_URL}/cart`;

export function CartProvider({children}) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(Boolean(token));
    const [error, setError] = useState("");

    useEffect(() => {
        function syncToken() {
            setToken(localStorage.getItem("token"));
        }

        window.addEventListener("auth-changed", syncToken);
        return () => window.removeEventListener("auth-changed", syncToken);
    }, []);

    useEffect(() => {
        if (!token) {
            setCartItems([]);
            setLoading(false);
            setError("");
            return;
        }

        const controller = new AbortController();
        setCartItems([]);
        setLoading(true);
        setError("");

        axios.get(CART_URL, {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
        }).then(({ data }) => {
            setCartItems(data.items);
        }).catch((requestError) => {
            if (axios.isCancel(requestError)) return;
            setCartItems([]);
            setError(requestError.response?.data?.message || "Unable to load cart");
            if (requestError.response?.status === 401) {
                localStorage.removeItem("token");
                setToken(null);
            }
        }).finally(() => {
            if (!controller.signal.aborted) setLoading(false);
        });

        return () => controller.abort();
    }, [token]);

    async function addToCart(product) {
        const { data } = await axios.post(CART_URL, { productId: product.id }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Cart updated:", data);
        setCartItems(data.items);
    }

    async function removeFromCart(productId) {
        const { data } = await axios.delete(`${CART_URL}/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(data.items);
    }

    function CartCount(){
        return cartItems.length;
    }

    function cartTotalPrice() {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }


    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, CartCount, cartTotalPrice, loading, error }}>
            {children}
        </CartContext.Provider>
    );
}

export {CartContext} ;