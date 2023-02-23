const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Protected route to verify user
router.get("/verifyUser", authController.verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
