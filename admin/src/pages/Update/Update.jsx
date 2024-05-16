import React, { useState, useEffect } from 'react';
import './Update.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Update = ({ url, editingFood, setEditingFood }) => {
    const [image, setImage] = useState(null); // State to track the image
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad'
    });

    // Set initial data when editingFood changes
    useEffect(() => {
        if (editingFood) {
            setData({
                name: editingFood.name,
                description: editingFood.description,
                price: editingFood.price,
                category: editingFood.category
            });
        }
    }, [editingFood]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id', editingFood._id); // Add the ID of the edited food
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post(`${url}/api/food/update`, formData);
            if (response.data.success) {
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Salad'
                });
                setImage(null);
                setEditingFood(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating food:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className='add'>
                    <form className='flex-col' onSubmit={onSubmitHandler}>
                        <div className='add-img-upload flex-col'>
                            <p>Upload Image</p>
                            <label htmlFor='image'>
                                {/* Conditionally render the image or the placeholder */}
                                {image ? (
                                    <img className='image' src={URL.createObjectURL(image)} alt='' />
                                ) : (
                                    <img className='image' src={assets.upload_area} alt='' />
                                )}
                            </label>
                            <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden />
                        </div>
                        <div className='add-product-name flex-col'>
                            <p>Product name</p>
                            <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' />
                        </div>
                        <div className='add-product-description flex-col'>
                            <p>Product Description</p>
                            <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='Write content here' required></textarea>
                        </div>
                        <div className='add-category-price'>
                            <div className='add-category flex-col'>
                                <p>Product Category</p>
                                <select className='selectt' onChange={onChangeHandler} name='category' value={data.category}>
                                    <option value='Salad'>Salad</option>
                                    <option value='Rolls'>Rolls</option>
                                    <option value='Deserts'>Deserts</option>
                                    <option value='Sandwich'>Sandwich</option>
                                    <option value='Cake'>Cake</option>
                                    <option value='Pure Veg'>Pure Veg</option>
                                    <option value='Pasta'>Pasta</option>
                                    <option value='Noodles'>Noodles</option>
                                </select>
                            </div>
                            <div className='add-price flex-col'>
                                <p>Product Price</p>
                                <input className='inputclasa' onChange={onChangeHandler} value={data.price} type='Number' name='price' placeholder='$20' />
                            </div>
                        </div>
                        <div className="btn-container">
                            <button type='submit' className='add-btn'>
                                UPDATE
                            </button>
                            <button type='button' className='add-btn' onClick={() => setEditingFood(null)}>
                                CANCEL
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;
