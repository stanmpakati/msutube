import express from "express";
import multer from "multer";

import checkAuth from "../middleware/check-auth.js";
import { pictureStorage, videoStorage } from "../middleware/multer.js";
import {
  addVideo,
  getVideo,
  getVideos,
  updateVideo,
  deleteVideo,
} from "./controllers/video.js";

const router = express.Router();

router.get("/", getVideos);

router.get("/:id", getVideo);

router.delete("/:id", checkAuth, deleteVideo);

router.post(
  "/",
  // checkAuth,
  multer({ storage: pictureStorage }).single("image"),
  multer({ storage: videoStorage }).single("video"),
  addVideo
);

router.patch(
  "/:id",
  checkAuth,
  // multer({ storage: storage }).single("image"),
  multer({ storage: videoStorage }).single("video"),
  updateVideo
);

export default router;
