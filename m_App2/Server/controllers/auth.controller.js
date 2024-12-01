import bcrypt from 'bcryptjs';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils.js';

//const router = express.Router();

//Models 
import UserModel from '../Models/UserModel.js'

// @POST("/token")
export const generateTokenHandler = expressAsyncHandler(async (req, res) => {
      const { email, password } = req.body;
  
      const user = await UserModel.findOne({ email });
  
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          res.send({
            token: generateToken(user),
          });
        } else {
          res.status(400).send({ message: 'Invalid username or password' });
        }
      } else {
        res.status(400).send({ message: 'Invalid username or password' });
      }
});


//Register  User
export const registerUserHandler = expressAsyncHandler(async(req,res) => {
    const {firstName, lastName, mobile, email, password} = req.body;

    const db_user = await UserModel.findOne({ email });

    if (db_user) {
        res.status(400).send({ message: 'User already Registered!' });
        return;
    }
    const hashPassword = await bcrypt.hash(password, 8);

    const User = new UserModel({
        firstName: firstName, 
        lastName: lastName,
        mobile : mobile,
        email: email, 
        password: hashPassword, 
    })

    User.save().then(()=>{
        res.status(200).send({ message: 'SUCCESS' });
    }).catch((err)=>{
        res.status(400).send({ message: err.message });
    })
});
