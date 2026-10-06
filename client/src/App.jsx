import Header from "./Layouts/Header.jsx";
import Routers from "./Routing/Route.jsx";
import { CartProvider } from "./Contexts/CartContext.jsx";
import { SearchProvider } from "./Contexts/SearchContext.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { DashboardProvider } from "./Contexts/DashboardContext.jsx";
import { WishlistProvider } from "./Contexts/WishlistContext.jsx";

export default function App() {
  return (
    <>
      <SearchProvider>
        <WishlistProvider>
          <AuthProvider>
            <CartProvider>
              <DashboardProvider>
                <Header />
                <Routers />
              </DashboardProvider>
            </CartProvider>
          </AuthProvider>
        </WishlistProvider>
      </SearchProvider>
    </>
  );
}
