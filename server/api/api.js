import express from 'express';
import { authRouter } from './auth/auth.js';
import { carsRouter } from './cars/cars.js';
import { cartRouter } from './cart/cart.js';
import { uploadRouter } from './upload/upload.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/cars', carsRouter);
apiRouter.use('/upload', uploadRouter);
apiRouter.use('/cart-details', cartRouter);

export { apiRouter };