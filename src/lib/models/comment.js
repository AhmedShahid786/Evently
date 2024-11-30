import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  event: { type: mongoose.Types.ObjectId, ref: "event", required: true },
  comments: [
    {
      userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
      comment: { type: String, required: true },
    },
  ],
});

export const commentModel =
  mongoose.models.comment || mongoose.model("comment", commentSchema);
