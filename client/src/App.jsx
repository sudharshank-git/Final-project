import Header from "./Layouts/Header.jsx";
import Route from "./Routing/Route.jsx";
import { CartProvider } from "./Contexts/CartContext.jsx";
import { SearchProvider } from "./Contexts/SearchContext.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";

export default function App() {
  return (
    <>
      <SearchProvider>
        <AuthProvider>
          <CartProvider>
            <Header />
            <Route />
          </CartProvider>
        </AuthProvider>
      </SearchProvider>
    </>
  );
}
