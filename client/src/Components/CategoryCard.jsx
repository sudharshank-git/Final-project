export default function CategoryCard({onClick, category, productCount, isSelected}) {
  const clickable = Boolean(onClick);
  return (
    <div
      className="category-card"
      onClick={() => onClick?.(category)}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      style={{ cursor: clickable ? "pointer" : "default" }} 
    >
      <div className={`category-card ${isSelected ? "active" : ""}`}>
      
        <h4>{category}</h4>
        <p>{productCount} products</p>
      </div>
    </div>
  );
}
