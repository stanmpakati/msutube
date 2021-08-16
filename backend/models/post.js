import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, default: "" },
    tags: [{ type: String, trim: true }],
    views: { type: Number },
    citations: [
      {
        author: [{ type: String }],
        publicationDate: { type: Date, default: Date.now },
        refTitle: { type: String },
        edition: { type: String },
        place: { type: String },
        publisher: { type: String },
        book: { type: String },
        link: { type: String },
        dateAccessed: { type: Date, default: Date.now },
      },
    ],
    owners: [
      {
        type: String,
        required: true,
      },
    ],
    contributers: [
      {
        user: {
          username: { type: String },
          email: { type: String },
          profilePicUrl: { type: String },
        },
        role: { type: String },
        roleDetails: { type: String },
      },
    ],
    // comments: { type: [CommentSchema], select: false },
    length: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
