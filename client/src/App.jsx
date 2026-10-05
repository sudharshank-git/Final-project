import Header from "./Components/Header.jsx";
import Route from "./Routing/Route.jsx";
import { CartProvider } from "./Contexts/CartContext.jsx";
import { SearchProvider } from "./Contexts/SearchContext.jsx";


export default function App() {

    
  return (
    <>
      <SearchProvider>
        <CartProvider>
          <Header />
          <Route />
        </CartProvider>
      </SearchProvider>
    </>
  );
}