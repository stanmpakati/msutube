export const videoStorage = () => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinaryV2.uploader.upload_stream(
        { resource_type: "video", upload_preset: "video" },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    try {
      let result = await streamUpload(req);
      console.log(result);
      return res.status(200).json({
        message: "Uploaded",
        public_id: result.public_id,
        fileMimetype: `${result.resource_type}/${result.format}`,
        duration: result.duration,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "done" });
    }
  }

  upload(req);
};
