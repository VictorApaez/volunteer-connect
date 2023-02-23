const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../db/models/user");
require("dotenv").config();
const jwtSecrete = process.env.JWT_SECRETE;

const signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    console.log(`New user created: ${user.username}`);
    res.status(201).json({
      message: "User created successfully",
      userId: user.id,
      username: user.username,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send("Invalid username or password");
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).send("Invalid username or password");
    }
    const token = jwt.sign({ username: user.username }, jwtSecrete);
    res.status(200).json({ token, user: user.username });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, jwtSecrete, (err, user) => {
      if (err) {
        return res.status(403).json({ Error: err.message });
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { signup, login, verifyToken };
