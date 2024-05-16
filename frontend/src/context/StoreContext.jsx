import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://food-delivery-fx0r.onrender.com"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])
    const [userInfo, setUserInfo] = useState(null);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    }

    const searchFood = async (keyword) => {
        const response = await axios.get(`${url}/api/food/search?keyword=${keyword}`);
        setFoodList(response.data.data);
    }

    const getUserInfo = async () => {
        if (token) {
            const response = await axios.get(url + "/api/user/info", { headers: { token } });
            setUserInfo(response.data.data);
        }
    };

    const updateUser = async (userData) => {
        try {
            const response = await axios.post(`${url}/api/user/update`, userData, {
                headers: { token }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating user information:', error);
            return { success: false, message: 'Error updating user information' };
        }
    };

    useEffect(() => {
        // Load initial data when the component mounts
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        searchFood,
        updateUser,
        getUserInfo,
        setUserInfo
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
