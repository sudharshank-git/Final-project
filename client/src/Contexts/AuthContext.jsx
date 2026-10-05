import { createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login, register } from "../hooks/auth.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (credentials) => {
        setError("");
        setSubmitting(true);

        try {
            const result = await login(credentials);
            if (!result.token) {
                setError("No token received");
                return null;
            }
            
            localStorage.setItem("token", result.token);
            setIsAuthenticated(true);
            window.dispatchEvent(new Event("auth-changed"));
            navigate(
                location.state?.from?.pathname === "/login"
                    ? "/dashboard"
                    : location.state?.from?.pathname || "/dashboard",
                { replace: true }
            );
            return result;
        } catch (err) {
            setError(err?.message || "Login failed. Please check your credentials.");
            if (err?.message === "User Not Found") {
                setPassword("");
                setEmail("");
                setUsername("");
                navigate("/register", { state: { from: location }, replace: true });
            }
            return null;
        } finally {
            setSubmitting(false);
        }
    };

    const handleRegister = async (credentials) => {
        setError("");
        setSubmitting(true);

        try {
            const result = await register(credentials);
            if (!result?.token) {
                setError("No token received");
                return null;
            }

            localStorage.setItem("token", result.token);
            window.dispatchEvent(new Event("auth-changed"));
            navigate(
                location.state?.from?.pathname === "/login"
                    ? "/dashboard"
                    : location.state?.from?.pathname || "/dashboard",
                { replace: true }
            );
            return result;
        } catch (err) {
            setError(err?.message || "Registration failed. Please try again.");
            return null;
        } finally {
            setSubmitting(false);
            setPassword("");
            setEmail("");
            setUsername("");
        }
    };

    return (
        <AuthContext.Provider value={{
            username,
            setUsername,
            email,
            setEmail,
            password,
            setPassword,
            error,
            setError,
            submitting,
            setSubmitting,
            handleLogin,
            handleRegister,
            isAuthenticated,
            setIsAuthenticated,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };