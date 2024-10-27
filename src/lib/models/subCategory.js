import mongoose from "mongoose";

const { Schema } = mongoose

const subCategorySchema = new Schema({
  title: String,
  description: String,
  thumbnail: String,
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
    required: true,
            }
})

export const subCategoryModel = mongoose.models.subCategory || mongoose.model("subCategory", subCategorySchema)