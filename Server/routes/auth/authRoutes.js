import express from 'express';
import { generateTokenHandler, registerUserHandler } from '../../controllers/auth.controller.js'

const router = express.Router();

router.get('/token', generateTokenHandler);
router.post('/register', registerUserHandler); 


export default router;