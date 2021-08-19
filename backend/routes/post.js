import express from "express";
import multer from "multer";

import checkAuth from "../middleware/check-auth.js";
import { storage, videoStorage } from "../middleware/multer.js";
import {
  commentPost,
  likePost,
  uploadPost,
  checkIfLiked,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  savePostDetails,
  viewPost,
} from "./controllers/post.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.delete("/:id", checkAuth, deletePost);

router.post(
  "/",
  checkAuth,
  multer({ storage: storage }).fields([
    {
      name: "file",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  uploadPost
);

router.post("/post", checkAuth, savePostDetails);

router.patch("/comment/:id", checkAuth, commentPost);

router.get("/view/:id", viewPost);

router.get("/like/:id", checkAuth, checkIfLiked);

router.patch("/like/:id", checkAuth, likePost);

router.patch(
  "/:id",
  checkAuth,
  // multer({ storage: storage }).single("image"),
  multer({ storage: videoStorage }).single("video"),
  updatePost
);

export default router;
