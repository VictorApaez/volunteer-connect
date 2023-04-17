const express = require("express");
const app = express();
const db = require("./db");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const postRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentsRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
