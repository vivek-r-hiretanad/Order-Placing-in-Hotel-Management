// import React, { useEffect, useState } from 'react';
// import './List.css';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const List = ({ url }) => {
//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(`${url}/api/food/list`);
//       console.log(response.data); // Log the response for debugging

//       if (response.data.success) {
//         setList(response.data.data); // Set data if API is successful
//       } else {
//         toast.error("Error fetching food list");
//       }
//     } catch (error) {
//       toast.error("Network or server error");
//       console.error(error); // Log error for debugging
//     }
//   };

//   const removeFood = async (foodId) => {
//     try {
//       const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
//       if (response.data.success) {
//         toast.success(response.data.message);
//         fetchList(); // Refresh the list after removing food
//       } else {
//         toast.error("Error removing food");
//       }
//     } catch (error) {
//       toast.error("Network or server error");
//       console.error(error); // Log error for debugging
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, [url]);

//   return (
//     <div className='list add flex-col'>
//       <p>All Foods List</p>
//       <div className="list-table">
//         <div className="list-tableformat title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Availability</b> {/* Display Availability */}
//           <b>Action</b>
//         </div>
//         {list.length > 0 ? (
//           list.map((item, index) => (
//             <div key={index} className="list-tableformat">
//               <img src={`${url}/images/${item.image}`} alt={item.name} />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>₹{item.price}</p>
//               <p>{item.availability} units available</p> {/* Display availability count */}
//               <p onClick={() => removeFood(item._id)} className="cursor">X</p>
//             </div>
//           ))
//         ) : (
//           <p>No items available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default List;






import React, { useState, useEffect } from 'react';
import './List.css'; // Ensure proper styling for buttons and UI
import axios from 'axios';

const List = ({ url }) => {
    const [foodList, setFoodList] = useState([]);

    useEffect(() => {
        const fetchFoodList = async () => {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        };
        fetchFoodList();
    }, [url]);

    // const updateAvailability = async (foodId, newAvailability) => {
    //     if (newAvailability < 0) return; // Prevent negative availability

    //     try {
    //         const response = await axios.put(`${url}/api/food/update-availability`, {
    //             foodId,
    //             newAvailability,
    //         });

    //         // Update local state
    //         setFoodList((prev) =>
    //             prev.map((item) =>
    //                 item._id === foodId ? { ...item, availability: response.data.data.availability } : item
    //             )
    //         );
    //     } catch (error) {
    //         console.error('Error updating availability:', error);
    //     }
    // };
    // const updateAvailability = async (foodId, newAvailability) => {
    //     if (newAvailability < 0) return; // Prevent negative availability
    
    //     try {
    //         const response = await axios.put(`${url}/api/food/update-availability`, {
    //             id: foodId,
    //             newAvailability: newAvailability,
    //         });
    
    //         // Check if the response is successful and contains updated food data
    //         if (response.data.success) {
    //             const updatedFood = response.data.data;
    
    //             // Update the local state to reflect the changes in availability
    //             setFoodList((prev) =>
    //                 prev.map((item) =>
    //                     item._id === foodId
    //                         ? { ...item, availability: updatedFood.availability }
    //                         : item
    //                 )
    //             );
    //         } else {
    //             console.error("Failed to update availability:", response.data.message);
    //         }
    //     } catch (error) {
    //         console.error("Error updating availability:", error);
    //     }
    // };
    
    const updateAvailability = async (foodId, newAvailability) => {
        if (newAvailability < 0) return; // Prevent negative availability
    
        try {
            const response = await axios.put(`${url}/api/food/update-availability`, {
                id: foodId,
                newAvailability: newAvailability,
            });
    
            if (response.data.success) {
                const updatedFood = response.data.data;
                setFoodList((prev) =>
                    prev.map((item) =>
                        item._id === foodId
                            ? { ...item, availability: updatedFood.availability }
                            : item
                    )
                );
            } else {
                console.error("Failed to update availability:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating availability:", error);
        }
    };
    

    return (
        <div className="list">
            <h2>Manage Food Items</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {foodList.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>₹{item.price}</td>
                            <td>{item.availability}</td>
                            <td>
                                <button
                                    onClick={() => updateAvailability(item._id, item.availability - 1)}
                                    disabled={item.availability === 0}
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => updateAvailability(item._id, item.availability + 1)}
                                >
                                    +
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;
