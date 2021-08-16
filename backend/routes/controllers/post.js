// import getVideoDurationInSeconds from "get-video-duration";

import Post from "../../models/post.js";
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

export const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((file) => {
      if (file) res.status(200).json(file);
      else res.status(404).json({ message: "Post not found" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Getting Post failed", error: err })
    );
};

export const deletePost = (req, res) => {};

export const updatePost = (req, res) => {};

export const likePost = (req, res) => {
  Post.updateOne({ _id: req.params.id }, { $inc: { likes: 1 } }, { new: true })
    .then((result) => {
      console.log(result);
      if (result.n > 0) res.status(201).json({ message: "update successful" });
      else res.status(401).json({ message: "Not authorized" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Saving Post failed", error: err })
    );
};

export const commentPost = (req, res) => {
  // Confirm identity of post
  Post.findById(req.params.id).then((file) => {
    if (file) console.log("found");

    console.log(req.userData.userId);

    const comment = new CommentSchema({
      comment: req.body.comment,
      owner: req.userData.userId,
    });

    console.log(comment);

    person.friends.push(friend);
    person.save(done);

    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post);
  });
};
