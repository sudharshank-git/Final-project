export default function ProductCardRow({ product, onEdit, onDelete }) {
  return (
    <div className="dashboard-row">
      <div>
        <div className="dashboard-row-name">{product.name}</div>
        <div className="dashboard-row-category">{product.category}</div>
      </div>

      <div>
        <div className="dashboard-row-brand">{product.brand}</div>
        <div className="dashboard-row-price">₹{product.price}</div>
      </div>

      <div>
        <div className="dashboard-row-stock">Stock: {product.stock}</div>
        <div
          className={`dashboard-row-state ${product.instock ? "in-stock" : "out-stock"}`}
        >
          {product.instock ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      <div className="dashboard-row-rating">Rating: {product.rating}</div>

      <div className="dashboard-row-actions">
        <button
          type="button"
          onClick={() => onEdit(product)}
          className="dashboard-secondary-btn"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(product.id)}
          className="dashboard-danger-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
