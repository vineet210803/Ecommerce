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
import chatbotRouter from "./routes/chatbotRoute.js"; // ✅ new import

const app = express();
const port = process.env.PORT || 3000;

// Connect to DB & Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

// CORS setup
const corsOptions = {
  origin: "http://localhost:5173", // frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/chatbot", chatbotRouter); // ✅ mount chatbot route

// Root
app.get("/", (req, res) => res.send("API is working"));

// Start server
app.listen(port, () => console.log(`✅ Server running on PORT: ${port}`));
