import Video from "../../models/video.js";
let uploads = {};

export const videoUpload = (req, res) => {
  let fileId = req.headers["x-file-id"];
  let startByte = parseInt(req.headers["x-start-byte"], 10);
  let fileSize = parseInt(req.headers["size"], 10);
  let name = req.headers["name"];

  console.log("file size", fileSize, fileId, startByte);
  // if ()
};

export const uploadVideo = (req, res) => {
  console.log("uploading", req.files);
  const url = req.protocol + "://" + req.get("host");
  const fileType = req.files.file[0].mimetype.split("/")[0];

  const videoPath = `${url}/${req.files.file[0].path}`;
  const thumbPath = req.files.thumbnail
    ? `${url}/${req.files.thumbnail[0].path}`
    : null;

  // TODO remove return statement
  return res.status(200).json({
    message: "Uploaded",
    fileUrl: videoPath,
    thumbnailUrl: thumbPath,
    fileMimetype: fileType,
  });
};

export const saveVideoDetails = (req, res) => {
  console.log(req.body);
  const video = new Video({
    ...req.body,
  });

  video
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "201 message idiot, what else do you want from me?",
        post: {
          ...createdPost,
        },
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "Saving Post failed", error: err })
    );
};

// -----------------------------Get Content-------------------------------
export const getVideos = (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;

  const videoQuery = Video.find();
  let fetchedVideos;

  if (pageSize && currentPage) {
    videoQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  videoQuery
    .then((documents) => {
      fetchedVideos = documents;
      return Video.count();
    })
    .then((count) => {
      res.status(200).json({ videos: fetchedVideos, maxVideos: count });
    })
    .catch((err) =>
      res.status(500).json({ message: "Fetching Videos failed", error: err })
    );
};

export const getVideo = (req, res) => {
  Video.findById(req.params.id)
    .then((video) => {
      if (video) res.status(200).json(video);
      else res.status(404).json({ message: "Video not found" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Getting Video failed", error: err })
    );
};

export const deleteVideo = (req, res) => {};

export const updateVideo = (req, res) => {};
