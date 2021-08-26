import express from "express";
import multer from "multer";
import streamifier from "streamifier";
// import { v2 } from "cloudinary";

import cloudinary from "../utils/cloudinary.js";
import checkAuth from "../middleware/check-auth.js";
import { storage, videoStorage } from "../middleware/multer.js";
import {
  commentPost,
  getComments,
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

router.post("/cloud", multer().single("image"), function (req, res) {
  let streamUpload = (req) => {
    // let cloudinary = v2({
    //   cloud_name: process.env.CLOUDINARY_NAME,
    //   api_key: process.env.CLOUDINARY_API_KEY,
    //   api_secret: process.env.CLOUDINARY_API_SECRET,
    // });
    return new Promise((resolve, reject) => {
      console.log(cloudinary);

      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    try {
      console.log("hit");
      let result = await streamUpload(req);
      console.log(result);
      res.json({ message: "done" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "done" });
    }
  }

  upload(req);
});

router.post("/post", checkAuth, savePostDetails);

router.get("/comment/:id", getComments);

router.post("/comment/:id", checkAuth, commentPost);

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
