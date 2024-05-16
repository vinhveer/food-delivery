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
        if (page < 1) page = 1
        if (page > totalPages) page = totalPages
        setCurrentPage(page)
    }

    // Determine the start and end page numbers for the pagination control
    const startPage = Math.max(1, currentPage - 1)
    const endPage = Math.min(totalPages, startPage + 2)

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
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(page => (
                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default FoodDisplay
