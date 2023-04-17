const express = require("express");
const app = express();
const db = require("./db");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const postRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentsRoutes);

app.get("/", (req, res) => {
  res.json({ hello: "YO" });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
