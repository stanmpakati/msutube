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
    fileUrl: { type: String },
    fileType: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, default: "" },
    tags: [{ type: String, trim: true }],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    file_public_id: { type: String, required: true },
    thumb_public_id: { type: String },
    duration: { type: Number },
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
    comments: [{ type: CommentSchema, select: false }],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
