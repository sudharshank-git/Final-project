import Button from "../ui/Button.jsx";
import "./ProductCard.css";

const DEFAULT_DESCRIPTION =
  "A 20L pack with a padded back panel and water-resistant zips.";

export default function ProductCard({
  title,
  category,
  description = DEFAULT_DESCRIPTION,
  brand,
  price,
  rating,
  stock,
  inStock,
  onAddToCart,
  onRemoveFromCart,
  onWishlistPage,
  onRemoveWishlist,
  addedToCart,
  onWishlist,
  moveToCart
}) {
  return (
    <div className="product-card">
      <div className="product-header">
        <div className="card-header">
          <h2>{title}</h2>
          <Button onClick={onWishlistPage?onRemoveWishlist:onWishlist} id="wishlist-icon" className={` ${ onWishlistPage? "checkheart" : ""}`}>
            ♡
          </Button>
        </div>
        <span className="category">{category}</span>
        <p className="description">{description}</p>
      </div>

      <div className="product-info">
        <div className="info-row">
          <span>Brand</span>
          <strong>{brand}</strong>
        </div>
        <div className="info-row">
          <span>Price</span>
          <strong>₹{price}</strong>
        </div>
        <div className="info-row">
          <span>Rating</span>
          <strong>⭐ {rating}</strong>
        </div>
        <div className="info-row">
          <span>Stock</span>
          <strong>{stock} units</strong>
        </div>
      </div>

      <div className="product-status">
        <span className={inStock ? "in-stock" : "out-stock"}>
          ● {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      
      {onWishlistPage ?
            <button type="button" onClick={moveToCart} className="cart-btn">
              Move To Cart
            </button>
      :(addedToCart ? 
        <button type="button" onClick={onRemoveFromCart} className="cart-btn">
          Remove from Cart
        </button>
      : 
        <button type="button" onClick={onAddToCart} className="cart-btn">
          {addedToCart ? "View Cart" : "Add to Cart"}
        </button>
      )}
      
    </div>
  );
}
