import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, select: false },
  name: {
    first: { type: String, trim: true },
    last: { type: String, trim: true },
  },
  profilePicUrl: { type: String },
  bio: { city: String, country: String },
  location: {
    city: { type: String, trim: true },
    country: { type: String, trim: true },
  },
  facebookLink: { type: String },
  instagramLink: { type: String },
  twitterLink: { type: String },
  phoneNumber: { type: String },
  regnumber: { type: String },

  likedVideos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    select: false,
  },
  uploadedPosts: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
      fileType: String,
    },
  ],
  select: false,
});

userSchema.plugin(uniqueValidator);

export default mongoose.model("User", userSchema);
