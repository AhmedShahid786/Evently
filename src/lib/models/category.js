import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

export const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema)