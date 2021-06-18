import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  regnumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  profilePicUrl: { type: String },
  bio: { type: String },
  location: { type: String },
  facebookLink: { type: String },
  instagramLink: { type: String },
  twitterLink: { type: String },
  phoneNumber: { type: String },
});

userSchema.plugin(uniqueValidator);

export default mongoose.model("User", userSchema);
