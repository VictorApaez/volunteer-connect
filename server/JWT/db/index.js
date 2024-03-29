const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
// const testingURL = "mongodb://localhost/jwtapp";

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
