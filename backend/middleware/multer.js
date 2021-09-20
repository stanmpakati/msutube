import multer from "multer";

const IMG_MINE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const VID_MINE_TYPE_MAP = {
  "video/mp4": "mp4",
  "video/mkv": "mkv",
  "video/x-matroska": "mkv",
};

const MINE_TYPE_MAP = {
  "video/mp4": "mp4",
  "video/mkv": "mkv",
  "video/x-matroska": "mkv",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "audio/mp3": "mp3",
  "audio/mpeg": "mp3",
};
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MINE_TYPE_MAP[file.mimetype];
    let error = new Error("Sorry file type not supported");
    if (isValid) error = null;

    // Save thumbnails first
    if (file.fieldname === "thumbnail") {
      cb(error, "./_uploads/thumbnails");
    } else {
      // then save the actual file
      if (VID_MINE_TYPE_MAP[file.mimetype]) {
        cb(error, "./_uploads/videos");
      } else if (
        file.mimetype === "audio/mp3" ||
        file.mimetype === "audio/mpeg"
      ) {
        cb(error, "./_uploads/audios");
      } else {
        cb(error, "./_uploads/images");
      }
    }
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().replace(/\s+/, "-");
    cb(null, Date.now() + "-" + name);
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

export const getProfilePic = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = IMG_MINE_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid image mine type");
    if (isValid) error = null;
    cb(error, "./_uploads/profile-pictures");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const ext = IMG_MINE_TYPE_MAP[file.mimetype];
    cb(null, "pp-" + Date.now() + "-" + name);
  },
});
