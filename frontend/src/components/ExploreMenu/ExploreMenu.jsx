import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>In the next part we will make the back-end and admin panel of this food delivery website / web app. We will make the project full stack with the help of MongoDB, Express, React and Node JS.</p>
            <div className="explore-menu-list">
                {menu_list.map((item) => {
                    return (
                        <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={item.menu_name} className='explore-menu-list-item'>
                            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
                            <p>{item.menu_name}</p>
                        </div>
                    );
                })}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;