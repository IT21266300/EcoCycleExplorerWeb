import jwt from "jsonwebtoken";

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
