// // import React, { useContext } from 'react';
// // import './Fooditem.css';
// // import { Storecontext } from '../../context/Storecontext';

// // const Fooditem = ({ id, name, price, description, image, availability }) => {
// //   const { cartitem, addtocart, removefromCart, url } = useContext(Storecontext);

// //   return (
// //     <div className='fooditem'>
// //       <div className="fooditemimagecontainer">
// //         <img className='fooditemimage' src={url + "/images/" + image} alt={name} />
        
// //         {availability > 0 ? (
// //           // If availability is greater than 0, show Add/Remove buttons
// //           !cartitem[id] ? (
// //             <img
// //               className='add'
// //               onClick={() => addtocart(id)}
// //               src='/path/to/add-icon-white.png' // Replace with actual path
// //               alt='Add to cart'
// //             />
// //           ) : (
// //             <div className='Fooditemcounter'>
// //               <img
// //                 onClick={() => removefromCart(id)}
// //                 src='/path/to/remove-icon-red.png' // Replace with actual path
// //                 alt='Remove from cart'
// //               />
// //               <p>{cartitem[id]}</p>
// //               <img
// //                 onClick={() => addtocart(id)}
// //                 src='/path/to/add-icon-green.png' // Replace with actual path
// //                 alt='Add to cart'
// //               />
// //             </div>
// //           )
// //         ) : (
// //           // If availability is 0 or less, show "Out of Stock"
// //           <div className="fooditemavailability">
// //             <span className="unavailable">Out of Stock</span>
// //           </div>
// //         )}
// //       </div>
      
// //       <div className="fooditeminfo">
// //         <div className="fooditemnamerating">
// //           <p>{name}</p>
// //           <img src='/path/to/star-rating.png' alt='Rating' />
// //         </div>
// //       </div>
      
// //       <p className="fooditemdescription">{description}</p>
// //       <p className="fooditemprice">₹{price}</p>
// //     </div>
// //   );
// // };

// // export default Fooditem;





// import React, { useContext } from 'react';
// import './Fooditem.css';
// import { assets } from '../../assets/assets';
// import { Storecontext } from '../../context/Storecontext';

// const Fooditem = ({ id, name, price, description, image, availability }) => {
//   const { cartitem, addtocart, removefromCart, url } = useContext(Storecontext);

//   return (
//     <div className='fooditem'>
//       <div className="fooditemimagecontainer">
//         <img className='fooditemimage' src={url + "/images/" + image} alt={name} />
//         {
//           !cartitem[id]
//             ? <img className='add' onClick={() => addtocart(id)} src={assets.add_icon_white} />
//             : <div className='Fooditemcounter'>
//                 <img onClick={() => removefromCart(id)} src={assets.remove_icon_red} />
//                 <p>{cartitem[id]}</p>
//                 <img onClick={() => addtocart(id)} src={assets.add_icon_green} />
//               </div>
//         }
//       </div>
//       <div className="fooditeminfo">
//         <div className="fooditemnamerating">
//           <p>{name}</p>
//         </div>
//         <p className="fooditemdescription">{description}</p>
//         <p className="fooditemprice">₹{price}</p>
//       </div>

//       {/* Availability Badge */}
//       <div className="fooditemavailability">
//         {availability > 0
//           ? <span className="available">Available</span>
//           : <span className="unavailable">Out of Stock</span>}
//       </div>
//     </div>
//   );
// };

// export default Fooditem;






// import React, { useContext } from 'react';
// import './Fooditem.css';
// import { assets } from '../../assets/assets';
// import { Storecontext } from '../../context/Storecontext';

// const Fooditem = ({ id, name, price, description, image, availability }) => {
//     const { cartitem, addtocart, removefromCart, url } = useContext(Storecontext);

