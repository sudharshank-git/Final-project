import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api.js";
import { useAuth } from "../Contexts/ContextProviders.jsx";
import { login } from "../hooks/auth.js";
import "./Login.css";

export default function Login() {

  const { email, setEmail, password, setPassword , handleLogin } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    const result = await handleLogin({email, password});
    localStorage.setItem("token", result.token);
    window.dispatchEvent(new Event("auth-changed"));
      navigate(
        location.state?.from?.pathname === "/login"
          ? "/dashboard"
          : location.state?.from?.pathname || "/dashboard",
        { replace: true }
      );
  }

  return (
    <>
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-field">
              <label className="form-label" htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
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
                {submitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}