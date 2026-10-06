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
  onRemoveFromWishlist,
  addedToCart,
  onWishlist,
}) {
  return (
    <div className="product-card">
      <div className="product-header">
        <div className="card-header">
          <h2>{title}</h2>
          <Button onClick={onWishlist} id="wishlist-icon" className="cart-btn">
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

      
      {onWishlistPage ? (onRemoveFromWishlist ? (
          <>
            <button type="button" onClick={onRemoveFromWishlist} className="cart-btn">
              Remove from Wishlist
            </button>
            <button type="button" onClick={onAddToCart} className="cart-btn">
                {addedToCart ? "View Cart" : "Move to Cart"}
            </button>
          </>
      ) : (null))
      :(onRemoveFromCart ? (
        <button type="button" onClick={onRemoveFromCart} className="cart-btn">
          Remove from Cart
        </button>
      ) : (
        <button type="button" onClick={onAddToCart} className="cart-btn">
          {addedToCart ? "View Cart" : "Add to Cart"}
        </button>
      ))
      }
    </div>
  );
}
