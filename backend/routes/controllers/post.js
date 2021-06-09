import Post from "../../models/post.js";

export const addPost = (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    ...req.body,
    imagePath: `${url}/images/${req.file.filename}`,
    creator: req.userData.userId,
  });

  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "201 message idiot, what else do you want from me?",
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "Saving Post failed", error: err })
    );
};

export const getPosts = (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;

  const postQuery = Post.find();
  let fetchedPosts;

  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      return Post.count();
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
    .then((post) => {
      if (post) res.status(200).json(post);
      else res.status(404).json({ message: "post not found" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Getting Post failed", error: err })
    );
};

export const updatePost = (req, res) => {
  let imagePath = req.body.imagePath;

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = `${url}/images/${req.file.filename}`;
  }

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId,
  });

  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then((result) => {
      if (result.n > 0) res.status(201).json({ message: "update successful" });
      else res.status(401).json({ message: "Not authorized" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Saving Post failed", error: err })
    );
};

export const deletePost = (req, res) => {
  const { id } = req.params;

  Post.deleteOne({ _id: id, creator: req.userData.creator })
    .then((result) => {
      if (result.n > 0) res.status(201).json({ message: "Delete successful" });
      else res.status(401).json({ message: "Not authorized" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Deleting Post failed", error: err })
    );
};
