import express from "express";
import multer from "multer";
import { getProfilePic } from "../middleware/multer.js";

import {
  getUsernames,
  getEmail,
  login,
  signup,
  searchUser,
} from "./controllers/users.js";

const router = express.Router();

router.get("/usernames", getUsernames);

router.post("/email", getEmail);

router.post("/signup", multer().single("profilePicture"), signup);

router.post("/login", login);

router.post("/search", searchUser);

export default router;
