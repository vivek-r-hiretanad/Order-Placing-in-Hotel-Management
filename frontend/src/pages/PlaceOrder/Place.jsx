import React, { useContext, useEffect, useState } from 'react';
import './Place.css';
import axios from 'axios';
import { Storecontext } from '../../context/Storecontext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartamount, token, food_list, cartitem, url } = useContext(Storecontext);
  const [data, setData] = useState({
    firstname: "Table ",
    lastname: " 1",
    email: "Table1@gmail.com",
    street: "Kengeri",
    city: "Bangalore",
    state: "Karnataka",
    zipcode: "581110",
    country: "India",
    phone: " 1800 4020854",
    feedback:""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeorder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartitem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartitem[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartamount() + 10,
    };

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data; // Make sure this contains the URL
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartamount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeorder} className='place-order'>
      <div className="placeorderleft">

      <p className="title">Feedback</p>
      <div className="feedback">
  <input
    required
    name="feedback"  // Changed to lowercase 'feedback'
    onChange={onChangeHandler}
    value={data.feedback}
    type="text"
    placeholder="Feedback"
  />
</div>

        <p className="title">Table Information</p>
        <div className="multifields">
          <input required name="firstname" onChange={onChangeHandler} value={data.firstname} type="text" placeholder='First-Name' />
          <input required name="lastname" onChange={onChangeHandler} value={data.lastname} type="text" placeholder='Last-Name' />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />

        <div className="multifields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multifields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip-Code' />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone Number' />
      </div>

      <div className="placeholderight">
        <div className="carttotal">
          <h2>Cart Total</h2>
          <div>
            <div className="carttotaldetial">
              <p>Subtotal</p>
              <p>₹{getTotalCartamount()}</p>
            </div>
            <hr />
            <div className="carttotaldetial">
              <p>Tax</p>
              <p>₹{getTotalCartamount() === 0 ? 0 : 10}</p>
            </div>
            <hr />
            <div className="carttotaldetial">
              <b>Total</b>
              <b> ₹{getTotalCartamount() === 0 ? 0 : getTotalCartamount() + 10}</b>
            </div>
          </div>
          {/* Corrected button type to 'submit' */}
          <button type='submit'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
