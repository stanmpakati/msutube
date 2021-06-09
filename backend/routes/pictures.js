import express from "express";
import multer from "multer";

import checkAuth from "../middleware/check-auth.js";
import { picStorage } from "../middleware/multer.js";
import {
  addPic,
  getPics,
  getPic,
  updatePic,
  deletePic,
} from "./controllers/pictures.js";

const router = express.Router();

router.get("/", getPics);

router.get("/:id", getPic);

router.delete("/:id", checkAuth, deletePic);

router.pic(
  "/",
  checkAuth,
  multer({ storage: picStorage }).single("image"),
  addPic
);

router.patch(
  "/:id",
  checkAuth,
  multer({ storage: picStorage }).single("image"),
  updatePic
);

export default router;
