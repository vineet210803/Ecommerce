// ---------- server.js ----------
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

// ✅ Connect to DB & Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

// ✅ Allowlist for frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://ecommerce-frontend-two-phi.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server or same-origin
    if (allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      console.error(`❌ CORS blocked: ${origin}`);
      callback(new Error(`CORS not allowed for ${origin}`), false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// ✅ Handle preflight requests
app.options("*", cors(corsOptions));

// ✅ API Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/chatbot", chatbotRouter);

// Root route
app.get("/", (req, res) => res.send("✅ API is working and connected to chatbot."));

// Start server
app.listen(port, () => console.log(`✅ Server running on PORT: ${port}`));
