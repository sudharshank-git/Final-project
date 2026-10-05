import ProductCard from "./ProductCard";
import { useProducts } from "../hooks/useProducts";
import "./ProductList.css";
import ErrorBanner from "./ErrorBanner";
import {useCart} from "../Contexts/ContextProviders";
import { useSearch } from "../Contexts/ContextProviders";


export default function ProductList(props) {
  const { endpt,searchedTxt,selectedCategory } = useSearch();
  const { addToCart, cartItems } = useCart();
  const { products, loading, error } = useProducts(endpt);

  if (loading) return <div className="product-list loading">Loading products...</div>;
  if (error) return <div className="product-list error">{<ErrorBanner/>}</div>;
  if (products.length === 0) return <div className="product-list empty">{<ErrorBanner/>}</div>;


  return (
    <div className="product-list">
      <h1>{props.title}</h1>
      {selectedCategory ?<div><strong>Category</strong> : {products[0].category}</div>:null}
      {searchedTxt ?<div><strong>Search</strong> : {searchedTxt}</div>:null}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.name}
            brand={product.brand}
            stock={product.stock}
            inStock={product.instock}
            category={product.category}
            rating={product.rating}
            description={product.description}
            price={product.price}
            onAddToCart={() => addToCart(product)}
            addedToCart={cartItems.some((item) => item.id === product.id)}
          />
        ))}
      </div>
    </div>
  );
}
