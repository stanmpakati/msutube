import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoPath: { type: String, required: true },
    thumbnailPath: { type: String, required: true },
    tags: [{ type: String }],
    views: { type: Number },
    citations: [{ type: String }],
    creators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    contributers: [
      {
        username: String,
        role: String,
        roleDescription: String,
      },
    ],
    comments: [
      {
        username: String,
        comment: String,
        likes: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
