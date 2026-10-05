import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";
import AuthRoute from "../Components/AuthRoute.jsx";
import Cart from "../Pages/Cart.jsx";
import Dashboard from "../Pages/Dashboard.jsx";
import Wishlist from "../Pages/Wishlist.jsx";
import Register from "../Pages/Register.jsx";

export default function App() {
    return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route
            path="/cart"
            element={
            <AuthRoute>
                <Cart />
            </AuthRoute>
            }
        />
        <Route
            path="/dashboard"
            element={
            <AuthRoute>
                <Dashboard />
            </AuthRoute>
            }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        </Routes>
    );
}