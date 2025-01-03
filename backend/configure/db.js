import mongoose from "mongoose";


export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://vivek:Vivek123@cluster0.yphgl.mongodb.net/food-delivery').then(()=>console.log("Db connected!"))
}