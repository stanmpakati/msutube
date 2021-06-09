import multer from "multer";

const MINE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

export const pictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MINE_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mine type");
    if (isValid) error = null;
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const ext = MINE_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});
