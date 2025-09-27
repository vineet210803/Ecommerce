import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place order
const placeorder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get orders for a user
const userorder = async (req, res) => {
  try {
    const {userId} = req.body
    // console.log(userId)
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);  
    res.json({ success: false, message: error.message });
  }
};

const placeorderStripe = async (req, res) => {};
const placeorderRazorpay = async (req, res) => {};
const allorder = async (req, res) => {};
const updatestatus = async (req, res) => {};

export {
  placeorder,
  placeorderStripe,
  placeorderRazorpay,
  allorder,
  userorder,
  updatestatus,
};
