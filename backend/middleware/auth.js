import jwt from 'jsonwebtoken'


const authMiddleware= async (req,res,next)=>{
 const {token}=req.headers;
 if(!token){
    return res.json({success:false,message:"Not authorized Login Again"});
 }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error...."});
        
    }
 

}


export default authMiddleware;

// import jwt from 'jsonwebtoken';

// const authMiddleware = async (req, res, next) => {
//     // Retrieve the Authorization header
//     const authHeader = req.headers['authorization'];

//     // Check if Authorization header exists and if it contains 'Bearer' format
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ success: false, message: "Not authorized, please login again" });
//     }

//     // Extract the token from the 'Bearer <token>' format
//     const token = authHeader.split(' ')[1];

//     // Ensure the token exists after extracting
//     if (!token) {
//         return res.status(401).json({ success: false, message: "Not authorized, token missing" });
//     }

//     // Verify JWT token
//     try {
//         // Check if JWT_SECRET is configured
//         if (!process.env.JWT_SECRET) {
//             return res.status(500).json({ success: false, message: "Internal server error: JWT secret not configured" });
//         }

//         // Decode and verify the token
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);

//         // Attach user information (like userId) to request object
//         req.body.userId = token_decode.id;
        
//         // Proceed to the next middleware/route
//         next();
//     } catch (error) {
//         // Handle token verification errors
//         if (error.name === 'TokenExpiredError') {
//             return res.status(401).json({ success: false, message: "Token expired, please login again" });
//         }
//         if (error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ success: false, message: "Invalid token, please login again" });
//         }

//         console.error("JWT Error:", error);
//         return res.status(500).json({ success: false, message: "Error in token verification" });
//     }
// };

// export default authMiddleware;
