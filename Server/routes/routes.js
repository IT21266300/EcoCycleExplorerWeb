import express from 'express';

// Routes
import authController from './auth/authRoutes.js';
import userController from './user/userRoutes.js';
import staffController from './staff/StaffRoutes.js';

// Middleware Validation
import validateToken from '../middleware/validateTokenHandler.js';

const app = express.Router();

app.use('/auth', authController);
app.use('/user', validateToken, userController);
app.use('/staff', validateToken, staffController);

export default app;
