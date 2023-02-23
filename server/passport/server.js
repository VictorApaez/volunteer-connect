const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();

// ================================== Connect to MongoDb
mongoose.connect("mongodb://localhost/volunteerconnect", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// ================================== User Schema

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const User = mongoose.model("User", userSchema);

// ======================== Configure Passport & Express app

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            return done(null, user, { message: "User is authenticated" });
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// ================================== Routes

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) throw err;
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user.save((err) => {
      if (err) {
        return res.json({ message: err });
      } else {
        return res.json({ message: "success" });
      }
    });
  });
});

// local is the LocalStrategy defined earlier
app.post("/login", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    return res.json(info);
  })(req, res);
});

app.get("/profile", (req, res) => {
  const user = req.user;
  res.json({ user });
});

app.get("/login-failure", (req, res) => {
  res.json(req.user);
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
