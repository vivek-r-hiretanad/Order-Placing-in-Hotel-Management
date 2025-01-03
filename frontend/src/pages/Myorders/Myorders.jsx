import React, { useContext, useEffect, useState } from 'react';
import './Myorders.css';
import { Storecontext } from '../../context/Storecontext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Myorders = () => {
    const { url, token } = useContext(Storecontext)
    const [data, setData] = useState([]);


    const fetch_orders = async () => {
     
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);            
      
    };

    // Fetch orders when the token is available
    useEffect(() => {
        if(token){
            fetch_orders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My order</h2>
            <div className="container">
                {data.map((order,index)=>{
                    return(
                    <div key={index} className="my-order-order">
                <img src={assets.parcel_icon} alt="" />
                <p>
                    {order.items.map((item,index)=>{
                        if(index === order.items.length-1){
                            return item.name +" x " + item.quantity; 
                        }
                        else{
                            return item.name +" x " + item.quantity +","
                        }

                    })}
                </p>
          
        <p>
             ₹{order.amount}.00
        </p>
        <p>
            Items:{order.items.length}
        </p>
        <p><span>&#x25cf;</span><b>{order.status}</b></p>
        <button onClick={fetch_orders} >Track order</button>

                    </div>
                    )
                })}
            </div>
           
        </div>
    );
};

export default Myorders;


