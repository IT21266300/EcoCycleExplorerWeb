import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, require: true },
    profile_pic: { type: String, default: null },
    cover_pic : {  type: String, default: null },
    bio : { type: String},
    lastOnline : { type: mongoose.Schema.Types.Date, default: null },
    roleId: { type: Number, default: 1 },
    isVerifiedUser: { type: Boolean, default: false },
    twoFactorAuthSecret: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model('users', usersSchema);
