import { createContext, useCallback, useContext, useEffect, useState,
} from "react";
import { createDashboardProduct, deleteDashboardProduct, fetchDashboardProducts, updateDashboardProduct,
} from "../hooks/dashboard.js";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const syncToken = () => {
            setToken(localStorage.getItem("token"));
        };

        window.addEventListener("auth-changed", syncToken);
        return () => window.removeEventListener("auth-changed", syncToken);
    }, []);

    const refreshProducts = useCallback(
        async ({ latestOnly = false } = {}) => {
        if (!token) {
            setProducts([]);
            setLoading(false);
            setError("");
            return [];
        }

    try {
        setLoading(true);
        setError("");

        const data = await fetchDashboardProducts(token);
        const list = Array.isArray(data?.products) ? data.products : [];
        const nextProducts =
        latestOnly && list.length ? [list[list.length - 1]] : list;
        setProducts(nextProducts);
        return nextProducts;
    } catch (err) {
        const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load products";
        setError(message);
        setProducts([]);
        return [];
    } finally {
        setLoading(false);
    }
    },
    [token],
);

const createProduct = useCallback(
    async (payload) => {
    if (!token) {
        throw new Error("You must be logged in to add a product.");
    }

    const data = await createDashboardProduct(token, payload);
    const product = data?.product?.[0] || data?.product || null;

    if (product) {
        setProducts((prev) => {
        const exists = prev.some((item) => item.id === product.id);
        if (exists) {
            return prev.map((item) =>
                item.id === product.id ? product : item,
            );
        }
        return [product, ...prev];
        });
    }

      return product;
    },
    [token],
  );

  const updateProduct = useCallback(
    async (productId, payload) => {
      if (!token) {
        throw new Error("You must be logged in to update a product.");
      }

      const data = await updateDashboardProduct(token, productId, payload);
      const product = data?.product?.[0] || data?.product || null;

      if (product) {
        setProducts((prev) =>
          prev.map((item) => (item.id === product.id ? product : item)),
        );
      }

      return product;
    },
    [token],
  );

  const deleteProduct = useCallback(
    async (productId) => {
      if (!token) {
        throw new Error("You must be logged in to delete a product.");
      }

      await deleteDashboardProduct(token, productId);
      setProducts((prev) => prev.filter((item) => item.id !== productId));
      return true;
    },
    [token],
  );

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  return (
    <DashboardContext.Provider
      value={{
        products,
        loading,
        error,
        setError,
        setProducts,
        refreshProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used inside a DashboardProvider");
  }

  return context;
}

export { DashboardContext };
