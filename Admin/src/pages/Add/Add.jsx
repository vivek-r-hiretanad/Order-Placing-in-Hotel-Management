import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [image, setimage] = useState(null);
    const [data, setdata] = useState({
        name: "",
        description: "",
        price: '',
        category: "Salad",
        quantity: 0,
        availability: true,
    });

    const onChageHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setdata(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        formData.append("quantity", Number(data.quantity));  // Ensure quantity is a number
        formData.append("availability", data.availability === 'true');  // Ensure availability is a boolean

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setdata({
                    name: "",
                    description: "",
                    price: '',
                    category: "Salad",
                    quantity: 0,
                    availability: true,
                });
                setimage(null); // Reset the image state
                toast.success(response.data.message); // Show success notification
            } else {
                toast.error("Failed to add food item. Please try again."); // Show error notification
            }
        } catch (error) {
            toast.error("An error occurred while adding the food item."); // Show error notification
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-imageupload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setimage(e.target.files[0])} type='file' id="image" hidden required />
                </div>
                <div className="add-productname flex-col">
                    <p>Product name</p>
                    <input onChange={onChageHandler} value={data.name} type="text" name="name" placeholder="Type here" required />
                </div>
                <div className="add-productdescription flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChageHandler} value={data.description} name="description" rows="6" placeholder='Write content Here' required></textarea>
                </div>

                <div className="categoryprice">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChageHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure veg">Pure veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input type='number' onChange={onChageHandler} value={data.price} name='price' placeholder=' ₹10' required />
                    </div>
                </div>

                <div className="quantity-availability">
                    <div className="add-quantity flex-col">
                        <p>Units Available</p>
                        <button
                            type="button"
                            onClick={() => setdata({ ...data, quantity: data.quantity + 1 })}
                        >
                            +
                        </button>
                        <input
                            type="number"
                            name="quantity"
                            value={data.quantity}
                            onChange={onChageHandler}
                        />
                        <button
                            type="button"
                            onClick={() => setdata({ ...data, quantity: data.quantity - 1 })}
                            disabled={data.quantity <= 0}
                        >
                            -
                        </button>
                    </div>
                    <div className="add-availability flex-col">
                        <p>Availability</p>
                        <select onChange={onChageHandler} name="availability" value={data.availability}>
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                    </div>
                </div>

                <button type='submit' className='Addbutton'>Add</button>
            </form>
        </div>
    );
}

export default Add;
