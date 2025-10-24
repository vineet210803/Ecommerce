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
app.use(cors())


app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/chatbot", chatbotRouter);

app.get("/", (req, res) => res.send("✅ API is working."));

app.listen(port, () => console.log(`✅ Server running on PORT: ${port}`));
