import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Update from '../Update/Update'; // Import the Update component

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editingFood, setEditingFood] = useState(null); // State to track the food item being edited

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error('Error');
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error('Error');
    }
  };

  // Function to handle editing a food item
  const editFood = (food) => {
    setEditingFood(food);
  };

  // Function to handle closing the Update modal
  const handleCloseUpdateModal = () => {
    setEditingFood(null); // Reset the editingFood state
  };

  useEffect(() => {
    fetchList();
  }, [editingFood]); // Reload the API data when editingFood changes

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      {/* Render the Update component if editingFood exists */}
      {editingFood && <Update url={url} editingFood={editingFood} setEditingFood={setEditingFood} onClose={handleCloseUpdateModal} />}
      <div className='list-table'>
        <div className='list-table-format'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt='' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              {/* Edit button */}
              <button onClick={() => editFood(item)} className='cursor'>Edit</button>
              <button onClick={() => removeFood(item._id)} className='cursor'>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
