import React, { useContext, useState } from 'react'
import './login.css'
import { assets } from '../../assets/assets';
import { Storecontext } from '../../context/Storecontext';
import axios from "axios"


const Loginpopup = ({setshowLogin}) => {

  const {url,settoken}=useContext(Storecontext)
    const [currentState,setcurrentState]=useState("Login");
    const [data,setdata]=useState({
      name:"",
      email:"",
      password:""
    })

  const onChangerhandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setdata(data=>({...data,[name]:value}))
  }

  const onlogin=async (event)=>{
   event.preventDefault();
   let newUrl=url;
   if(currentState==="Login"){
    newUrl += "/api/user/login"
   }
   else{
    newUrl += "/api/user/register"
   }

   const response=await axios.post(newUrl,data);

   if(response.data.success){
     settoken(response.data.token);
     localStorage.setItem("token",response.data.token)
     setshowLogin(false)
   }
   else{
    alert(response.data.message)
   }


  }

  return (
    <div className='loginpopup'>
       <form onSubmit={onlogin} className="loginpopupcontainer">
        <div className="loginpopuptitle">
            <h2>
                   {currentState}
            </h2>

            <img onClick={()=>setshowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="loginpopupinputs">
            {currentState==='Login'?<></>: <input name='name' onChange={onChangerhandler} value={data.name} type="text" placeholder='Your name' required />}
           
            <input name='email' onChange={onChangerhandler} value={data.email}  type="email" placeholder='Your email' required />
             <input name="password" onChange={onChangerhandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currentState==='sign up'?"Create account":"Login"}</button>

      <div className="loginpopupcondition">
        <input type="checkbox" required  />
        <p>By continuing I agree to the of use and privacy policy</p>
      </div>
      {currentState==='Login'
      ?<p>Create New account ?<span onClick={()=>setcurrentState("sign up")}>  Click Here</span></p>
      :<p>Already Have an account ?<span onClick={()=>setcurrentState("Login")}>Login here</span></p>
      }
       </form>
    </div>
  )
}

export default Loginpopup
