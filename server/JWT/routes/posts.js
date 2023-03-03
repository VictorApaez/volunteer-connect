const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/authController");

const {
  createPost,
  deletePost,
  getPosts,
  editPost,
  likePost,
  unlikePost,
} = require("../controllers/postController");

// add verify token middleware after testing
router.get("/all", getPosts);
router.post("/create", verifyToken, createPost);
router.delete("/delete", verifyToken, deletePost);
router.put("/edit", verifyToken, editPost);
router.post("/like", verifyToken, likePost);
router.post("/unlike", verifyToken, unlikePost);

module.exports = router;
