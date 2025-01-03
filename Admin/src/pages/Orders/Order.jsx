import React, { useState, useEffect } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all orders with error handling and loading state
  const fetchAllOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        // Sort orders by arrival (newest first)
        const sortedOrders = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Network or server error");
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  
  


  const statusHandler = async (event, orderId) => {
    const selectedStatus = event.target.value;
  
    try {
      // Send the status update request to the backend
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: selectedStatus,
      });
  
      if (response.data.success) {
        if (selectedStatus === "Delivered" || selectedStatus === "Canceled") {
          // Remove the order from the local state if it's "Delivered" or "Canceled"
          setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
          toast.success(`Order ${selectedStatus} and removed successfully.`);
        } else {
          // Update the order's status in local state for other statuses
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId ? { ...order, status: selectedStatus } : order
            )
          );
          toast.success("Order status updated successfully.");
        }
      } else {
        toast.error(response.data.message || "Error updating status.");
      }
    } catch (error) {
      toast.error("Error updating order status.");
      console.error("Status update error:", error);
    }
  };
  

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order_item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className='order-item-food'>
                {Array.isArray(order.items) && order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="order-item-name">
                
                {order.address.firstname} {order.address.lastname}
              </p>
              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <div className="feedback">
              <h5>Feedback</h5> <br />
            {order.address.feedback}
            </div>
            <div className='order-status'>
              <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;


