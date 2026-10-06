export default function CategoryCard({onClick, category, productCount, isSelected}) {
  const clickable = Boolean(onClick);
  return (
    <div
      className={`category-card ${isSelected ? "active" : ""}`}
      onClick={() => onClick?.(category)}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      style={{ cursor: clickable ? "pointer" : "default" }} 
    >
      <div>
        <h4>{category}</h4>
        <p>{productCount} products</p>
      </div>
    </div>
  );
}
