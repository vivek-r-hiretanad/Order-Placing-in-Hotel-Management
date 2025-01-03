// import express from 'express'
// import { addfood,listfood,removeFood,updateAvailability } from '../controller/Foodcontroller.js'
// import multer from 'multer'


// const foodrouter=express.Router();

// //Image storage engine
// const storage=multer.diskStorage({
//     destination:"upload",
//     filename:(req,file,cb)=>{
// return cb(null,` ₹{Date.now()} ₹{file.originalname}`)
//     }
// })


// const upload=multer({storage:storage})

// //post is ude a dat to server ...it analysis ....sends response
// foodrouter.post('/add',upload.single("image"),addfood)
// foodrouter.get('/list',listfood)
// foodrouter.post('/remove',removeFood);
// foodrouter.put('/update-availability', updateAvailability); // Ensure this line is added




// export default foodrouter;



import express from 'express';
import { addfood, listfood, removeFood, updateAvailability } from '../controller/Foodcontroller.js';
import multer from 'multer';

const foodrouter = express.Router();

// Image storage engine configuration
const storage = multer.diskStorage({
  destination: "upload", // Directory where images will be uploaded
  filename: (req, file, cb) => {
    // Proper string interpolation for filename
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Multer configuration for image upload
const upload = multer({ storage: storage });

// Routes for food operations
foodrouter.post('/add', upload.single("image"), addfood); // Add food item (with image upload)
foodrouter.get('/list', listfood); // List all food items
foodrouter.post('/remove', removeFood); // Remove food item
foodrouter.put('/update-availability', updateAvailability); // Update food item availability

export default foodrouter;


