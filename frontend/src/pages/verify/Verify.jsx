
import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Storecontext } from '../../context/Storecontext';
import axios from 'axios';

const Verify = () => {
    const { url } = useContext(Storecontext);
    const [searchParam] = useSearchParams();
    const navigate = useNavigate();

    const success = searchParam.get("success");
    const orderId = searchParam.get("orderId");

    const verifyPayment = async () => {
        console.log("Success:", success, "Order ID:", orderId); // Log the params for debugging

        try {
            // Log URL and payload for additional debugging
            console.log(`Sending request to  ₹{url}/api/order/verify with payload`, { success, orderId });
            
            const response = await axios.post(` ₹{url}/api/order/verify`, { success, orderId });
            console.log("API Response:", response.data); // Log API response for debugging
            
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/"); // Redirect to home on failure
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate("/"); // Redirect to home on error
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className="verify">
            <div className="spinner">
                <p>Verifying payment...</p>
            </div>
        </div>
    );
}

export default Verify;

