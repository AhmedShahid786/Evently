import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: String,
  email: String,
  password: String,
  location: {
    lat: Number,
    long: Number,
  },
  profileImg: String,
  address: String,
  bio: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  otp: String,
  otpExpiry: { type: Date, required: true },
  isVerified: { type: Boolean, default: false },
});

export const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);
