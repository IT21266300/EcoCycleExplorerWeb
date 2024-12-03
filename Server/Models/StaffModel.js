import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    employeeType: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, require: true },
    

    // Add other fields as needed
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model('staff', staffSchema);