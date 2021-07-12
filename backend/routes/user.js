import express from "express";
import multer from "multer";
import { getProfilePic } from "../middleware/multer.js";

import {
  getUsernames,
  getEmail,
  login,
  signup,
  searchUser,
  saveUser,
} from "./controllers/users.js";

const router = express.Router();
const upload = multer();

router.get("/usernames", getUsernames);

router.post("/email", getEmail);

router.post(
  "/signup",
  multer().none(),
  signup,
  multer({ storage: getProfilePic }).single("profilePicture"),
  saveUser
);

router.post("/login", login);

router.post("/search", searchUser);

export default router;
