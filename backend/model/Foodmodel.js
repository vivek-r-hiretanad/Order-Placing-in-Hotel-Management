// import mongoose, { Schema } from "mongoose";

// const foodSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: String,required: true },
//   category: { type: String, required: true },
// });


// const Foodmodel= mongoose.models.food || mongoose.model("food",foodSchema);

// export default Foodmodel;


import mongoose, { Schema } from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  availability: { type: Number, required: true, default: 0 }, // Add availability field
});

const Foodmodel = mongoose.models.food || mongoose.model("food", foodSchema);

export default Foodmodel;
