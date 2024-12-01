import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';

//Models 
import UserModel from '../Models/UserModel.js'
import UserRole from '../enums/UserRole.js';

const router = express.Router();

// @GET("/")
export const getUser = expressAsyncHandler(async (req, res) => {

      const user = await UserModel.findOne({ _id: req.user.id },
        'firstName lastName mobile email profile_pic roleId isVendor createdAt updatedAt',
      );

      if(!user){
        return res.status(404).send({ message: 'User Not Found.'});
      }
      return res.send(user);
});



