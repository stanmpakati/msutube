// import getVideoDurationInSeconds from "get-video-duration";

import Post from "../../models/post.js";
import User from "../../models/user.js";
import streamifier from "streamifier";

import cloudinaryV2 from "../../utils/cloudinary.js";

export const uploadPost = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const fileType = req.files.file[0].mimetype;

  const filePath = `${url}/${req.files.file[0].path}`;
  const thumbPath = req.files.thumbnail
    ? `${url}/${req.files.thumbnail[0].path}`
    : null;

  return res.status(200).json({
    message: "Uploaded",
    fileUrl: filePath,
    thumbnailUrl: thumbPath,
    fileMimetype: fileType,
  });
};

export const uploadToCloud = async (req, res) => {
  // Set up stream
  let streamFileUpload = (file, isThumbnail) => {
    // prepare resour
    let resType, preset;
    if (file.mimetype.includes("image")) resType = "Image";
    if (file.mimetype.includes("audio")) resType = "video";
    if (file.mimetype.includes("video")) resType = "video";

    if (isThumbnail) {
      resType = null;
      preset = "thumbnail";
    }

    return new Promise((resolve, reject) => {
      let streamVideo = cloudinaryV2.uploader.upload_stream(
        {
          resource_type: resType || "image",
          upload_preset: resType || preset,
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(file.buffer).pipe(streamVideo);
    });
  };

  async function upload(req) {
    try {
      const fileType = req.files.file[0].mimetype;
      let fileResult = await streamFileUpload(req.files.file[0], false);

      let thumbnailResult;
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        thumbnailResult = await streamFileUpload(req.files.thumbnail[0], true);
      }
      return res.status(200).json({
        message: "Uploaded",
        file_public_id: fileResult.url,
        thumb_public_id: thumbnailResult ? thumbnailResult.url : null,
        fileMimetype: fileType,
        duration: fileResult.duration,
      });
    } catch (err) {
      res.status(500).json({ message: "Some Error" });
    }
  }

  upload(req);
};

export const savePostDetails = (req, res) => {
  // Todo undo user given null id
  // const {recievedPost} = {}
  delete req.body._id;
  const post = new Post({
    ...req.body,
    contributers: req.body.contributers,
  });

  let createdPost;

  post
    .save()
    .then((newPost) => {
      // Update created post value
      createdPost = newPost;

      // Add post to all users
      // Iterate through all owners
      post.owners.forEach(async (owner) => {
        // Push post._id to record
        addOwnedPost(owner, post._id, post.fileType);
      });

      // Add post to all contributers
      post.contributers.forEach(async (contributer) => {
        // Push post._id to record
        addContributedPost(contributer.user.username, post._id, post.fileType);
      });
    })
    .then(() => {
      res.status(201).json({
        message: "Post successfully saved",
        postId: createdPost._id,
      });
    })
    .then(() => {})
    .catch((err) => {
      res.status(500).json({ message: "Saving Post failed", error: err });
      console.log(err);
    });
};

// -----------------------------Get Content-------------------------------
export const getPosts = (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const fileType = req.query.filetype;
  const isFeatured = req.query.isFeatured;
  const trending = req.query.trending;
  const latest = req.query.latest;
  const postIds = req.query.ids;
  const searchQuery = req.query.search;

  // To be Updated with search query
  let fileQuery;

  const selectString =
    "_id title length owners thumbnailUrl fileUrl duration uploadDate createdAt file_public_id thumb_public_id";

  if (postIds && postIds !== "undefined") {
    // Transform string into ObjectIds
    let objectIds = postIds.split(",");

    // limit to ids in the query
    fileQuery = Post.find({
      $and: [{ fileType: { $regex: fileType } }],
    })
      .where("_id")
      .in(objectIds)
      .select(selectString);
  } else if (isFeatured) {
    fileQuery = Post.find({
      $and: [{ fileType: { $regex: fileType } }, { isFeatured: isFeatured }],
    }).select(selectString);
  } else if (latest) {
    fileQuery = Post.find({
      $and: [{ fileType: { $regex: fileType } }],
    })
      .sort({ createdAt: -1 })
      .select(selectString);
  } else if (trending) {
    fileQuery = Post.find({
      $and: [{ fileType: { $regex: fileType } }],
    })
      .sort({ views: -1 })
      .select(selectString);
  } else if (searchQuery) {
    fileQuery = Post.find({
      $or: [
        { title: { $regex: searchQuery } },
        { description: { $regex: searchQuery } },
      ],
    }).select(selectString + " description");
  } else {
    // Return error if no filetype
    if (!fileType) return res.json({ message: "No search parameter" });

    // No Limit
    fileQuery = Post.find({
      $and: [{ fileType: { $regex: fileType } }],
    }).select(selectString);
  }

  let fetchedPosts;

  if (!fileQuery) return res.json({ message: "No search parameter" });

  if (pageSize && currentPage) {
    fileQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  fileQuery.exec(function (err, documents) {
    if (err) console.log(err);

    fetchedPosts = documents;
    res.status(200).json({ posts: fetchedPosts, maxPosts: 10000 });
    // return Post.countDocuments();
  });
  // .then((count) => {
  // })
  // .catch((err) =>
  //   res.status(500).json({ message: "Fetching Posts failed", error: err })
  // );
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      // response
      res.status(200).json(post);

      // Updating views
      Post.updateOne(
        { _id: req.params.id },
        { $inc: { views: 1 } },
        { new: true }
      );
    } else res.status(404).json({ message: "Post not found" });
  } catch (err) {
    res.status(500).json({ message: "Getting Post failed", error: err });
  }
};

