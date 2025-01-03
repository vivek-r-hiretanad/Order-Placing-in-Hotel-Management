import express from 'express'
import { addTocart,removefromCart,getcart } from '../controller/Cartcontroller.js'
import authMiddleware  from '../middleware/auth.js';

const cartrouter=express.Router();

cartrouter.post("/add",authMiddleware,addTocart);
cartrouter.post("/remove",authMiddleware,removefromCart);
cartrouter.post("/get",authMiddleware,getcart);

export default cartrouter;


