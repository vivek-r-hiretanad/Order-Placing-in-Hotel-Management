import express from 'express'
import { loginUser,registerUser } from '../controller/usercontroller.js'


const userroutes=express.Router()

userroutes.post("/register",registerUser);
userroutes.post("/login",loginUser);

export default userroutes;
