const express = require("express");
const { verifyToken } = require("../controllers/authController");
const router = express.Router();

const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

router.post("/create", verifyToken, createComment);
router.get("/id/all", verifyToken, getComments);
router.delete("/id/delete", verifyToken, deleteComment);

module.exports = router;
