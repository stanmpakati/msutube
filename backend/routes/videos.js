import express from "express";
import multer from "multer";

import checkAuth from "../middleware/check-auth.js";
import { storage, videoStorage } from "../middleware/multer.js";
import {
  uploadVideo,
  getVideo,
  getVideos,
  updateVideo,
  deleteVideo,
  saveVideoDetails,
} from "./controllers/video.js";

const router = express.Router();

router.get("/", getVideos);

router.get("/:id", getVideo);

router.delete("/:id", checkAuth, deleteVideo);

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
  uploadVideo
);

router.post("/post", checkAuth, saveVideoDetails);

router.patch(
  "/:id",
  checkAuth,
  // multer({ storage: storage }).single("image"),
  multer({ storage: videoStorage }).single("video"),
  updateVideo
);

export default router;
