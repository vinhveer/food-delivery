import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './EditUser.css';

const EditUser = () => {
    const { updateUser, token, url, userInfo, setUserInfo } = useContext(StoreContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${url}/api/user/info`, {
                    headers: { token }
                });
                if (response.data.success) {
                    const user = response.data.data;
                    setName(user.name);
                    setEmail(user.email);
                    setUserInfo(user); // Update userInfo in context
                } else {
                    alert('Failed to fetch user information');
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
                alert('Error fetching user information');
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [url, token, setUserInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await updateUser({ name, email, password });
        if (response.success) {
            alert('User information updated successfully');
            // Redirect or handle success accordingly
        } else {
            alert('Failed to update user information');
        }
    };

    return (
        <div className="user-edit-page">
            <h2>Edit User Information</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter new password"
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditUser;
