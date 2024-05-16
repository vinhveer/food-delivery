import React, { useContext, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const { food_list } = useContext(StoreContext)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8

    // Filtered list based on category
    const filteredList = category === "All" ? food_list : food_list.filter(item => item.category === category)

    // Calculate the products to be displayed on the current page
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem)

    // Calculate total pages
    const totalPages = Math.ceil(filteredList.length / itemsPerPage)

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className='food-display' id='food-display'>
            <h2 className='h2we'>Top dishes near you</h2>
            <div className="food-display-list">
                {currentItems.map((item) => (
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
            <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default FoodDisplay
