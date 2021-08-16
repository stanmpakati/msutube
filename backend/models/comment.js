import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    // TODO: make likes an array
    likes: { type: Number },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
