import express from 'express';
import { loginUser, regUser, adminLogin } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post('/register', regUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

export default userRouter;

 