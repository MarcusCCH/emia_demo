//basics
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
//login
const passport = require("passport");
const local = require("passport-local");
const crypto = require("crypto");
const session = require("express-session");
const isLoggedIn = require("./middleware/index").isLoggedIn;

//models
const User = require("./model/User");
const Pet = require("./model/Pet");

//environment settings
const PORT = process.env.PORT || 1234;

/* ----------------app basic settings---------------- */
// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.static(path.resolve(__dirname, "../client/build")));

/* ----------------database---------------- */
mongoose
  .connect(
    "mongodb+srv://marcuscch12:d4qYmfY9FZiBiUue@cluster0.84ovamv.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
    // Pet.updateMany(
    //   {},
    //   { $set: { totalFocusSession: 10 } },
    //   { multi: true, upsert: true }
    // );
    // console.log("finished");
  });

/*create default pets*/
const petList = ["cat", "pig", "hamster"];
async function createPet(pet) {
  const createdPet = await Pet.create({
    type: pet,
  });
  console.log(`created pet ${createdPet}`);
  return createdPet;
}
async function createPets() {
  let petsData = [];
  for (let i = 0; i < petList.length; i++) {
    const pet = await createPet(petList[i]);
    petsData.push(pet);
  }
  return petsData;
}

/*database cleaning*/
User.deleteMany({})
  .then(() => {
    console.log("deleted all users");
  })
  .catch((err) => {
    console.log(`error deleting users: ${err}`);
  });
Pet.deleteMany({})
  .then(() => {
    console.log("deleted all pets");
  })
  .catch((err) => {
    console.log(`error deleting pets: ${err}`);
  });

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

app.get("/loginStatus", (req, res) => {
  if (!req.user) {
    return res.json({ loggedIn: false });
  }
  return res.json({ loggedIn: true, username: req.user.username });
});

app.post("/register", async (req, res) => {
  console.log(`user created: ${req.body}`);
  //TODO: add error handling (if pets creation is not success, how to handle user creation?)
  const petsData = await createPets();
  console.log(`petsData: ${petsData}`);
  //TODO: similarly, handle the error
  let createdUser;
  try {
    createdUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      sessionNumber: 0,
      favouritePet: null,
      petsData: petsData,
    });
  } catch (error) {
    console.log(`error creating user: ${error}`);
  } finally {
    console.log(`created user: ${createdUser}`);
  }

  //update pets reference to user
  for (let i = 0; i < petsData.length; i++) {
    const updatedPet = await Pet.updateOne(
      { _id: petsData[i]._id },
      { $set: { user: createdUser } }
    );
    console.log(`updated pet: ${updatedPet}`);
  }
  req.login(createdUser, (err) => {
    if (err) {
      console.log(err);
    }
    return res.redirect("/");
  });
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  if (!req.user) {
    console.log("undefined user");
    res.redirect("/admin");
  }
  const date = new Date();
  console.log(`User ID:${req.user._id} logged in at ${date}`);
  res.redirect("/");
});

app.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      res.json({ logoutStatus: true });
    } else {
      console.log("logged out");
      res.json({ logoutStatus: true });
    }
  });
});

/* -------- api routes ---------- */
app.get("/info", isLoggedIn, (req, res) => {
  User.findOne({ username: req.user.username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/updateSessionData", isLoggedIn, async (req, res) => {
  console.log("@ updateSessionData route");
  console.log(req.body);
  const { sessionStatus, sessionPeriod, type } = req.body;
  const user = await User.findOne({ username: req.user.username });
  const pet = await Pet.findById({ _id: user.petsData[type] });
  console.log(pet);
});
/* --------- hosting --------*/

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
