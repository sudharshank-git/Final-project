import {CartContext} from "./CartContext";
import {SearchContext} from "./SearchContext";
import {useContext} from "react";
import {AuthContext} from "./AuthContext";

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

export function useCart() {
  const context = useContext(CartContext);
    if (!context) {
    throw new Error("useCart must be used within a CartProvider");
    }   
    return context;
}


export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    } 
    return context;
}