import { useEffect, useState } from "react";
import SidebarButton from "../Components/Dashboard/SidebarButton.jsx";
import ProductForm from "../Components/Dashboard/ProductForm.jsx";
import ProductCardRow from "../Components/Dashboard/ProductCardRow.jsx";
import "./Dashboard.css";
import { useAuth, useDashboard } from "../Contexts/ContextProviders.jsx";

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
  const { handleLogout } = useAuth();
  const {
    products,
    loading,
    error,
    setError,
    refreshProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useDashboard();
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("view");
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

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
        savedProduct = await updateProduct(editingId, payload);
      } else {
        savedProduct = await createProduct(payload);
      }

      setShowForm(false);
      setActiveTab("view");
      setForm(emptyForm);
      setEditingId(null);

      if (savedProduct) {
        refreshProducts();
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Unable to save product",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      setError("");
      await deleteProduct(productId);
      if (editingId === productId) {
        setShowForm(false);
        setEditingId(null);
      }
      refreshProducts();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to delete product",
      );
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
        <SidebarButton label="logout" onClick={handleLogout} />
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
              <div className="dashboard-table-wrapper">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <ProductCardRow
                        key={product.id}
                        product={product}
                        onEdit={openEditForm}
                        onDelete={handleDelete}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
