export default function ProductForm({ form, onChange, onSubmit, onCancel, editingId, saving,
}) {
  const setField = (field, value) =>
    onChange((prev) => ({ ...prev, [field]: value }));

  return (
    <form onSubmit={onSubmit} className="dashboard-form">
      <div className="dashboard-field">
        <label>Product Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          required
          className="dashboard-input"
        />
      </div>

      <div className="dashboard-grid-two">
        <div className="dashboard-field">
          <label>Category</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
            required
            className="dashboard-input"
          />
        </div>

        <div className="dashboard-field">
          <label>Brand</label>
          <input
            type="text"
            value={form.brand}
            onChange={(e) => setField("brand", e.target.value)}
            required
            className="dashboard-input"
          />
        </div>
      </div>

      <div className="dashboard-grid-three">
        <div className="dashboard-field">
          <label>Price</label>
          <input
            type="number"
            min="100"
            value={form.price}
            onChange={(e) => setField("price", e.target.value)}
            required
            className="dashboard-input"
          />
        </div>

        <div className="dashboard-field">
          <label>Stock</label>
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => setField("stock", e.target.value)}
            required
            className="dashboard-input"
          />
        </div>

        <div className="dashboard-field">
          <label>Rating</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={(e) => setField("rating", e.target.value)}
            required
            className="dashboard-input"
          />
        </div>
      </div>

      <label className="dashboard-checkbox">
        <input
          type="checkbox"
          checked={Boolean(form.inStock)}
          onChange={(e) => setField("inStock", e.target.checked)}
        />
        In Stock
      </label>

      <div className="dashboard-actions">
        <button
          type="button"
          onClick={onCancel}
          className="dashboard-secondary-btn"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="dashboard-primary-btn"
        >
          {saving ? (editingId ? "Updating..." : "Saving...") : (editingId ? "Update Product" : "Add Product")}
        </button>
      </div>
    </form>
  );
}
