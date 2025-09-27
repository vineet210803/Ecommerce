import express from 'express';
import { placeorder, placeorderStripe, placeorderRazorpay, allorder, userorder, updatestatus } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin features
orderRouter.post('/list',adminAuth, allorder);
orderRouter.post('/updatestatus', adminAuth, updatestatus);

// payment features
orderRouter.post('/placeorder', authMiddleware , placeorder);
orderRouter.post('/placestripe', authMiddleware , placeorderStripe);
orderRouter.post('/placerazorpay', authMiddleware , placeorderRazorpay);

// user features
orderRouter.post('/userorder', authMiddleware, userorder);



export default orderRouter;
