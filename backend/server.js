import express from "express"
import cors from "cors"
import { connectDB } from "./configure/db.js"
import foodrouter from "./router/foodrouter.js"
import userroutes from "./router/userroutes.js"
import 'dotenv/config'
import cartrouter from "./router/cartrouter.js"
import orderrouter from "./router/orderrouter.js"

//app configure
const app=express()
const port=4000


//middleware

app.use(express.json())
app.use(cors())

//db connection 
connectDB();

//API endpoints
app.use("/api/food",foodrouter)
app.use("/images",express.static('upload'))
app.use("/api/user",userroutes)
app.use("/api/cart",cartrouter);
app.use('/api/order',orderrouter)


app.get("/",(req,res)=>{
res.send("Api working")
})

app.listen(port,()=>{
    console.log(`Server started on   http://localhost:${port}`)
})


//mongodb+srv://vivek:Vivek123@cluster0.yphgl.mongodb.net/?