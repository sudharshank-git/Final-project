import ProductList from '../Components/ProductList';

export default function Wishlist() {
    return (
        <div className="home-page">
            <ProductList title= "Wishlist" endpoint="/products" category=""/>
        </div>
    );
}
