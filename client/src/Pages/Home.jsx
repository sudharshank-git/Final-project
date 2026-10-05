import "./Home.css";
import ProductList from "../Layouts/ProductList.jsx";
import CategoryList from "../Layouts/CategoryList.jsx";

export default function Home() {
  return (
    <div className="home-page">
      <CategoryList />
      <ProductList title="Products" />
    </div>
  );
}
