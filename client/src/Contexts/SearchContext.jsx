import {createContext, useState} from "react";

const SearchContext = createContext();

export function SearchProvider({children}) {
    const [endpt, setEndpt] = useState("/products");
    const [searchedTxt, setSearchedTxt] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    
    const handleSubmit = (searchTxt) => {
        setEndpt(`/products/filter?name=${encodeURIComponent(searchTxt)}`);
        setSearchedTxt(searchTxt);
    }

    const handleCategoryClick = (category) => {
        setEndpt(`/products/filter?category=${encodeURIComponent(category)}`);
        setSearchedTxt("");
        setSelectedCategory(category);
    }

    return (
        <SearchContext.Provider value={{ endpt, setEndpt, searchedTxt, setSearchedTxt, handleSubmit, handleCategoryClick, selectedCategory, setSelectedCategory }}>
            {children}
        </SearchContext.Provider>
    );
}

export {SearchContext} ;