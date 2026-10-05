import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api.js";
import "./Login.css";

export default function Register() {
    const[username,setUsername]=useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
        const res = await axios.post(`${API_BASE_URL}/auth/register`, {
            username,
            email,
            password,
        });
        const token = res.data?.token;
        if (!token) {
            setError("No token received");
            return;
        }
        localStorage.setItem("token", token);
        window.dispatchEvent(new Event("auth-changed"));
        navigate(
            location.state?.from?.pathname === "/login"
            ? "/dashboard"
            : location.state?.from?.pathname || "/dashboard",
            { replace: true }
        );
        } catch (err) {
        setError(err.response?.data?.message || err.message);
        } finally {
        setSubmitting(false);
        }
    }

    return (
        <>
        <div className="login-wrapper">
            <div className="login-card">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-field">
                <label className="form-label" htmlFor="register-username">
                    Username
                </label>
                <input
                    id="register-username"
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </div>
                <div className="form-field">
                <label className="form-label" htmlFor="register-email">
                    Email
                </label>
                <input
                    id="register-email"
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <div className="form-field">
                <label className="form-label" htmlFor="register-password">
                    Password
                </label>
                <input
                    id="register-password"
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                {error && <div className="form-error">{String(error)}</div>}
                <div className="form-actions">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                >
                    {submitting ? "Registering..." : "Register"}
                </button>
                </div>
            </form>
            </div>
        </div>
        </>
    );
}