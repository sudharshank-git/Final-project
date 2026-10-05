import { useAuth } from "../Contexts/ContextProviders.jsx";
import "./Login.css";

export default function Register() {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    error,
    submitting,
    setError,
  } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const payload = {
      username: String(username).trim(),
      email: String(email).trim().toLowerCase(),
      password,
    };

    await handleRegister(payload);
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
