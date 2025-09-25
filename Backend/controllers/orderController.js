import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeorder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      Payment: false, 
      Date: Date.now(),
    };

    const newOrder = new orderModel(orderData)
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {cartData: {}})

    res.json({success: true, message: "Order Placed!"})


  } catch (error) {
    console.log(error)
    res.json(error.message)
  }
};
const placeorderStripe = async (req, res) => {

};
const placeorderRazorpay = async (req, res) => {

};

const allorder = async (req, res) => {
    
};

const userorder = async (req, res) => {};

const updatestatus = async (req, res) => {};

export {
  placeorder,
  placeorderStripe,
  placeorderRazorpay,
  allorder,
  userorder,
  updatestatus,
};
