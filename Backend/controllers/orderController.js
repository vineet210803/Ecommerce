import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// global variables
const currency = 'inr'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


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

const placeorderStripe = async (req, res) => {

  try {
   const { userId, items, amount, address } = req.body;
   const {origin} = req.headers
   const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item)=>({
      price_data:{
        currency: currency,
        product_data:{
          name:item.name
        },
        unit_amount: item.price*100
      },
      quantity: item.quantity
    }))
      line_items.push({
        price_data:{
        currency: currency,
        product_data:{
          name:'Delivery charges'
        },
        unit_amount: deliveryCharge*100
      },
      quantity: 1
      })

      const session =await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}` , 
        cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode: 'payment',
      })

      res.json({success: true, session_url: session.url})
  } catch (error) {
     console.log(error);  
    res.json({ success: false, message: error.message });
    
  }

};

// verify stripe
const verifyStripe = async (req, res)=>{
  const { orderId, success,userId }= req.body
  try {
    if (success === "true") {
      await orderModel. findByIdAndUpdate(orderId, {payment:true});
      await userModel. findByIdAndUpdate(userId, {cartData: {}})
      res. json({success: true});
    } else {
      await orderModel. findByIdAndDelete(orderId)
      res. json({success:false})
    }
    
  } catch (error) {
    console.log(error);  
    res.json({ success: false, message: error.message });
  }
  
}


const placeorderRazorpay = async (req, res) => {};
const allorder = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({success: true, orders})
  } catch (error) {
    console.log(error);  
    res.json({ success: false, message: error.message });
  }
};
const updatestatus = async (req, res) => {
  try {
    const {orderId, status} = req.body

    await orderModel.findByIdAndUpdate(orderId, {status})

    res.json({success: true, message: "Status Updated!"})

  } catch (error) {
    console.log(error);  
    res.json({ success: false, message: error.message });
  }
};

export {
  placeorder,
  placeorderStripe,
  placeorderRazorpay,
  allorder,
  userorder,
  updatestatus,
  verifyStripe
};
