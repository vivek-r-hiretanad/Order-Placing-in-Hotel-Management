

import Ordermodel from '../model/Ordermodel.js';
import usermodel from '../model/usermodel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Controller function to handle order removal
const removeOrder = async (req, res) => {
  const { orderId } = req.body;  // Get orderId from the request body
  console.log('Received orderId to remove:', orderId); // Log to check

  try {
    // Delete the order by ID
    const order = await Ordermodel.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.status(200).json({ success: true, message: 'Order removed successfully' });
  } catch (error) {
    console.error('Error removing order:', error);
    return res.status(500).json({ success: false, message: 'Error deleting order' });
  }
};

const placeorder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new Ordermodel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });

    await newOrder.save();
    await usermodel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100  // Assuming "80" is a currency conversion factor
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'Delivery Charges'
        },
        unit_amount: 10 * 100 
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

const verifyorder = async (req, res) => {
  const { orderId, success } = req.body;

  if (!orderId) {
    return res.json({ success: false, message: "Order ID is missing" });
  }

  try {
    if (success === "true") {
      await Ordermodel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment verified" });
    } else if (success === "false") {
      await Ordermodel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment not completed, order canceled" });
    } else {
      res.json({ success: false, message: "Invalid payment status" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};

const userorders = async (req, res) => {
  try {
    const orders = await Ordermodel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

const list_orders = async (req, res) => {
  try {
    const orders = await Ordermodel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};




const updatestatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Order ID and status are required." });
    }

    if (status === "Delivered" || status === "Canceled") {
      // Remove the order from the database
      const deletedOrder = await Ordermodel.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        return res.status(404).json({ success: false, message: "Order not found." });
      }

      // Notify the frontend of successful deletion
      return res.json({ success: true, message: `Order ${status} and removed from the database.` });
    } else {
      // For other statuses, just update the order
      const updatedOrder = await Ordermodel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: "Order not found." });
      }

      // Notify the frontend of status update
      return res.json({ success: true, message: "Status updated successfully.", order: updatedOrder });
    }
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ success: false, message: "Error updating status." });
  }
};



export { placeorder, verifyorder, userorders, list_orders, updatestatus, removeOrder };

