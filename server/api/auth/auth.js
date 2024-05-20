import express from 'express';
import { apiRegisterPost } from './apiRegisterPost.js';
import { apiLoginPost } from './apiLoginPost.js';
import { apiLoginGet } from './apiLoginGet.js';

const authRouter = express.Router();

authRouter.post('/register', apiRegisterPost);
authRouter.post('/login', apiLoginPost);
authRouter.get('/login', apiLoginGet);

export { authRouter };