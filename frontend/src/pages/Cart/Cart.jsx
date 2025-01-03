import React, { useContext } from 'react';
import './Cart.css';
import { Storecontext } from '../../context/Storecontext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartitem, addtocart, removefromCart, getTotalCartamount, food_list, url } = useContext(Storecontext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cartitems">
        <div className="cartitemstitle">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartitem[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cartitemstitle cartitemitem">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p> ₹{item.price}</p>
                  <p>{cartitem[item._id]}</p>
                  <p> ₹{item.price * cartitem[item._id]}</p>
                  <p onClick={() => removefromCart(item._id)} className='X'>X</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cartbottom">
        <div className="carttotal">
          <h2>Cart Total</h2>
          <div>
            <div className="carttotaldetial">
              <p>Subtotal</p>
              <p> ₹{getTotalCartamount()}</p>
            </div>
            <hr />
            <div className="carttotaldetial">
              <p>Tax</p>
              <p> ₹{getTotalCartamount() === 0 ? 0 : 10}</p>
            </div>
            <hr />
            <div className="carttotaldetial">
              <b>Total</b>
              <b> ₹{getTotalCartamount() === 0 ? 0 : getTotalCartamount() + 10}</b>
            </div>
          </div>
          <button onClick={() => navigate('/place-order')}>Proceed to Checkout</button>
        </div>
        
        <div className="cartpromocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocodeinput'>
              <input type="text" placeholder='promo-code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
