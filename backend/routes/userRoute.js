import express from 'express';
import { loginUser,registerUser,adminLogin, forgetPasswordController } from '../controllers/userController.js';
import resetPasswordController from '../controllers/resetPasswordController.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.post('/forgot-password',forgetPasswordController);

userRouter.post('/reset-password/:token', resetPasswordController);

export default userRouter;