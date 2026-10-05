import { useState } from "react";

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div style={{ padding: "24px", textAlign: "center", color: "#111827" }}>
        <h2>Something went wrong.</h2>
        <p>Please refresh the page or try again later.</p>
        <button
          type="button"
          onClick={() => setHasError(false)}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  return children;
}
