// import React, { useState, useEffect } from 'react';
// import './Navbar.css';
// import { assets } from '../../assets/assets';

// const Navbar = () => {
//   const [foodList, setFoodList] = useState([]);

//   useEffect(() => {
//     const fetchFoodList = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/api/food/list');
//         const data = await response.json();
//         setFoodList(data.data);  // Assuming the backend sends data under 'data' key
//       } catch (error) {
//         console.error('Error fetching food items:', error);
//       }
//     };

//     fetchFoodList();
//   }, []);

//   return (
//     <div className="Navbar">
//       <img className="logo" src={assets.V4_logo} alt="" />
//       ADMIN PANEL
//       <img className="Profile" src={assets.profile_image} alt="" />
//     </div>
//   );
// };

// export default Navbar;





import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => (
    <div className="Navbar">
        <img className="logo" src={assets.v4_logo} alt="Admin Logo" />
        <h1>ADMIN PANEL</h1>
        <img className="Profile" src={assets.profile_image} alt="Profile" />
    </div>
);

export default Navbar;
