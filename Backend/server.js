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

connectDB();
connectCloudinary();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://ecommerce-frontend-two-phi.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));



app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/chatbot", chatbotRouter);

// Root route
app.get("/", (req, res) => res.send("✅ API is working and connected to chatbot."));

// Start server
app.listen(port, () => console.log(`✅ Server running on PORT: ${port}`));
