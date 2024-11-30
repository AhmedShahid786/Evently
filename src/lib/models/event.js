import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
  title: String,
  description: String,
  startTime: String,
  endTime: String,
  thumbnail: String,
  startDate: String,
  endDate: String,
  location: {
    lat: Number,
    long: Number,
  },
  address: String,
  createdBy: { type: mongoose.Types.ObjectId, ref: "user" },
  category: { type: mongoose.Types.ObjectId, ref: "category" },
  subCategory: { type: mongoose.Types.ObjectId, ref: "subCategory" },
  going: [{ type: mongoose.Types.ObjectId, ref: "user" }],
});

export const eventModel =
  mongoose.models.event || mongoose.model("event", eventSchema);
