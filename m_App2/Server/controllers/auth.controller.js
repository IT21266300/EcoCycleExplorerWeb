import bcrypt from 'bcryptjs';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import speakeasy from 'speakeasy';
import { generateToken } from '../utils.js';

// Utils
import { sendEmail } from '../utils.js'

//Models 
import UserModel from '../Models/UserModel.js'

// @POST("/token")
export const generateTokenHandler = expressAsyncHandler(async (req, res) => {
      const { email, password } = req.body;
  
      const user = await UserModel.findOne({ email });
  
      if (user) {
        if (user.isVerifiedUser == false) {
          return res.status(400)
            .send({ message: 'Please Verify your account first' });
        }
  
        if (bcrypt.compareSync(password, user.password)) {
          return res.send({
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
    const {firstName,middleName, lastName, mobile, email, password} = req.body;

    try{
      const secret = speakeasy.generateSecret();
      const token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
        step: 60,
      });

      const db_user = await UserModel.findOne({
        $or: [{ email }, { mobile }],
      });

      if (db_user) {
        if (db_user.isVerifiedUser == true) {
          res.status(400).send({ message: 'User already Registered!' });
        } else if (db_user.mobile === mobile) {
          return res.status(400)
            .send({ message: 'Mobile Number Already Taken!' });
        } else {
          await sendEmail(email, 'TASKBEAR | OTP', `Your OTP is ${token}`);
          res.send({ status: 'SUCCESS', message: 'Verification OTP send' });
        }
        return;
      }
      const lastUser = await UserModel.findOne().sort({ createdAt: -1 });

      var userID = 1;
      if(lastUser){
        const lastUserID = parseInt(lastUser.userID.replace('U', ''), 10);
        userID = lastUserID + 1; 
      }
      const formattedUserID = `U${userID.toString().padStart(6, '0')}`;

      const hashPassword = await bcrypt.hash(password, 8);

      const user = new UserModel({
        userID : formattedUserID,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        password: hashPassword,
        twoFactorAuthSecret: secret.base32,
      });

      await user.save();

      await sendEmail(email, 'EcoCycle | OTP', `Your OTP is ${token}`);
      res.send({ status: 'SUCCESS', message: 'Verification OTP send' });

    }catch(error){
      return res.status(500).send({ message: error.message });
    }
});

export const sendOtpForVerification = async(req,res) => {
  const { email, otp } = req.body;
  
  const user = await UserModel.findOne({ email: email });

  var tokenValidates = speakeasy.totp.verify({
    secret: user.twoFactorAuthSecret,
    encoding: 'base32',
    token: otp,
    step: 60,
    window: 1,
  });
  
  if (tokenValidates) {
    const filter = { email: email };

    const updateDoc = {
      $set: {
        isVerifiedUser: true,
      },
    };

    await UserModel.updateOne(filter, updateDoc);

    res.status(200).send({ message: 'SUCCESS' });
  } else {
    res.status(400).send({ message: 'Otp code expired or invalid! ' });
  }
};

export const resendOtpForVerification = async(req,res) => {
  const { email } = req.body;

  const secret = speakeasy.generateSecret();

  const token = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
    step: 60,
  });

  const filter = { email: email };

  const updateDoc = {
    $set: {
      twoFactorAuthSecret: secret.base32,
    },
  };

  await UserModel.updateOne(filter, updateDoc);

  await sendEmail(email, 'EcoCycle | OTP', `Your OTP is ${token}`);
  return res.send({ message: 'SUCCESS' });

};