export const deletePost = (req, res) => {};

export const updatePost = (req, res) => {};

export const checkIfLiked = async (req, res) => {
  const likedVids = await User.findById(req.userData.userId).select(
    "likedVideos"
  );

  if (likedVids.likedVideos.includes(req.params.id))
    return res.status(200).json({ isLiked: true });
  else return res.status(200).json({ isLiked: false });
};

export const viewPost = async (req, res) => {
  try {
    const updateViewResult = await Post.updateOne(
      { _id: req.params.id },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (updateViewResult.n > 0) {
      // Update user's likes
      return res
        .status(201)
        .json({ message: "update successful", isViewed: true });
    } else
      return res
        .status(401)
        .json({ message: "Some Error there", isViewed: false });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = async (req, res) => {
  // first verify if user has liked post before
  try {
    const likedVids = await User.findById(req.userData.userId).select(
      "likedVideos"
    );

    // If already liked unlike and reduce likes
    if (likedVids.likedVideos.includes(req.params.id)) {
      // remove liked video
      try {
        const userLikesUpdate = await User.updateOne(
          { _id: req.userData.userId },
          { $pull: { likedVideos: req.params.id } },
          { new: true }
        );

        if (userLikesUpdate.n > 0) {
          // subtract likes
          try {
            const updatelikeResult = await Post.updateOne(
              { _id: req.params.id },
              { $inc: { likes: -1 } },
              { new: true }
            );

            if (updatelikeResult.n > 0) {
              // Respond unliked
              return res
                .status(201)
                .json({ message: "unliked", isLiked: false });
            } else
              return res
                .status(401)
                .json({ message: "Some Error there", isLiked: false });
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      // Else video not liked
      // then Uadd to liked videos and increase likes
      const userLikesUpdate = await User.updateOne(
        { _id: req.userData.userId },
        { $push: { likedVideos: req.params.id } },
        { new: true }
      );

      if (userLikesUpdate.n > 0) {
        const updatelikeResult = await Post.updateOne(
          { _id: req.params.id },
          { $inc: { likes: 1 } },
          { new: true }
        );

        if (updatelikeResult.n > 0) {
          // Update user's likes
          return res
            .status(201)
            .json({ message: "update successful", isLiked: true });
        } else
          return res
            .status(401)
            .json({ message: "Some Error there", isLiked: false });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;

  const commentsQuery = Post.findById(req.params.id).select("comments");

  let fetchedComments;

  // Limit query
  if (pageSize && currentPage) {
    commentsQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  commentsQuery
    .then((documents) => {
      fetchedComments = documents.comments;
    })
    .then((count) => {
      res.status(200).json({ comments: fetchedComments, maxComments: 100 });
    })
    .catch((err) =>
      res.status(500).json({ message: "Fetching Comments failed", error: err })
    );
};

export const commentPost = async (req, res) => {
  // Make comment
  const comment = {
    owner: req.userData.userId,
    likes: 0,
    comment: req.body.comment,
  };

  // Update comment
  const updatelikeResult = await Post.updateOne(
    { _id: req.params.id },
    { $push: { comments: comment } },
    { new: true }
  );

  if (updatelikeResult.n > 0) {
    // Update post's comments
    return res
      .status(201)
      .json({ message: "update successful", comment: comment });
  } else
    return res
      .status(401)
      .json({ message: "Some Error there", isLiked: false });
};

const addOwnedPost = async (owner, id, fileType) => {
  const updatelikeResult = await User.updateOne(
    { username: owner },
    {
      $push: {
        uploadedPosts: { _id: id, fileType: fileType },
      },
    },
    { new: true }
  );

  if (updatelikeResult.n === 0)
    return res
      .status(401)
      .json({ message: "Some Error there", isLiked: false });
};

const addContributedPost = async (contributer, id, fileType) => {
  const updatelikeResult = await User.updateOne(
    { username: contributer },
    {
      $push: {
        contributedPosts: { _id: id, fileType: fileType },
      },
    },
    { new: true }
  );

  if (updatelikeResult.n === 0)
    return res
      .status(401)
      .json({ message: "Some Error there", isLiked: false });
};

// One time function to populate user's owned posts with previously saved posts
function pop() {
  User.find()
    .up("uploadedPosts")
    .exec(function (err, conversation) {
      //do stuff
      if (err) console.log(err);
      Post.find().select("name occupation");
    });

  User.updateOne(
    { username: contributer },
    {
      $push: {
        contributedPosts: { _id: id, fileType: fileType },
      },
    },
    { new: true }
  );
}
