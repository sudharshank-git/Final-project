import CategoryCard from "./CategoryCard";
import { useProducts } from "../hooks/useProducts";
import { useSearch } from "../Contexts/ContextProviders";
import "./CategoryList.css";

export default function CategoryList() {
  const { products, loading, error } = useProducts("/products");
  const { handleCategoryClick, selectedCategory } = useSearch();


  const counts = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(counts)
    .map(([category, count]) => ({ category, count }));

  if (loading) return <div className="category-list loading">Loading categories...</div>;
  if (error) return <div className="category-list error">{error}</div>;
  if (categories.length === 0) return <div className="category-list empty">No categories found</div>;

  return (
    <div className="category-list-container">
      <h2>Categories</h2>
      <div className="category-list">
        {categories.map(({ category, count }) => (
          <CategoryCard
            key={category}
            category={category}
            productCount={count}
            isSelected={selectedCategory === category}
            onClick={(category)=> {
              handleCategoryClick(category);
            }}
          />
        ))}
      </div>
    </div>
  );
}
