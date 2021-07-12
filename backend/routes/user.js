import express from "express";
import multer from "multer";

import {
  getUsernames,
  getEmail,
  login,
  signup,
  searchUser,
} from "./controllers/users.js";

const router = express.Router();
const upload = multer();

router.get("/usernames", getUsernames);

router.post("/email", getEmail);

router.post("/signup", upload.none(), signup);

router.post("/login", login);

router.post("/search", searchUser);

export default router;
