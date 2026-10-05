import ProductCard from "../Components/ProductCard";
import { useCart } from "../Contexts/ContextProviders";
import "../Components/ProductList.css";

export default function Cart() {
    const { cartItems, loading, error, removeFromCart } = useCart();

    return (
        <div className="home-page">
            <div className="product-list">
                <h1>Your Cart</h1>
                {loading && <p>Loading cart...</p>}
                {error && <p role="alert">{error}</p>}
                {!loading && !error && cartItems.length === 0 && <p>Your cart is empty.</p>}
                <div className="product-grid">
                    {cartItems.map((product) => (
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
                            onRemoveFromCart={() => removeFromCart(product.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

