import usermodel from "../model/usermodel.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from "validator"


//Login -user

const loginUser=async(req,res)=>{
     
    const {email,password}=req.body;
    try {
        const user=await usermodel.findOne({email})
        if(!user){
            returnres.json({success:false,message:"User does not Exist..."});
        }
           
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({succes:false,message:"Invalid password ..."})

        }

        const token=creatToken(user._id);
        res.json({success:true,token})



        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
        
    }


}




const creatToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}




//Register User

const registerUser=async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        //Checking is user already exist ????
        const exist=await usermodel.findOne({email});
        if(exist){
            return res.json({success:false,message:"user already exists"})

        }
        //validating email   format and strong [assword]
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter valid email "})
        }
         if(password.length<8){
            return res.json({success:false,message:"please strong Password of 8 character"})
         }

         //hashing user password
         const salt=await bcrypt.genSalt(10);
         const hashedPassword=await bcrypt.hash(password,salt);

         const newUser=new usermodel({
            name:name,
            email:email,
            password:hashedPassword
         })

        const user= await newUser.save()
        const token=creatToken(user._id)
        res.json({success:true,token})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
        
    }
}


export {loginUser,registerUser}