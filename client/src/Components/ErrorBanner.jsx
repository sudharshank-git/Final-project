import { Search } from "lucide-react";

export default function ErrorBanner({ message = "Products not found on this page" }) {
  return (
    <div className="error-banner">
      <div>
        <Search size={100} />
        <h4>{message}</h4>
      </div>
    </div>
  );
}
