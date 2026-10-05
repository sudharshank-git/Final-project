import "./Home.css";
import ProductList from "../Components/ProductList";
import CategoryList from "../Components/CategoryList";

export default function Home() {

  return (
    <div className="home-page">
      <CategoryList />
      <ProductList title="Products" />
    </div>
  );
}