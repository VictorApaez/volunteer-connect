const express = require("express");
const app = express();
const db = require("./db");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const postRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentsRoutes);

app.get("/", (req, res) => {
  res.json({ welcome: "Thanks for visiting my server!" });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
