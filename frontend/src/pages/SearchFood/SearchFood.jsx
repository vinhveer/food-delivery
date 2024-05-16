import React, { useContext, useState, useEffect, useCallback } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import './SearchFood.css';

const SearchFood = () => {
    const { searchFood, food_list } = useContext(StoreContext);
    const [keyword, setKeyword] = useState("");
    const [debouncedKeyword, setDebouncedKeyword] = useState("");

    const debounce = (func, delay) => {
        let debounceTimer;
        return (...args) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const handleSearch = useCallback(
        debounce((value) => {
            setDebouncedKeyword(value);
        }, 200),
        []
    );

    useEffect(() => {
        if (debouncedKeyword) {
            searchFood(debouncedKeyword);
        }
    }, [debouncedKeyword, searchFood]);

    const handleChange = (e) => {
        setKeyword(e.target.value);
        handleSearch(e.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchFood(keyword);
        }
    };

    return (
        <div className='search-food'>
            <input
                type="text"
                value={keyword}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Search for food..."
                className="search-input"
            />
            {food_list.length === 0 ? (
                <p>No results</p>
            ) : (
                <div className="food-display-list">
                    {food_list.map((item) => (
                        <FoodItem
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchFood;
