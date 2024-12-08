import mongoose from "mongoose";

export async function connectDB() {
  try {
    let connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb Connected");
  } catch (err) {
    console.log("error in mongodb connection =>", err);
  }
}
