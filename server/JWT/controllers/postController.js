const Post = require("../db/models/post");
const User = require("../db/models/user");

const createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const post = new Post({
      content: req.body.content,
      author: user,
    });
    user.posts.unshift(post);
    await post.save();
    await user.save();
    const populatedPost = await Post.findById(post._id).populate({
      path: "author",
      select: "username",
    });
    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.body.postId);

    if (!post) {
      return res.status(401).json({
        message: "Post not found",
      });
    }

    post.remove();
    user.posts.pull(post);
    res.status(204).json({
      message: "Post deleted",
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username",
        },
        options: { sort: { createdAt: -1 } },
      })
      .populate("author", "username -_id");

    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
};

const editPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body.postId,
      { content: req.body.content },
      { new: true }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
};

const likePost = async (req, res) => {
  const userId = req.user.userId;
  const postId = req.body.postId;
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({
        message: `Post not found with userId: ${userId} and postId: ${postId}`,
      });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
};

const unlikePost = async (req, res) => {
  const userId = req.user.userId;
  const postId = req.body.postId;
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({
        message: `Post not found with userId: ${userId} and postId: ${postId}`,
      });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getUsersByPostLikes = async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    if (!post) {
      return res.status(404).json({
        message: `Post not found with postId: ${req.body.postId}`,
      });
    }
    if (post.likes.length === 0) {
      return res.status(200).json([]);
    }

    const userIds = post.likes.map((like) => like.toString());
    const users = await User.find({ _id: { $in: userIds } });
    const usernames = users.map((user) => {
      return {
        username: user.username,
      };
    });

    res.status(200).json(usernames);
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  createPost,
  deletePost,
  getPosts,
  editPost,
  likePost,
  unlikePost,
  getUsersByPostLikes,
};
