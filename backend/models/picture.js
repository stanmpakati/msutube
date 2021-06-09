import mongoose from "mongoose";

const pictureSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imagePath: { type: String, required: true },
    // TODO: make likes an array
    likes: { type: Number },
    views: { type: Number },
    // TODO: make categories an array of Strings
    categories: { type: Array },
    tags: { type: Array },
    // TODO: make comments an array of users
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    // TODO: make contributers an array of users
    contributers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // TODO: make creators an array of users
    creators: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Picture", pictureSchema);
