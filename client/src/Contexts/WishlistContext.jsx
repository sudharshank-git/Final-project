import {createContext, useState} from "react";

export const WishlistContext = createContext();

export function WishlistProvider({children}) {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function addToWishlist(product) {
        if (wishlistItems.some((item) => item.id === product.id)) {
        setError("Item is already in the wishlist.");
        return;
        }
        setWishlistItems((prevItems) => [...prevItems, product]);
        setError("");
    }

    function removeFromWishlist(productId) {
        setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
        );
    }

    function onWishlistCount(){
        return wishlistItems.length;
    }
    return (
        <WishlistContext.Provider value={{ wishlistItems, error, addToWishlist, removeFromWishlist, onWishlistCount, loading, setLoading, setError }}>
        {children}
        </WishlistContext.Provider>
    );
}