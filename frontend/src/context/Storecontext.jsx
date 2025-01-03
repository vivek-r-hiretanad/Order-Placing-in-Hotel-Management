import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Storecontext = createContext(null);

const StorecontextProvider = (props) => {
  const [cartitem, setcartitem] = useState({});
  const url = "http://localhost:4000";
  const [token, settoken] = useState("");
  const [food_list, setfoodlist] = useState([]);

  // Add to cart
  const addtocart = async (itemId) => {
    setcartitem((prev) => {
      const newQuantity = prev[itemId] ? prev[itemId] + 1 : 1;
      return { ...prev, [itemId]: newQuantity };
    });

    // Update the food list quantity
    setfoodlist((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Remove from cart
  const removefromCart = async (itemId) => {
    setcartitem((prev) => {
      if (prev[itemId] > 0) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      }
      return prev;
    });

    setfoodlist((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Get total cart amount
  const getTotalCartamount = () => {
    let totalAmount = 0;
    for (const item in cartitem) {
      if (cartitem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartitem[item];
        }
      }
    }
    return totalAmount;
  };

  // Fetch food list from backend
  // const fetchfoodlist = async () => {
  //   const response = await axios.get(url + "/api/food/list");
  //   setfoodlist(response.data.data);
  // };
  const fetchfoodlist = async () => {
    const response = await axios.get(url + "/api/food/list");
    setfoodlist(response.data.data);
};


  // Load cart data from backend
  const loadcartdata = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setcartitem(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchfoodlist();

      if (localStorage.getItem("token")) {
        settoken(localStorage.getItem("token"));
        await loadcartdata(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartitem,
    setcartitem,
    addtocart,
    removefromCart,
    getTotalCartamount,  // Include this function in context
    url,
    token,
    settoken,
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default StorecontextProvider;
