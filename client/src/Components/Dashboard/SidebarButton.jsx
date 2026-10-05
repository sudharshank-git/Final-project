export default function SidebarButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`dashboard-sidebar-button ${active ? "active" : ""}`}
    >
      {label}
    </button>
  );
}
