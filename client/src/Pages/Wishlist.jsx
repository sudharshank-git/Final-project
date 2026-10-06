import { useWishlist } from "../Contexts/ContextProviders.jsx";
import ProductCard from "../Components/ProductCard.jsx";
import { useCart } from "../Contexts/ContextProviders.jsx";
import "../Layouts/ProductList.css";

export default function Wishlist() {
  const { wishlistItems, loading, error, removeFromWishlist  , onWishlist} = useWishlist();
  const { addToCart } = useCart();
  return (
    <>
      <div className="product-list">
        <h1>Your Wishlist</h1>
        {loading && <p>Loading wishlist...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && wishlistItems.length === 0 && (
          <p>Your wishlist is empty.</p>
        )}
        <div className="product-grid">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product.id}
              title={product.name}
              category={product.category}
              description={product.description}
              brand={product.brand}
              price={product.price}
              rating={product.rating}
              stock={product.stock}
              inStock={product.instock}
              onWishlistPage={wishlistItems.some((item) => item.id === product.id)}
              onAddToCart={() => (addToCart(product) && removeFromWishlist(product.id))}
              onRemoveFromWishlist={() => removeFromWishlist(product.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
