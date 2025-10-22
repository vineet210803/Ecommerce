import express from "express";
import cors from "cors";
import "dotenv/config";
import fetch from "node-fetch";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import chatbotRouter from "./routes/chatbotRoute.js";
const app = express();
const port = process.env.PORT || 3000;

// Connect to DB & Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

// CORS setup: CRITICAL FIX: Allow both local and deployed frontend origins
const allowedOrigins = [
  "http://localhost:5173", // Local frontend (running React/Vite)
  "https://ecommerce-frontend-two-phi.vercel.app", // Deployed Vercel frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    // If origin is not provided (e.g., direct API calls, or certain environments like Vercel serverless functions), allow it
    if (!origin) return callback(null, true);
    
    // Check if the requesting origin is in the allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Reject if origin is not allowed
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      callback(new Error(msg), false);
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/chatbot", chatbotRouter); 

// Root
app.get("/", (req, res) => res.send("API is working"));

// Start server
app.listen(port, () => console.log(`✅ Server running on PORT: ${port}`));
