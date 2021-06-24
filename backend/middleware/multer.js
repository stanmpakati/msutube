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

export const pictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = IMG_MINE_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mine type");
    if (isValid) error = null;
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const ext = IMG_MINE_TYPE_MAP[file.mimetype];
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
