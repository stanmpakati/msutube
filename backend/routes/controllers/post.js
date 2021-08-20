// import getVideoDurationInSeconds from "get-video-duration";

import Post from "../../models/post.js";
import User from "../../models/user.js";
import CommentSchema from "../../models/comment.js";

export const uploadPost = (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const fileType = req.files.file[0].mimetype;
  // console.log(getVideoDurationInSeconds(files.file[0]));

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

export const savePostDetails = (req, res) => {
  // Todo undo user given null id
  // const {recievedPost} = {}
  console.log("body", req.body);
  delete req.body._id;
  const post = new Post({
    ...req.body,
    contributers: req.body.contributers,
  });

  post
    .save()
    .then((createdPost) => {
      console.log("created post", createdPost);
      res.status(201).json({
        message: "201 message idiot, what else do you want from me?",
        post: {
          ...createdPost,
        },
      });
    })
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

  const fileQuery = Post.find({ fileType: { $regex: fileType } }).select(
    "_id title length owners thumbnailUrl fileUrl uploadDate createdAt"
  );
  let fetchedPosts;

  if (pageSize && currentPage) {
    fileQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  fileQuery
    .then((documents) => {
      fetchedPosts = documents;
      return Post.countDocuments();
    })
    .then((count) => {
      res.status(200).json({ posts: fetchedPosts, maxPosts: count });
    })
    .catch((err) =>
      res.status(500).json({ message: "Fetching Posts failed", error: err })
    );
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

  let fetchedPosts;
  let count;

  // Limit query
  if (pageSize && currentPage) {
    commentsQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  commentsQuery
    .then((documents) => {
      fetchedPosts = documents;
    })
    .then((count) => {
      res.status(200).json({ posts: fetchedPosts, maxPosts: 100 });
    })
    .catch((err) =>
      res.status(500).json({ message: "Fetching Posts failed", error: err })
    );
};

export const commentPost = async (req, res) => {
  console.log("hit");
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
