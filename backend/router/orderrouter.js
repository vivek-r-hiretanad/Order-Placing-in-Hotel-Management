// import express from 'express'
// import { list_orders, placeorder ,updatestatus,userorders,verifyorder,removeOrder } from '../controller/ordercontroller.js'
// import authMiddleware  from '../middleware/auth.js'


// const orderrouter=express.Router();

// orderrouter.post("/place",authMiddleware,placeorder);
// orderrouter.post("/verify",verifyorder)
// orderrouter.post("/userorders",authMiddleware,userorders)
// orderrouter.get('/list',list_orders)
// orderrouter.post('/status',updatestatus);
// orderrouter.post('/remove', authMiddleware, removeOrder);
// export default orderrouter;



import express from 'express';
import { list_orders, placeorder, updatestatus, userorders, verifyorder, removeOrder } from '../controller/ordercontroller.js';
import authMiddleware from '../middleware/auth.js';

const orderrouter = express.Router();

orderrouter.post("/place", authMiddleware, placeorder);
orderrouter.post("/verify", verifyorder);
orderrouter.post("/userorders", authMiddleware, userorders);
orderrouter.get('/list', list_orders);
orderrouter.post('/status', updatestatus);
orderrouter.post('/remove', authMiddleware, removeOrder);  // Ensure authMiddleware is used here
export default orderrouter;
