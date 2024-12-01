import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

// MARK: Token
export const generateToken = (user) => {
    const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        email: user.email,
    };
    const options = {
        expiresIn: "365d",
        issuer: "jk",
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// MARK: Email
export const sendEmail = async (emailAddress, subject, content) => {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'janithk2001@gmail.com',
          pass: 'jcru smnu ayky qwry',
        },
        secure: true,
      }),
    );
  
    var mailOptions = {
      from: 'janithk2001@gmail.com',
      to: emailAddress,
      subject: subject,
      html: content,
    };
  
    const info = await transporter.sendMail(mailOptions);
    console.log(info.response);
    if (info.response) {
      return { message: 'Verification OTP email sent!' };
    } else {
      return { message: 'Verification OTP email not sent!' };
    }
};



