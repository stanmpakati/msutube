import express from "express";
import multer from "multer";

import checkAuth from "../middleware/check-auth.js";
import {
  addPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "./controllers/post.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.delete("/:id", checkAuth, deletePost);

router.post(
  "/",
  checkAuth,
  // multer({ storage: storage }).single("image"),
  addPost
);

router.patch(
  "/:id",
  checkAuth,
  // multer({ storage: storage }).single("image"),
  updatePost
);

export default router;
