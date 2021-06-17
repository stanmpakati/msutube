let uploads = {};

export const videoUpload = (req, res) => {
  let fileId = req.headers["x-file-id"];
  let startByte = parseInt(req.headers["x-start-byte"], 10);
  let fileSize = parseInt(req.headers["size"], 10);
  let name = req.headers["name"];

  console.log("file size", fileSize, fileId, startByte);
  // if ()
};
