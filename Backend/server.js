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

// Connect DB & Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

// ✅ Update CORS for both localhost & deployed frontend
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://ecommerce-frontend-two-phi.vercel.app",
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/chatbot", chatbotRouter); // ✅ chatbot route

// Root route
app.get("/", (req, res) => res.send("✅ Backend is live on Vercel!"));

// Start server (for local)
app.listen(port, () => console.log(`✅ Server running on port ${port}`));

export default app; // ✅ important for Vercel
