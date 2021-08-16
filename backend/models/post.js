import mongoose from "mongoose";
// import CommentSchema from "./comment.js";

const CommentSchema = new mongoose.Schema(
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

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, default: "" },
    tags: [{ type: String, trim: true }],
    views: { type: Number },
    likes: { type: Number },
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
    length: { type: Number },
    // Comments
    // comments: {
    //   type: [
    //     {
    //       comment: { type: String, required: true },
    //       likes: { type: Number, required: true },
    //       commenter: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User",
    //         required: true,
    //       },
    //     },
    //   ],
    //   select: false,
    // },
    comments: [{ type: CommentSchema }],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