//     return (
//         <div className="fooditem">
//             <div className="fooditemimagecontainer">
//                 <img className="fooditemimage" src={url + "/images/" + image} alt={name} />
//                 {availability > 0 ? (
//                     !cartitem[id] ? (
//                         <img
//                             className="add"
//                             onClick={() => addtocart(id)}
//                             src={assets.add_icon_white}
//                             alt="Add to cart"
//                         />
//                     ) : (
//                         <div className="Fooditemcounter">
//                             <img
//                                 onClick={() => removefromCart(id)}
//                                 src={assets.remove_icon_red}
//                                 alt="Remove from cart"
//                             />
//                             <p>{cartitem[id]}</p>
//                             <img
//                                 onClick={() => addtocart(id)}
//                                 src={assets.add_icon_green}
//                                 alt="Add to cart"
//                             />
//                         </div>
//                     )
//                 ) : (
//                     <div className="fooditemavailability">
//                         <span className="unavailable">Out of Stock</span>
//                     </div>
//                 )}
//             </div>
//             <div className="fooditeminfo">
//                 <p>{name}</p>
//                 <p className="fooditemdescription">{description}</p>
//                 <p className="fooditemprice">₹{price}</p>
//             </div>
//         </div>
//     );
// };

// export default Fooditem;



import React, { useContext } from 'react';
import './Fooditem.css';
import { assets } from '../../assets/assets';
import { Storecontext } from '../../context/Storecontext';

const Fooditem = ({ id, name, price, description, image, availability }) => {
    const { cartitem, addtocart, removefromCart, url } = useContext(Storecontext);

    const updateCartOnBackend = async (action, itemId) => {
        try {
            const response = await fetch(`${url}/api/cart/${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: itemId }),
            });

            if (!response.ok) {
                const data = await response.json();
                alert(data.message); // Show the error message from the backend
                return;
            }

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    // const handleAddToCart = (itemId) => {
    //     if (availability <= 0) {
    //         alert("This item is out of stock");
    //         return;
    //     }
    //     addtocart(itemId);
    //     updateCartOnBackend('add', itemId); // Sync with the backend
    // };

    // const handleRemoveFromCart = (itemId) => {
    //     removefromCart(itemId);
    //     updateCartOnBackend('remove', itemId); // Sync with the backend
    // };
    const handleAddToCart = async (itemId) => {
        if (availability <= 0) {
            alert("This item is out of stock");
            return;
        }
    
        // Add item to cart
        addtocart(itemId);
    
        // Update availability on the backend
        const response = await updateCartOnBackend('add', itemId);
    
        if (response.success) {
            alert(`Item added to cart. ${response.food.availability} items remaining.`);
        } else {
            alert(response.message);
        }
    };
    
    const handleRemoveFromCart = async (itemId) => {
        // Remove item from cart
        removefromCart(itemId);
    
        // Update availability on the backend
        const response = await updateCartOnBackend('remove', itemId);
    
        if (response.success) {
            alert(`Item removed from cart. ${response.food.availability} items remaining.`);
        } else {
            alert(response.message);
        }
    };
    
    return (
        <div className="fooditem">
            <div className="fooditemimagecontainer">
                <img className="fooditemimage" src={url + "/images/" + image} alt={name} />
                {availability > 0 ? (
                    !cartitem[id] ? (
                        <img
                            className="add"
                            onClick={() => handleAddToCart(id)} // Update cart and backend
                            src={assets.add_icon_white}
                            alt="Add to cart"
                        />
                    ) : (
                        <div className="Fooditemcounter">
                            <img
                                onClick={() => handleRemoveFromCart(id)} // Update cart and backend
                                src={assets.remove_icon_red}
                                alt="Remove from cart"
                            />
                            <p>{cartitem[id]}</p>
                            <img
                                onClick={() => handleAddToCart(id)} // Update cart and backend
                                src={assets.add_icon_green}
                                alt="Add to cart"
                            />
                        </div>
                    )
                ) : (
                    <div className="fooditemavailability">
                        <span className="unavailable">Out of Stock</span>
                    </div>
                )}
            </div>
            <div className="fooditeminfo">
                <p>{name}</p>
                <p className="fooditemdescription">{description}</p>
                <p className="fooditemprice">₹{price}</p>
            </div>
        </div>
    );
};

export default Fooditem;
