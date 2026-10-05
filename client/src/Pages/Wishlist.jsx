import ProductList from "../Layouts/ProductList.jsx";

export default function Wishlist() {
  return (
    <div className="home-page">
      <ProductList title="Wishlist" endpoint="/products" category="" />
    </div>
  );
}
