import multer from "multer";

const IMG_MINE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const VID_MINE_TYPE_MAP = {
  "video/mp4": "mp4",
  "video/mkv": "mkv",
};

const MINE_TYPE_MAP = {
  "video/mp4": "mp4",
  "video/mkv": "mkv",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "audio/mp3": "mp3",
  "audio/mpeg": "mp3",
};
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file.mimetype);
    const isValid = MINE_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mine type");
    if (isValid) error = null;
    if (VID_MINE_TYPE_MAP[file.mimetype]) {
      cb(error, "./_uploads/videos");
    } else if (
      file.mimetype === "audio/mp3" ||
      file.mimetype === "audio/mpeg"
    ) {
      cb(error, "./_uploads/audios");
    }
    cb(error, "./_uploads/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const ext = MINE_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

export const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = VID_MINE_TYPE_MAP[file.minetype];
    let error = new Error("Invalid video mine type");
    if (isValid) error = null;
    cb(error, "videos");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const ext = VID_MINE_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});
