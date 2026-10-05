import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api.js";
import SidebarButton from "../Components/Dashboard/SidebarButton.jsx";
import ProductForm from "../Components/Dashboard/ProductForm.jsx";
import ProductCardRow from "../Components/Dashboard/ProductCardRow.jsx";
import "./Dashboard.css";
import { useAuth } from "../Contexts/ContextProviders.jsx";
import { useNavigate } from "react-router-dom";

const emptyForm = {
  name: "",
  category: "",
  brand: "",
  price: "",
  stock: "",
  rating: "",
  inStock: false,
};

export default function Dashboard() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("view");
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const refreshProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/products`);
      const fetchedProducts = res.data?.products || [];
      setProducts(
        fetchedProducts.length
          ? [fetchedProducts[fetchedProducts.length - 1]]
          : [],
      );
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
  }, []);

  const openAddForm = () => {
    setActiveTab("add");
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openViewProducts = () => {
    setActiveTab("view");
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    refreshProducts();
  };

  const openEditForm = (product) => {
    setActiveTab("add");
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: String(product.price),
      stock: String(product.stock),
      rating: String(product.rating),
      inStock: Boolean(product.instock),
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      brand: form.brand.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
      inStock: Boolean(form.inStock),
    };

    try {
      setSaving(true);
      setError("");

      let savedProduct;

      if (editingId) {
        const res = await axios.put(
          `${API_BASE_URL}/products/${editingId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        savedProduct = res.data?.product?.[0] || res.data?.product || null;
      } else {
        const res = await axios.post(`${API_BASE_URL}/products`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        savedProduct = res.data?.product?.[0] || res.data?.product || null;
      }

      setShowForm(false);
      setActiveTab("view");
      setForm(emptyForm);
      setEditingId(null);

      if (savedProduct) {
        setProducts((prev) => {
          const next = prev.some((item) => item.id === savedProduct.id)
            ? prev.map((item) =>
                item.id === savedProduct.id ? savedProduct : item,
              )
            : [savedProduct];
          return next;
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      setError("");
      await axios.delete(`${API_BASE_URL}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (editingId === productId) {
        setShowForm(false);
        setEditingId(null);
      }
      setProducts((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete product");
    }
  };

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <h2>Dashboard</h2>
        <SidebarButton
          label="Add Product"
          active={activeTab === "add"}
          onClick={openAddForm}
        />
        <SidebarButton
          label="View Products"
          active={activeTab === "view"}
          onClick={openViewProducts}
        />
        <SidebarButton
          label="logout"
          onClick={() => {
            if(!localStorage.removeItem("token")) {
            setIsAuthenticated(!isAuthenticated);
            navigate("/login", { replace: true });
            }
          }}
        />
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1>Product Management</h1>
            <p>
              {showForm
                ? editingId
                  ? "Update product"
                  : "Create new product"
                : "Manage your catalog"}
            </p>
          </div>
        </div>

        {error ? <div className="dashboard-error">{error}</div> : null}

        {showForm ? (
          <ProductForm
            form={form}
            onChange={setForm}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setActiveTab("view");
              setEditingId(null);
              setForm(emptyForm);
            }}
            editingId={editingId}
            saving={saving}
          />
        ) : (
          <>
            {loading ? (
              <div className="dashboard-loading">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="dashboard-empty">No products found.</div>
            ) : (
              <div className="dashboard-list">
                {products.map((product) => (
                  <ProductCardRow
                    key={product.id}
                    product={product}
                    onEdit={openEditForm}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
