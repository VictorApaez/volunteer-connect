const Comment = require("../db/models/comment");
const Post = require("../db/models/post");
const User = require("../db/models/user");

const createComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.body.postId);
    const commentData = {
      content: req.body.content,
      author: req.user.userId,
      postId: req.body.postId,
    };
    const comment = await Comment.create(commentData);
    await Post.findByIdAndUpdate(req.body.postId, {
      $push: { comments: comment._id },
    });
    console.log(comment);
    const populatedComment = await Comment.findById(comment._id).populate({
      path: "author",
      select: "username",
    });

    res.status(201).json(populatedComment);
  } catch (err) {
    next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const post = await Post.findById(req.body.postId).populate("comments");
    res.status(200).json(post.comments);
  } catch (err) {
    next(err);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    // get all comments
    const comments = await Comment.find({});
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.body.postId).populate("comments");
    const comment = post.comments.filter(
      (comment) => comment._id.toString() === req.body.commentId
    );
    const user = await User.findById(comment[0].author);
    if (req.user.userId === user.id) {
      post.comments = post.comments.filter(
        (comment) => comment._id.toString() !== req.body.commentId
      );
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(403).json({
        message: "You can't delete this comment because you are not the user",
      });
    }

    post.save();
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

module.exports = { createComment, getComments, deleteComment, getAllComments };
