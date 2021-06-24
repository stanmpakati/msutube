import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoPath: { type: String, required: true },
    thumbnailPath: { type: String, required: true },
    tags: [{ type: String }],
    views: { type: Integer },
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
        type: {
          username: String,
          role: String,
          roleDescription: String,
        },
      },
    ],
    comments: [
      {
        type: {
          username: String,
          comment: String,
          likes: integer,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
