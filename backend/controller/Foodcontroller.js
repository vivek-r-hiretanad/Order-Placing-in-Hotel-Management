

import Foodmodel from "../model/Foodmodel.js"; // Import Food model
import fs from "fs"; // File system module to delete images

// Add food item
const addfood = async (req, res) => {
  // Get the image filename from the uploaded file
  let image_filename = `${req.file.filename}`;

  // Create a new food item in the database
  const food = new Foodmodel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
    availability: req.body.availability || 0, // Default availability is 0
  });

  try {
    // Save the food item to the database
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error: Food not added" });
  }
};

// List all food items
const listfood = async (req, res) => {
  try {
    // Fetch all food items from the database
    const foods = await Foodmodel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching food items" });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    // Find the food item by its ID
    const food = await Foodmodel.findById(req.body.id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Remove the food item's image from the server
    fs.unlink(`upload/${food.image}`, () => {});

    // Delete the food item from the database
    await Foodmodel.findByIdAndDelete(req.body.id);

    // Optional: Notify users about the removed item (real-time updates if needed)

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error: Food not Removed" });
  }
};

// Update food item availability
const updateAvailability = async (req, res) => {
  const { id, newAvailability } = req.body;

  // Ensure the newAvailability is a valid number
  if (newAvailability < 0) {
    return res.status(400).json({ success: false, message: "Invalid availability value" });
  }

  try {
    // Update the food availability and return the updated food document
    const food = await Foodmodel.findByIdAndUpdate(
      id,
      { availability: newAvailability },
      { new: true } // This ensures the updated document is returned
    );

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Send the updated food data back to the frontend
    res.json({ success: true, data: food, message: "Availability updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error updating availability" });
  }
};


export { addfood, listfood, removeFood, updateAvailability };
