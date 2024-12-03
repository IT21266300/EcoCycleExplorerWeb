import express from 'express';
import { generateTokenHandler, registerUserHandler, sendOtpForVerification, resendOtpForVerification } from '../../controllers/auth.controller.js'
import { signUp, signIn } from '../../controllers/staff.controller.js';

const router = express.Router();

router.post('/token', generateTokenHandler);
router.post('/register', registerUserHandler); 
router.post('/verify-otp', sendOtpForVerification);
router.post('/resend-otp', resendOtpForVerification);
router.post('/staffregister', signUp);
router.post('/stafflogin', signIn);


export default router;