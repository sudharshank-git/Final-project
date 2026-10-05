export default function ProductCardRow({ product, onEdit, onDelete }) {
  const inStock = Boolean(product.instock ?? product.inStock);

  return (
    <tr className="dashboard-row">
      <td className="dashboard-row-name">{product.name}</td>
      <td className="dashboard-row-category">{product.category}</td>
      <td className="dashboard-row-brand">{product.brand}</td>
      <td className="dashboard-row-price">₹{product.price}</td>
      <td className="dashboard-row-stock">{product.stock}</td>
      <td className="dashboard-row-rating">{product.rating}</td>
      <td>
        <span
          className={`dashboard-row-state ${inStock ? "in-stock" : "out-stock"}`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </td>
      <td className="dashboard-row-actions">
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
      </td>
    </tr>
  );
}
