//basics
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//login
const passport = require("passport");
const local = require("passport-local");
const crypto = require("crypto");
const session = require("express-session");

//models
const User = require("./model/User");

//settings
const PORT = process.env.PORT || 1234;

/* ----------------app basic settings---------------- */
// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.resolve(__dirname, "../client/build")));

/* ----------------database---------------- */
mongoose.connect(
  "mongodb+srv://marcuscch12:d4qYmfY9FZiBiUue@cluster0.84ovamv.mongodb.net/?retryWrites=true&w=majority"
);

/* ----------------login and register---------------- */
var sess = {
  secret: "secret",
  resave: false,
  saveUninitialized: false,
};
// if(app.get('env') === "production"){
//   app.set('trust proxy', 1);
//   if(sess != null)
//     sess.cookie.secure = true;
// }
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new local(function (username, password, done) {
    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        if (user.password != password) {
          console.log("unauthorized session");
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// User.deleteMany();
app.get("/loginStatus", (req, res) => {
  if (!req.user) {
    return res.json({ loggedIn: false });
  }
  return res.json({ loggedIn: true, username: req.user.username });
});
app.post("/register", (req, res) => {
  console.log(`user created: ${req.body}`);
  //   res.json({ userCreated: true });
  // Uncomment after all testings
  User.create(req.body)
    .then((user) => {
      console.log(`created user ${user}`);
      //   res.json({ userCreated: true });
    })
    .catch((err) => {
      console.error(`${err} at /register`);
      //   res.json({ userCreated: false });
    });
  res.redirect("/");
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  if (!req.user) {
    console.log("undefined user");
    res.redirect("/admin");
  }
  const date = new Date();
  console.log(`User ID:${req.user._id} logged in at ${date}`);
  // res.json(req.user);
  res.redirect("/");
});
app.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      res.json({ logoutStatus: true });
    } else {
      console.log("logged out");
      //   console.log(req.user);
      res.json({ logoutStatus: true });
      //   res.redirect("/");
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
