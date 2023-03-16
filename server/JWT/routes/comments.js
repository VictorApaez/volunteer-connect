const express = require("express");
const { verifyToken } = require("../controllers/authController");
const router = express.Router();

const {
  createComment,
  getComments,
  deleteComment,
  getAllComments,
} = require("../controllers/commentController");

router.post("/create", verifyToken, createComment);
router.get("/id/all", verifyToken, getComments);
router.delete("/id/delete", verifyToken, deleteComment);
router.get("/all", verifyToken, getAllComments);

module.exports = router;
